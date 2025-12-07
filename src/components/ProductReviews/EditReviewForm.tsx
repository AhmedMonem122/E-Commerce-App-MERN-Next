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
  const action = addOrEditReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state?.success) toast.success("Review updated!");
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="flex-1 space-y-3">
      <input type="hidden" name="reviewId" value={review._id} />

      <Input
        type="number"
        min={1}
        max={5}
        name="rating"
        defaultValue={review.rating}
      />

      <Textarea
        name="comment"
        defaultValue={review.review}
        className="min-h-[80px]"
      />

      <Button size="sm" variant="secondary">
        Save
      </Button>
    </form>
  );
};

export default EditReviewForm;
