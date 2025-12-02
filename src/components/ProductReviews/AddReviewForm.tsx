"use client";

import { useActionState, useEffect } from "react";
import { addOrEditReviewAction } from "@/app/actions/reviewsActions/reviewsActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

export type AddFormState = {
  errors?: { rating?: string; comment?: string };
  success?: boolean;
  message?: string;
};

const AddReviewForm = ({ productId }: { productId: string }) => {
  const initialState: AddFormState = {};

  const actionWithId = addOrEditReviewAction.bind(null, productId);

  const [state, formAction] = useActionState(actionWithId, initialState);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="reviewId" value="" />

      <div className="flex gap-2 items-center">
        <Input
          type="number"
          name="rating"
          min={1}
          max={5}
          placeholder="Rating"
          className="w-20"
        />
        {state?.errors?.rating && (
          <p className="text-red-500 text-sm">{state.errors.rating}</p>
        )}

        <Textarea name="comment" placeholder="Write your review..." />
        {state?.errors?.comment && (
          <p className="text-red-500 text-sm">{state.errors.comment}</p>
        )}

        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default AddReviewForm;
