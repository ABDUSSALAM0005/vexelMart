import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const submitReview = async () => {
    const res = await fetch(`/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, review, productId })
    });
  };

  return (
    <div>
      <Rating value={rating} onChange={setRating} />
      
      <textarea
        className="mt-2 border p-2 w-full"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
      />

      <button onClick={submitReview} className="mt-3 bg-primary px-4 py-2 text-white">
        Submit Review
      </button>
    </div>
  );
}
