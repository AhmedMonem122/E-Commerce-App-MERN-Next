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
    <section className="space-y-8 py-10">
      <Toaster position="bottom-right" />

      <h2 className="text-3xl font-bold tracking-tight">Customer Reviews</h2>

      {/* 💬 Add Review */}
      <Card className="shadow-sm border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <AddReviewForm productId={productId} />
      </Card>

      {/* 📝 Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.reviews?.map((review: Review) => (
          <Card
            key={review._id}
            className="rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all bg-white"
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Image
                  src={review.user.photo}
                  alt={review.user.name}
                  width={45}
                  height={45}
                  className="rounded-full border shadow-sm"
                />
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-yellow-500 font-medium">
                    {review.rating} ★
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{review.review}</p>

              {/* Reactions */}
              <div className="flex flex-wrap gap-2">
                {["Like", "Dislike", "Love"].map((reaction) => (
                  <ReactReviewForm
                    key={reaction}
                    productId={productId}
                    reaction={reaction}
                    review={review}
                  />
                ))}
              </div>

              {/* Edit + Delete */}
              <div className="flex gap-3 pt-4 border-t">
                <EditReviewForm productId={productId} review={review} />
                <DeleteReviewForm productId={productId} review={review} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
