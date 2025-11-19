"use server";
import axiosInstance from "@/api/axios";
import { AddEditFormState } from "@/components/ProductReviews/AddReviewForm";
import { ReactionsFormState } from "@/components/ProductReviews/ReactReviewForm";
import axios from "axios";
import { revalidatePath } from "next/cache";
// import { toast } from "sonner";

export type ActionResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function addOrEditReviewAction(
  productId: string,
  state: AddEditFormState | undefined,
  formData: FormData
) {
  const reviewId = formData.get("reviewId") as string | null;
  const rating = formData.get("rating") as string | null;
  const comment = formData.get("comment") as string | null;

  const errors: AddEditFormState["errors"] = {};

  if (!rating) {
    errors.rating = "Rating is required";
  }
  if (!comment) {
    errors.comment = "Comment is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    let res;
    if (reviewId) {
      res = await axiosInstance.patch(
        `/products/${productId}/reviews/${reviewId}`,
        {
          rating,
          comment,
        }
      );
    } else {
      res = await axiosInstance.post(`/products/${productId}/review`, {
        rating,
        comment,
      });
    }
    revalidatePath(`/products/${productId}`);
    console.log(res.data?.message);

    // toast.success(res.data?.message || "Success");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);

      //   toast.error(error.response?.data?.message || error.message);
    }
  }
}

export async function deleteReviewAction(
  productId: string,
  formData: FormData
) {
  const reviewId = formData.get("reviewId") as string | null;
  if (!reviewId) {
    console.log("Review ID is required");

    // toast.error("Review ID is required");
    // return { success: false, message: "Review ID is required" };
  }
  try {
    const res = await axiosInstance.delete(
      `/products/${productId}/reviews/${reviewId}`
    );
    revalidatePath(`/products/${productId}`);
    console.log(res.data?.message);

    // toast.success(res.data?.message || "Review deleted");
    // return { success: true, message: res.data?.message || "Review deleted" };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);

      //   toast.error(error.response?.data?.message || error.message);
      // return {
      //   success: false,
      //   message:
      //     error.response?.data?.message ||
      //     error.message ||
      //     "Failed to delete review",
      // };
    }
  }
}

export async function reactReviewAction(
  productId: string,
  state: ReactionsFormState | undefined,
  formData: FormData
) {
  const reviewId = formData.get("reviewId") as string | null;
  const reactions = formData.get("reactions") as string | null;

  const errors: ReactionsFormState["errors"] = {};

  if (!reactions) {
    errors.reactions = "Reactions is required";
  }
  if (!reviewId) {
    errors.reviewId = "Review ID is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const res = await axiosInstance.patch(
      `/products/${productId}/reviews/${reviewId}`,
      { reactions }
    );
    revalidatePath(`/products/${productId}`);
    console.log(res.data?.message);

    // toast.success(res.data?.message || "Reaction updated");
    // return { success: true, message: res.data?.message || "Reaction updated" };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);

      //   toast.error(error.response?.data?.message || error.message);
      //   return {
      //     success: false,
      //     message:
      //       error.response?.data?.message ||
      //       error.message ||
      //       "Failed to update reaction",
      //   };
    }
  }
}
