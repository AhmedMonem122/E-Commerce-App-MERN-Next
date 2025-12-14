"use server";

import apiServer from "@/app/lib/apiServer.server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

/* ---------------------------------- */
/* ZOD SCHEMAS */
/* ---------------------------------- */

export type ProfileFormState = {
  success?: boolean;
  message?: string;
  validationErrors?: Record<string, string>;
};

const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z
  .object({
    passwordCurrent: z.string().min(8),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

/* ---------------------------------- */
/* UPDATE PROFILE */
/* ---------------------------------- */

export async function updateProfileAction(
  _: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  try {
    const parsed = updateProfileSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
    });

    if (!parsed.success) {
      return {
        validationErrors: parsed.error.flatten().fieldErrors as Record<
          string,
          string
        >,
      };
    }

    // 🔥 IMPORTANT FIX
    const photo = formData.get("photo");

    // If no file selected → remove photo from formData
    if (!photo || (photo instanceof File && photo.size === 0)) {
      formData.delete("photo");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { message: "Unauthorized" };
    }

    const api = await apiServer();

    await api.patch("/users/updateMe", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Revalidate the profile path to show updated info
    revalidatePath("/profile");

    return { success: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        message: err.response?.data?.message || "Failed to update profile",
      };
    }

    return { message: "Something went wrong" };
  }
}

/* ---------------------------------- */
/* CHANGE PASSWORD */
/* ---------------------------------- */

export async function changePasswordAction(
  _: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  try {
    const parsed = passwordSchema.safeParse({
      passwordCurrent: formData.get("passwordCurrent"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    });

    if (!parsed.success) {
      const validationErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") validationErrors[key] = issue.message;
      });

      return { success: false, validationErrors };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const api = await apiServer();

    await api.put("/users/updateMyPassword", parsed.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
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
        message: serverMessage ?? err.message ?? "Password update failed",
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
}

/* ---------------------------------- */
/* DELETE ACCOUNT */
/* ---------------------------------- */

export async function deleteAccountAction(): Promise<ProfileFormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const api = await apiServer();

    await api.delete("/users/deleteMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    cookieStore.delete("token");

    return { success: true };
  } catch {
    return { success: false, message: "Failed to delete account" };
  }
}
