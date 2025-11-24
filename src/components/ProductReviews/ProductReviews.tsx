import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ProductDetails, Review } from "@/types/productDetails";
import AddReviewForm from "./AddReviewForm";
import ReactReviewForm from "./ReactReviewForm";
import EditReviewForm from "./EditReviewForm";
import DeleteReviewForm from "./DeleteReviewForm";
import { Toaster } from "sonner";

interface ProductReviewsProps {
  productId: string;
  product: ProductDetails;
}

export default function ProductReviews({
  productId,
  product,
}: ProductReviewsProps) {
  return (
    <section className="space-y-6">
      {/* ✅ Render Toaster once for the whole page */}
      <Toaster position="bottom-right" />

      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {/* Add Review Form */}
      <div className="mb-6">
        <AddReviewForm productId={productId} />
      </div>

      {/* Existing Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {product.reviews.map((review: Review) => (
          <Card key={review._id} className="flex flex-col">
            <CardContent className="flex flex-col gap-2">
              {/* User Info */}
              <div className="flex items-center gap-2">
                {review.user.photo && (
                  <Image
                    src={review.user.photo}
                    alt={review.user.name}
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                )}
                <span className="font-semibold">{review.user.name}</span>
                <span className="text-yellow-500">{review.rating}★</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700">{review.review}</p>

              {/* Reactions + Delete */}
              <div className="flex gap-2 mt-2">
                {["Like", "Dislike", "Love"].map((reaction) => (
                  <ReactReviewForm
                    key={reaction}
                    productId={productId}
                    reaction={reaction}
                    review={review}
                  />
                ))}
                <DeleteReviewForm productId={productId} review={review} />
              </div>

              {/* Edit Review */}
              <EditReviewForm productId={productId} review={review} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
