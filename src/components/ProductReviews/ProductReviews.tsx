"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import api from "@/api/axios";
import { ProductDetails, Review } from "@/types/productDetails";

export default function ProductReviews({
  productId,
  product,
}: {
  productId: string;
  product: ProductDetails;
}) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Add review
  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      return api.post(`/products/${productId}/review`, newReview, {});
    },
    onSuccess: () => {
      toast.success("Review added!");
      setComment("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: () => toast.error("Failed to add review"),
  });

  // Edit review
  const editReviewMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.patch(
        `/products/${productId}/reviews/${editingReview?._id}`,
        { rating, comment }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Review updated!");
      setEditingReview(null);
      setComment("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: () => toast.error("Failed to update review"),
  });

  // Delete review
  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      await api.delete(`/products/${productId}/reviews/${reviewId}`);
    },
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: () => toast.error("Failed to delete review"),
  });

  // Update reactions
  const updateReactionsMutation = useMutation({
    mutationFn: async ({
      reviewId,
      reactions,
    }: {
      reviewId: string;
      reactions: "Like" | "Dislike" | "Love";
    }) => {
      await api.patch(`/products/${productId}/reviews/${reviewId}`, {
        reactions,
      });
    },
    onSuccess: () => {
      toast.success("Reaction updated!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: () => toast.error("Failed to update reaction"),
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editingReview) {
              editReviewMutation.mutate();
            } else {
              addReviewMutation.mutate();
            }
          }}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-20"
              placeholder="Rating"
            />
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={
                addReviewMutation.isPending || editReviewMutation.isPending
              }
            >
              {editingReview ? "Update" : "Add"}
            </Button>
            {editingReview && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingReview(null);
                  setComment("");
                  setRating(5);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {product.reviews.map((review: Review) => (
          <Card key={review._id} className="flex flex-col">
            <CardContent className="flex flex-col gap-2">
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
              <p className="text-gray-700">{review.review}</p>
              <div className="flex gap-2 mt-2">
                {["Like", "Dislike", "Love"].map((reaction) => (
                  <Button
                    key={reaction}
                    variant={
                      review.reactions === reaction ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateReactionsMutation.mutate({
                        reviewId: review._id,
                        reactions: reaction as "Like" | "Dislike" | "Love",
                      })
                    }
                  >
                    {reaction}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingReview(review);
                    setComment(review.review);
                    setRating(review.rating);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteReviewMutation.mutate(review._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
