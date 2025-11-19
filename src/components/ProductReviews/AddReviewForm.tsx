"use client";
import { addOrEditReviewAction } from "@/actions/reviewsActions/reviewsActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";

export type AddEditReviewErrors = {
  rating?: string;
  comment?: string;
};

export type AddEditFormState = {
  errors: AddEditReviewErrors;
};

const AddEditReviewForm = ({ productId }: { productId: string }) => {
  const initialState: AddEditFormState = { errors: {} };
  const addOrEditReviewActionWithId = addOrEditReviewAction.bind(
    null,
    productId
  );
  const [state, formAction] = useActionState(
    addOrEditReviewActionWithId,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="reviewId" value="" />
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          min={1}
          max={5}
          name="rating"
          className="w-20"
          placeholder="Rating"
          required
        />
        {state?.errors?.rating && (
          <p className="text-red-500 text-sm">{state?.errors?.rating}</p>
        )}
        <Textarea
          name="comment"
          placeholder="Write your review..."
          className="flex-1"
          required
        />
        {state?.errors?.comment && (
          <p className="text-red-500 text-sm">{state?.errors?.comment}</p>
        )}

        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default AddEditReviewForm;
