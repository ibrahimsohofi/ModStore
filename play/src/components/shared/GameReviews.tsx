import type React from 'react';
import { useState, useEffect } from 'react';
import { Star, ThumbsUp, Clock, ShieldCheck, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { GameReview, GameRating } from '@/types/games';

interface GameReviewsProps {
  gameId: string;
  gameName: string;
}

const GameReviews: React.FC<GameReviewsProps> = ({ gameId, gameName }) => {
  const [reviews, setReviews] = useState<GameReview[]>([]);
  const [rating, setRating] = useState<GameRating | null>(null);
  const [userReview, setUserReview] = useState<GameReview | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    userName: ''
  });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');

  useEffect(() => {
    loadReviews();
    loadRating();
    loadUserReview();
  }, [gameId]);

  const loadReviews = () => {
    const storedReviews = localStorage.getItem(`reviews_${gameId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  };

  const loadRating = () => {
    const storedRating = localStorage.getItem(`rating_${gameId}`);
    if (storedRating) {
      setRating(JSON.parse(storedRating));
    } else {
      // Initialize empty rating
      setRating({
        gameId,
        averageRating: 0,
        totalRatings: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }
  };

  const loadUserReview = () => {
    const userId = localStorage.getItem('userId') || 'anonymous';
    const storedReviews = localStorage.getItem(`reviews_${gameId}`);
    if (storedReviews) {
      const reviews = JSON.parse(storedReviews);
      const existingReview = reviews.find((r: GameReview) => r.userId === userId);
      setUserReview(existingReview || null);
    }
  };

  const calculateRating = (reviews: GameReview[]): GameRating => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
      totalRating += review.rating;
    });

    return {
      gameId,
      averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
      totalRatings: reviews.length,
      ratingDistribution: distribution
    };
  };

  const handleSubmitReview = () => {
    if (!newReview.title.trim() || !newReview.content.trim() || !newReview.userName.trim()) {
      return;
    }

    const userId = localStorage.getItem('userId') || 'anonymous';
    const review: GameReview = {
      id: Math.random().toString(36).substr(2, 9),
      gameId,
      userId,
      userName: newReview.userName,
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString(),
      helpful: 0,
      verified: Math.random() > 0.3 // Simulate verification status
    };

    const updatedReviews = userReview
      ? reviews.map(r => r.userId === userId ? review : r)
      : [...reviews, review];

    setReviews(updatedReviews);
    setUserReview(review);
    localStorage.setItem(`reviews_${gameId}`, JSON.stringify(updatedReviews));

    // Update rating
    const newRating = calculateRating(updatedReviews);
    setRating(newRating);
    localStorage.setItem(`rating_${gameId}`, JSON.stringify(newRating));
    localStorage.setItem('userId', userId);

    setIsAddingReview(false);
    setNewReview({ rating: 5, title: '', content: '', userName: '' });
  };

  const handleHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${gameId}`, JSON.stringify(updatedReviews));
  };

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${gameId}`, JSON.stringify(updatedReviews));

    // Update rating
    const newRating = calculateRating(updatedReviews);
    setRating(newRating);
    localStorage.setItem(`rating_${gameId}`, JSON.stringify(newRating));

    if (userReview?.id === reviewId) {
      setUserReview(null);
    }
  };

  const getSortedAndFilteredReviews = () => {
    let filtered = reviews;

    if (filterBy !== 'all') {
      filtered = reviews.filter(review => review.rating === filterBy);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'helpful':
          return b.helpful - a.helpful;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const renderRatingDistribution = () => {
    if (!rating || rating.totalRatings === 0) return null;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-2 text-sm">
            <span className="w-6">{stars}</span>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Progress
              value={(rating.ratingDistribution[stars as keyof typeof rating.ratingDistribution] / rating.totalRatings) * 100}
              className="flex-1 h-2"
            />
            <span className="text-gray-500 w-8">
              {rating.ratingDistribution[stars as keyof typeof rating.ratingDistribution]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            Player Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rating && rating.totalRatings > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {rating.averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(rating.averageRating))}
                <p className="text-gray-600 mt-2">
                  Based on {rating.totalRatings} review{rating.totalRatings !== 1 ? 's' : ''}
                </p>
              </div>
              <div>
                {renderRatingDistribution()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No reviews yet</p>
              <p className="text-sm text-gray-400">Be the first to review {gameName}!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{userReview ? 'Your Review' : 'Write a Review'}</span>
            {userReview && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNewReview({
                      rating: userReview.rating,
                      title: userReview.title,
                      content: userReview.content,
                      userName: userReview.userName
                    });
                    setIsAddingReview(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteReview(userReview.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userReview && !isAddingReview ? (
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(userReview.rating)}
                <Badge variant={userReview.verified ? "default" : "secondary"}>
                  {userReview.verified ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <h4 className="font-semibold mb-2">{userReview.title}</h4>
              <p className="text-gray-700 mb-2">{userReview.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(userReview.date).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <Dialog open={isAddingReview} onOpenChange={setIsAddingReview}>
              <DialogTrigger asChild>
                <Button>
                  {userReview ? 'Edit Review' : 'Write Review'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-[95vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {userReview ? 'Edit Your Review' : 'Write a Review'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <Input
                      placeholder="Enter your name"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    {renderStars(newReview.rating, true, (rating) =>
                      setNewReview({ ...newReview, rating })
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      placeholder="Summary of your review"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Review</label>
                    <Textarea
                      placeholder="Share your thoughts about this game..."
                      rows={4}
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmitReview} className="flex-1">
                      {userReview ? 'Update Review' : 'Submit Review'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingReview(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Reviews ({reviews.length})</CardTitle>
              <div className="flex gap-2">
                <select
                  className="px-3 py-1 border rounded text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="helpful">Most Helpful</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <select
                  className="px-3 py-1 border rounded text-sm"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value === 'all' ? 'all' : Number(e.target.value) as any)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getSortedAndFilteredReviews().map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {review.userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="default" className="text-xs">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {renderStars(review.rating)}
                          <Clock className="h-3 w-3" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{review.title}</h4>
                  <p className="text-gray-700 mb-3">{review.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameReviews;
