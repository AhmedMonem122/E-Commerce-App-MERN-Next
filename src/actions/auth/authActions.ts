"use server";
import api from "@/api/axios";
import axios from "axios";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormState = {
  success?: boolean;
  message?: string;
  validationErrors?: { [key: string]: string };
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parse = loginSchema.safeParse({ email, password });
  if (!parse.success) {
    const validationErrors: { [key: string]: string } = {};
    parse.error.issues.forEach((err) => {
      const key = err.path[0];
      if (typeof key === "string") {
        validationErrors[key] = err.message;
      }
    });
    return { success: false, validationErrors };
  }

  try {
    const res = await api.post(
      "/users/signin",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return {
      success: true,
      message:
        res.data?.status === "success" ? "Login successful!" : "Login failed.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete review",
      };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
