"use server";

import { z } from "zod";
import axios from "axios";
import { revalidatePath } from "next/cache";
import apiServer from "@/app/lib/apiServer.server";
import { ActionState } from "@/types/form";
import { AddProductForm, EditProductForm } from "@/types/product-form";

/* ------------------ ZOD SCHEMA ------------------ */
const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
});

const editProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
});

export async function addProductAction(
  _state: ActionState<AddProductForm> | undefined,
  formData: FormData,
): Promise<ActionState<AddProductForm>> {
  /* ------------------ EXTRACT DATA ------------------ */
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    category: formData.get("category"),
  };

  const imageCover = formData.get("imageCover");
  const images = formData.getAll("images");

  /* ------------------ VALIDATION ------------------ */
  const parsed = addProductSchema.safeParse(rawData);

  const errors: Record<string, string> = {};

  if (!parsed.success) {
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (typeof field === "string") {
        errors[field] = err.message;
      }
    });
  }

  if (!(imageCover instanceof File) || imageCover.size === 0) {
    errors.imageCover = "Image cover is required";
  }

  if (
    !images.every(
      (img) =>
        img instanceof File && img.size > 0 && img.type.startsWith("image/"),
    )
  ) {
    errors.images = "At least one product image is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  /* ------------------ API CALL ------------------ */
  try {
    const axiosInstance = await apiServer();

    const payload = new FormData();

    payload.append("title", parsed.data?.title as string);
    payload.append("description", parsed.data?.description as string);
    payload.append("price", String(parsed.data?.price));
    payload.append("brand", parsed.data?.brand as string);
    payload.append("category", parsed.data?.category as string);
    payload.append("imageCover", imageCover as File);

    images.forEach((img) => {
      payload.append("images", img as File);
    });

    const res = await axiosInstance.post("/products", payload);

    revalidatePath("/admin/dashboard/products");

    return {
      success: true,
      message: res.data?.message || "Product created successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to create product",
      };
    }

    return {
      success: false,
      message: "Unknown server error",
    };
  }
}

export async function editProductAction(
  _state: ActionState<EditProductForm> | undefined,
  formData: FormData,
): Promise<ActionState<EditProductForm>> {
  /* ------------------ EXTRACT DATA ------------------ */
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    category: formData.get("category"),
  };

  const imageCover = formData.get("imageCover");
  const images = formData.getAll("images");

  /* ------------------ VALIDATION ------------------ */
  const parsed = editProductSchema.safeParse(rawData);

  const errors: Record<string, string> = {};

  if (!parsed.success) {
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (typeof field === "string") {
        errors[field] = err.message;
      }
    });
  }

  // if (!(imageCover instanceof File) || imageCover.size === 0) {
  //   errors.imageCover = "Image cover is required";
  // }

  // if (
  //   !images.every(
  //     (img) =>
  //       img instanceof File && img.size > 0 && img.type.startsWith("image/"),
  //   )
  // ) {
  //   errors.images = "At least one product image is required";
  // }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  /* ------------------ API CALL ------------------ */
  try {
    const axiosInstance = await apiServer();

    const payload = new FormData();

    payload.append("title", parsed.data?.title as string);
    payload.append("description", parsed.data?.description as string);
    payload.append("price", String(parsed.data?.price));
    payload.append("brand", parsed.data?.brand as string);
    payload.append("category", parsed.data?.category as string);
    if (imageCover instanceof File && imageCover.size > 0) {
      payload.append("imageCover", imageCover as File);
    }

    if (
      images.every(
        (img) =>
          img instanceof File && img.size > 0 && img.type.startsWith("image/"),
      )
    ) {
      images.forEach((img) => {
        payload.append("images", img as File);
      });
    }

    const res = await axiosInstance.patch(
      `/products/${formData.get("id")}`,
      payload,
    );

    revalidatePath(`/admin/dashboard/products/edit/${formData.get("id")}`);
    revalidatePath("/admin/dashboard/products");

    return {
      success: true,
      message: res.data?.message || "Product updated successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update product",
      };
    }

    return {
      success: false,
      message: "Unknown server error",
    };
  }
}
