"use client";

import { useActionState, useEffect } from "react";
import {
  deleteReviewAction,
  ActionResponse,
} from "@/actions/reviewsActions/reviewsActions";
import { Button } from "../ui/button";
import { Review } from "@/types/productDetails";
import { toast } from "sonner";

const DeleteReviewForm = ({
  productId,
  review,
}: {
  productId: string;
  review: Review;
}) => {
  const initialState: ActionResponse = {};

  const actionWithId = deleteReviewAction.bind(null, productId);
  const [state, formAction] = useActionState(actionWithId, initialState);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="reviewId" value={review._id} />
      <Button variant="destructive" size="sm" type="submit">
        Delete
      </Button>
    </form>
  );
};

export default DeleteReviewForm;
