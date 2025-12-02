"use client";

import { useActionState, useEffect } from "react";
import { reactReviewAction } from "@/app/actions/reviewsActions/reviewsActions";
import { Button } from "../ui/button";
import { Review } from "@/types/productDetails";
import { toast } from "sonner";

export type ReactionsFormState = {
  errors?: { reactions?: string; reviewId?: string };
  success?: boolean;
  message?: string;
};

const ReactReviewForm = ({
  productId,
  review,
  reaction,
}: {
  productId: string;
  review: Review;
  reaction: string;
}) => {
  const initialState: ReactionsFormState = {};

  const actionWithId = reactReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(actionWithId, initialState);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="reviewId" value={review._id} />
      <input type="hidden" name="reactions" value={reaction} />

      <Button
        variant={review.reactions === reaction ? "default" : "outline"}
        size="sm"
        type="submit"
      >
        {reaction}
      </Button>

      {state?.errors?.reactions && (
        <p className="text-red-500 text-sm">{state.errors.reactions}</p>
      )}
      {state?.errors?.reviewId && (
        <p className="text-red-500 text-sm">{state.errors.reviewId}</p>
      )}
    </form>
  );
};

export default ReactReviewForm;
