// 

import { Rating as StarRating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

export default function Rating({ rating, numReviews }) {
  return (
    <div className="gap-2">
      <StarRating style={{ maxWidth: 120,}} value={rating} readOnly />

      {numReviews !== undefined && (
        <span className="text-sm text-muted-foreground">
          {numReviews} reviews
        </span>
      )}
    </div>
  );
}
