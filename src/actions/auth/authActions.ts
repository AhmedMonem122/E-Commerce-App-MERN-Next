"use server";

import apiServer from "@/api/apiServer";
import axios from "axios";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormState = {
  success?: boolean;
  message?: string;
  validationErrors?: Record<string, string>;
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // --- Input validation ---
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    const validationErrors: Record<string, string> = {};

    parsed.error.issues.forEach((issue) => {
      const pathKey = issue.path[0];

      // Ensure the key is a string
      if (typeof pathKey === "string") {
        validationErrors[pathKey] = issue.message;
      }
    });

    return { success: false, validationErrors };
  }

  try {
    const api = apiServer();
    // --- Call backend API ---
    const res = await api.post(
      "/users/signin",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const token = res.data?.token;
    if (!token) {
      return { success: false, message: "No token received from server." };
    }

    // --- Save token in cookies ---
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    // --- Axios error handling ---
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Login failed.",
      };
    }

    // --- Any other unexpected error ---
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // --- Redirect MUST be outside try/catch ---
  redirect("/");
}
