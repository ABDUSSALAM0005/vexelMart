import { StarRating } from 'react-flexible-star-rating';
import { useState } from 'react';

function RatingInput() {
  const [rating, setRating] = useState(0);

  return <StarRating initialRating={rating} onRatingChange={setRating} />;
}

export default RatingInput
