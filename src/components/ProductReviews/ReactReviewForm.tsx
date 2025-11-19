"use client";
import { reactReviewAction } from "@/actions/reviewsActions/reviewsActions";
import { Button } from "../ui/button";
import { useActionState } from "react";
import { Review } from "@/types/productDetails";

export type ReactionErrors = {
  reactions?: string;
  reviewId?: string;
};

export type ReactionsFormState = {
  errors: ReactionErrors;
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
  const initialState: ReactionsFormState = { errors: {} };
  const addReactionsWithId = reactReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(addReactionsWithId, initialState);

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
        <p className="text-red-500 text-sm">{state?.errors?.reactions}</p>
      )}
      {state?.errors?.reviewId && (
        <p className="text-red-500 text-sm">{state?.errors?.reviewId}</p>
      )}
    </form>
  );
};

export default ReactReviewForm;
