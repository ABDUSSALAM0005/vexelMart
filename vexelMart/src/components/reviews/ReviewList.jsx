import { Rating } from "@smastrom/react-rating";

export default function ProductReviews({ reviews }) {
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Rating value={averageRating} readOnly />
        <span>({reviews.length} reviews)</span>
      </div>

      {reviews.map((r) => (
        <div key={r._id} className="mt-4 border-b pb-3">
          <Rating value={r.rating} readOnly />
          <p className="mt-1">{r.review}</p>
        </div>
      ))}
    </div>
  );
}
