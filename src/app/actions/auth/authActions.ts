"use server";

import apiServer from "@/app/lib/apiServer.server";
import axios from "axios";
import { z } from "zod";
import { cookies, headers } from "next/headers";
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
    const api = await apiServer();
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

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export type RegisterFormState = {
  success?: boolean;
  message?: string;
  validationErrors?: Record<string, string>;
};

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const parsed = registerSchema.safeParse({
    name,
    email,
    password,
    passwordConfirm,
  });

  if (!parsed.success) {
    const validationErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0];
      if (typeof key === "string") validationErrors[key] = issue.message;
    });

    return { success: false, validationErrors };
  }

  try {
    // Build dynamic URL for profile: <origin>/profile
    // Try to derive protocol + host from headers; fallback to env var
    const hdrs = await headers();
    const host =
      hdrs.get("host") ?? process.env.NEXT_PUBLIC_APP_HOST ?? "localhost:3000";
    // try x-forwarded-proto then default to http or process.env
    const proto =
      hdrs.get("x-forwarded-proto") ??
      process.env.NEXT_PUBLIC_APP_SCHEME ??
      "http";

    const origin = `${proto}://${host}`;
    const profileUrl = `${origin}/profile`;

    const api = await apiServer();

    const res = await api.post(
      "/users/signup",
      {
        name,
        email,
        password,
        passwordConfirm,
        url: profileUrl, // dynamic server-side
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // If backend returns success
    const data = res.data;
    // Optionally backend might include message:
    const successMessage = data?.message ?? "Registered successfully";

    // Set a short-lived cookie (flash) so the login page can show a success toast
    const cookieStore = await cookies();
    cookieStore.set("register_success", successMessage, {
      path: "/",
      // short life, e.g., 30 seconds
      maxAge: 30,
      httpOnly: false, // client needs to read for toast on login page (non-httpOnly)
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // redirect to login page (outside catch)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // backend might supply field errors or message
      const serverMessage = err.response?.data?.message;
      const serverErrors = err.response?.data?.errors; // common pattern
      const validationErrors: Record<string, string> = {};

      if (serverErrors && typeof serverErrors === "object") {
        // try to map server errors to field errors
        for (const key of Object.keys(serverErrors)) {
          const val = (serverErrors as Record<string, unknown>)[key];
          if (typeof val === "string") validationErrors[key] = val;
          else if (Array.isArray(val) && typeof val[0] === "string")
            validationErrors[key] = val[0];
        }
      }

      return {
        success: false,
        message: serverMessage ?? err.message ?? "Registration failed.",
        validationErrors: Object.keys(validationErrors).length
          ? validationErrors
          : undefined,
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // redirect outside try/catch
  redirect("/login");
}
