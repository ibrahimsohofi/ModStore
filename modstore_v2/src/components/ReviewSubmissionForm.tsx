import type React from 'react';
import { useState } from 'react';
import { FiStar, FiSend, FiX } from 'react-icons/fi';

interface ReviewSubmissionFormProps {
  gameId: string;
  gameName: string;
  onSubmit?: (review: ReviewData) => void;
  className?: string;
}

export interface ReviewData {
  id: string;
  gameId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({
  gameId,
  gameName,
  onSubmit,
  className = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle review submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || rating === 0 || !comment) {
      setError('Please fill out all fields and provide a rating.');
      return;
    }

    if (comment.length < 10) {
      setError('Please provide a more detailed review (at least 10 characters).');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Create review object
    const reviewData: ReviewData = {
      id: `review-${gameId}-${Date.now()}`,
      gameId,
      name,
      email,
      rating,
      comment,
      date: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(reviewData);
      }

      // Reset the form
      setName('');
      setEmail('');
      setRating(0);
      setComment('');
      setIsSubmitting(false);
      setIsSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (selectedRating: number) => {
    setHoverRating(selectedRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={`bg-dark-600 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-4">Write a Review for {gameName}</h3>

      {isSuccess ? (
        <div className="bg-green-900/20 border border-green-800 text-green-400 p-4 rounded-lg mb-4 flex justify-between items-center">
          <div>
            <p className="font-medium">Thank you for your review!</p>
            <p className="text-sm mt-1">Your feedback helps other users make informed decisions.</p>
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-green-400 hover:text-green-300"
          >
            <FiX size={20} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-1">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-dark-700 border border-dark-500 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@example.com"
                className="w-full bg-dark-700 border border-dark-500 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={`star-${star}`}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className="text-2xl mr-1 focus:outline-none"
                >
                  <FiStar
                    className={`
                      ${(hoverRating !== 0 ? star <= hoverRating : star <= rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-500'
                      } transition-colors
                    `}
                  />
                </button>
              ))}
              <span className="text-gray-400 ml-2 text-sm">
                {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-300 mb-1">Your Review</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this modded game..."
              rows={5}
              className="w-full bg-dark-700 border border-dark-500 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                bg-primary-500 text-white py-2 px-6 rounded-full
                flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-600'}
                transition-colors
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" /> Submit Review
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <p className="text-gray-400 text-xs mt-4">
        Your email address will not be published. Required fields are marked *
      </p>
    </div>
  );
};

export default ReviewSubmissionForm;
