"use client";

import { useActionState, useEffect } from "react";
import { addOrEditReviewAction } from "@/app/actions/reviewsActions/reviewsActions";
import { Review } from "@/types/productDetails";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

export type EditFormState = {
  errors?: { rating?: string; comment?: string };
  success?: boolean;
  message?: string;
};

const EditReviewForm = ({
  productId,
  review,
}: {
  productId: string;
  review: Review;
}) => {
  const initialState: EditFormState = {};

  const actionWithId = addOrEditReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(actionWithId, initialState);

  useEffect(() => {
    // This triggers **after the form action updates state**
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form className="space-y-4" action={formAction}>
      <input type="hidden" name="reviewId" value={review._id} />

      <Input
        type="number"
        name="rating"
        min={1}
        max={5}
        defaultValue={review.rating}
        className="w-20"
      />
      {state?.errors?.rating && (
        <p className="text-red-500 text-sm">{state.errors.rating}</p>
      )}

      <Textarea
        name="comment"
        defaultValue={review.review}
        placeholder="Edit your review..."
      />
      {state?.errors?.comment && (
        <p className="text-red-500 text-sm">{state.errors.comment}</p>
      )}

      <Button type="submit" variant="outline" size="sm">
        Update
      </Button>
    </form>
  );
};

export default EditReviewForm;
