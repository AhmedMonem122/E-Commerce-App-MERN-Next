"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { reactReviewAction } from "@/actions/reviewsActions/reviewsActions";
import { Review } from "@/types/productDetails";

export type ReactionsFormState = {
  errors?: {
    reactions?: string;
    reviewId?: string;
  };
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
  const initialState: ReactionsFormState = {
    errors: {},
    success: undefined,
    message: undefined,
  };

  const addReactionsWithId = reactReviewAction.bind(null, productId);

  const [state, formAction] = useActionState(addReactionsWithId, initialState);

  // 🔥 Trigger toast messages based on state changes
  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message || "Reaction updated");
    }

    if (state?.success === false) {
      toast.error(state.message || "Failed to update reaction");
    }
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
