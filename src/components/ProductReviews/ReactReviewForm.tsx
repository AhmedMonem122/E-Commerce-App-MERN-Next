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
  const action = reactReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (!state?.success && state?.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="reviewId" value={review._id} />
      <input type="hidden" name="reactions" value={reaction} />

      <Button
        size="sm"
        variant={review.reactions === reaction ? "default" : "outline"}
        className="rounded-full px-4"
      >
        {reaction}
      </Button>
    </form>
  );
};

export default ReactReviewForm;
