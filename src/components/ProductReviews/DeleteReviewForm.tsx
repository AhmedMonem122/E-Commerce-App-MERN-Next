import { deleteReviewAction } from "@/actions/reviewsActions/reviewsActions";
import { Button } from "../ui/button";
import { Review } from "@/types/productDetails";

const DeleteReviewForm = ({
  productId,
  review,
}: {
  productId: string;
  review: Review;
}) => {
  const deleteReviewActionWithId = deleteReviewAction.bind(null, productId);

  return (
    <form action={deleteReviewActionWithId}>
      <input type="hidden" name="reviewId" value={review._id} />
      <Button variant="destructive" size="sm" type="submit">
        Delete
      </Button>
    </form>
  );
};

export default DeleteReviewForm;
