"use client";
import { addOrEditReviewAction } from "@/actions/reviewsActions/reviewsActions";
import { Review } from "@/types/productDetails";
import { useActionState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export type AddEditReviewErrors = {
  rating?: string;
  comment?: string;
};

export type AddEditFormState = {
  errors: AddEditReviewErrors;
};

const EditReviewForm = ({
  productId,
  review,
}: {
  productId: string;
  review: Review;
}) => {
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
    <form className="space-y-4" action={formAction}>
      <input type="hidden" name="reviewId" value={review._id} />
      <Input
        type="number"
        min={1}
        max={5}
        name="rating"
        defaultValue={review.rating}
        className="w-20"
        placeholder="Rating"
        required
      />
      {state?.errors?.rating && (
        <p className="text-red-500 text-sm">{state?.errors?.rating}</p>
      )}
      <Textarea
        name="comment"
        defaultValue={review.review}
        placeholder="Edit your review..."
        className="flex-1"
        required
      />
      {state?.errors?.comment && (
        <p className="text-red-500 text-sm">{state?.errors?.comment}</p>
      )}
      <Button type="submit" variant="outline" size="sm">
        Update
      </Button>
    </form>
  );
};

export default EditReviewForm;
