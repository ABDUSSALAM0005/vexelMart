// import { StarRating } from 'react-flexible-star-rating';
// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// function RatingInput() {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const { user } =  useAuth()

//   return <StarRating initialRating={rating} onRatingChange={setRating} />;
// }

// export default RatingInput

import { useState } from 'react';
import { Star, MessageSquare, User, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from './lib/axios'; // Adjust your path
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Adjust your path

export default function ProductReviews({ product, onReviewSubmitted }) {
  const { user } = useAuth(); // Get logged in user
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0); // For the hover effect
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a star rating");
    
    setLoading(true);
    try {
      await api.post(`/products/${product._id}/reviews`, {
        rating,
        comment,
      });
      
      toast.success('Review Submitted!');
      setComment('');
      setRating(0);
      
      // Trigger a refresh in the parent component
      if (onReviewSubmitted) onReviewSubmitted();
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-2">
      
      {/* LEFT COLUMN: Existing Reviews List */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageSquare className="text-primary" /> 
          Reviews ({product.reviews.length})
        </h3>

        {product.reviews.length === 0 && (
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center text-gray-400">
            No reviews yet. Be the first to verify this product!
          </div>
        )}

        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review._id} className="p-5 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                {/* Static Stars for Display */}
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={star <= review.rating ? "fill-current" : "text-gray-600"} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Write a Review Form */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Write a Review</h3>
        
        {user ? (
          <form onSubmit={submitHandler} className="p-6 rounded-2xl bg-card border border-white/10 shadow-xl">
            
            {/* 1. Interactive Star Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rate this product
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    // LOGIC: Set rating on click, set hover state on mouse over
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={`transition-colors duration-200 ${
                        star <= (hover || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Average"}
                {rating === 4 && "Good"}
                {rating === 5 && "Excellent!"}
              </p>
            </div>

            {/* 2. Comment Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Share your thoughts
              </label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike?"
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : (
                <>
                  Submit Review <Send size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          // Fallback if not logged in
          <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 mb-4">Please login to write a review</p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
            >
              Login Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}