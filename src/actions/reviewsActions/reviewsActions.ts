"use server";

import apiServer from "@/api/apiServer";
import { revalidatePath } from "next/cache";
import axios from "axios";

export type ActionResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

// ───────────────────────────────────────────
// ADD OR EDIT REVIEW
// ───────────────────────────────────────────
export async function addOrEditReviewAction(
  productId: string,
  _state: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const reviewId = formData.get("reviewId") as string | null;
  const rating = formData.get("rating") as string | null;
  const comment = formData.get("comment") as string | null;

  const errors: Record<string, string> = {};
  if (!rating) errors.rating = "Rating is required";
  if (!comment) errors.comment = "Comment is required";

  if (Object.keys(errors).length > 0) return { success: false, errors };
  const axiosInstance = apiServer();
  try {
    let res;
    if (reviewId) {
      res = await axiosInstance.patch(
        `/products/${productId}/reviews/${reviewId}`,
        { rating, comment }
      );
    } else {
      res = await axiosInstance.post(`/products/${productId}/review`, {
        rating,
        comment,
      });
    }

    revalidatePath(`/products/${productId}`);

    return {
      success: true,
      message: res.data?.message || "Review saved successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to save review",
      };
    }
    return { success: false, message: "Unknown server error" };
  }
}
// ───────────────────────────────────────────
// DELETE REVIEW
// ───────────────────────────────────────────
export async function deleteReviewAction(
  productId: string,
  _state: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const reviewId = formData.get("reviewId") as string | null;

  if (!reviewId) {
    return { success: false, message: "Review ID is required" };
  }
  const axiosInstance = apiServer();
  try {
    const res = await axiosInstance.delete(
      `/products/${productId}/reviews/${reviewId}`
    );

    setTimeout(() => revalidatePath(`/products/${productId}`), 0);

    return {
      success: true,
      message: res.data?.message || "Review deleted successfully",
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
    return { success: false, message: "Unknown server error occurred" };
  }
}

// ───────────────────────────────────────────
// REACT TO REVIEW
// ───────────────────────────────────────────
export async function reactReviewAction(
  productId: string,
  _state: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const reviewId = formData.get("reviewId") as string | null;
  const reactions = formData.get("reactions") as string | null;

  const errors: Record<string, string> = {};
  if (!reactions) errors.reactions = "Reaction is required";
  if (!reviewId) errors.reviewId = "Review ID is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  const axiosInstance = apiServer();
  try {
    const res = await axiosInstance.patch(
      `/products/${productId}/reviews/${reviewId}`,
      { reactions }
    );

    setTimeout(() => revalidatePath(`/products/${productId}`), 0);

    return {
      success: true,
      message: res.data?.message || "Reaction updated successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update reaction",
      };
    }
    return { success: false, message: "Unknown server error occurred" };
  }
}
