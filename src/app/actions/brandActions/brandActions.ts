"use server";

import { z } from "zod";
import axios from "axios";
import { revalidatePath } from "next/cache";
import apiServer from "@/app/lib/apiServer.server";
import { ActionState } from "@/types/form";
import {
  AddBrandForm,
  // , EditBrandForm
} from "@/types/brand-form";

/* ------------------ ZOD SCHEMA ------------------ */
const addBrandSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  products: z.string().array().min(1, "At least one product is required"),
});

// const editBrandSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   price: z.coerce.number().positive("Price must be greater than 0"),
//   brand: z.string().min(1, "Brand is required"),
//   category: z.string().min(1, "Category is required"),
// });

export async function addBrandAction(
  _state: ActionState<AddBrandForm> | undefined,
  formData: FormData,
): Promise<ActionState<AddBrandForm>> {
  /* ------------------ EXTRACT DATA ------------------ */
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    products: formData.getAll("products"),
  };

  const image = formData.get("image");

  /* ------------------ VALIDATION ------------------ */
  const parsed = addBrandSchema.safeParse(rawData);

  const errors: Record<string, string> = {};

  if (!parsed.success) {
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (typeof field === "string") {
        errors[field] = err.message;
      }
    });
  }

  if (!(image instanceof File) || image.size === 0) {
    errors.image = "Image is required";
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
    payload.append("category", parsed.data?.category as string);
    payload.append("products", JSON.stringify(parsed.data?.products));
    payload.append("image", image as File);

    const res = await axiosInstance.post("/brands", payload);

    revalidatePath("/admin/dashboard/brands");

    return {
      success: true,
      message: res.data?.message || "Brand created successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to create brand",
      };
    }

    return {
      success: false,
      message: "Unknown server error",
    };
  }
}

// export async function editBrandAction(
//   _state: ActionState<EditBrandForm> | undefined,
//   formData: FormData,
// ): Promise<ActionState<EditBrandForm>> {
//   /* ------------------ EXTRACT DATA ------------------ */
//   const rawData = {
//     title: formData.get("title"),
//     description: formData.get("description"),
//     price: formData.get("price"),
//     brand: formData.get("brand"),
//     category: formData.get("category"),
//   };

//   const imageCover = formData.get("imageCover");
//   const images = formData.getAll("images");

//   /* ------------------ VALIDATION ------------------ */
//   const parsed = editBrandSchema.safeParse(rawData);

//   const errors: Record<string, string> = {};

//   if (!parsed.success) {
//     parsed.error.issues.forEach((err) => {
//       const field = err.path[0];
//       if (typeof field === "string") {
//         errors[field] = err.message;
//       }
//     });
//   }

//   // if (!(imageCover instanceof File) || imageCover.size === 0) {
//   //   errors.imageCover = "Image cover is required";
//   // }

//   // if (
//   //   !images.every(
//   //     (img) =>
//   //       img instanceof File && img.size > 0 && img.type.startsWith("image/"),
//   //   )
//   // ) {
//   //   errors.images = "At least one brand image is required";
//   // }

//   if (Object.keys(errors).length > 0) {
//     return {
//       success: false,
//       errors,
//     };
//   }

//   /* ------------------ API CALL ------------------ */
//   try {
//     const axiosInstance = await apiServer();

//     const payload = new FormData();

//     payload.append("title", parsed.data?.title as string);
//     payload.append("description", parsed.data?.description as string);
//     payload.append("price", String(parsed.data?.price));
//     payload.append("brand", parsed.data?.brand as string);
//     payload.append("category", parsed.data?.category as string);
//     if (imageCover instanceof File && imageCover.size > 0) {
//       payload.append("imageCover", imageCover as File);
//     }

//     if (
//       images.every(
//         (img) =>
//           img instanceof File && img.size > 0 && img.type.startsWith("image/"),
//       )
//     ) {
//       images.forEach((img) => {
//         payload.append("images", img as File);
//       });
//     }

//     const res = await axiosInstance.patch(
//       `/brands/${formData.get("id")}`,
//       payload,
//     );

//     revalidatePath(`/admin/dashboard/brands/edit/${formData.get("id")}`);
//     revalidatePath("/admin/dashboard/brands");

//     return {
//       success: true,
//       message: res.data?.message || "Brand updated successfully",
//     };
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       return {
//         success: false,
//         message:
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to update brand",
//       };
//     }

//     return {
//       success: false,
//       message: "Unknown server error",
//     };
//   }
// }
