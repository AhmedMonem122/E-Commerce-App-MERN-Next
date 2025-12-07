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
  const action = addOrEditReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="reviewId" value="" />

      <div className="flex gap-4 items-center">
        <Input
          type="number"
          name="rating"
          min={1}
          max={5}
          placeholder="Rating"
          className="w-24"
        />
        <Textarea
          name="comment"
          placeholder="Write your review..."
          className="flex-1 min-h-[80px]"
        />
        <Button type="submit" className="h-12 px-6">
          Submit
        </Button>
      </div>

      {/* Errors */}
      <div className="space-y-1">
        {state?.errors?.rating && (
          <p className="text-red-500 text-sm">{state.errors.rating}</p>
        )}
        {state?.errors?.comment && (
          <p className="text-red-500 text-sm">{state.errors.comment}</p>
        )}
      </div>
    </form>
  );
};

export default AddReviewForm;
