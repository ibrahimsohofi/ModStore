import { useState, useEffect, type FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GAME_RESOURCES } from "../data/gameData";
import { ContentLockerDialog } from "../components/shared/ContentLockerDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import {
  ArrowLeft,
  Download,
  Star,
  User,
  CheckCircle2,
  ExternalLink,
  Clock,
  Calendar,
  Tag,
  Layers,
  Trophy,
  Server,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  FileDown,
  Send,
  Heart
} from "lucide-react";

// Fallback screenshots for games with missing screenshots
const DEFAULT_SCREENSHOTS = [
  "/images/games/screenshots/clash-royale-1.jpg",
  "/images/games/screenshots/pubg-mobile-1.jpg",
  "/images/games/screenshots/candy-crush-1.jpg"
];

// Related games suggestions based on category
const getRelatedGames = (currentGameId: string, category: string) => {
  return GAME_RESOURCES
    .filter(game => game.id !== currentGameId && game.category === category)
    .slice(0, 3);
};

// Dummy reviews - in a real app these would come from a database
const REVIEWS = [
  {
    id: 1,
    user: "GamerPro123",
    rating: 5,
    comment: "Great gameplay and graphics! Runs smoothly on my device. Highly recommended for everyone.",
    date: "3 days ago"
  },
  {
    id: 2,
    user: "MobileGaming42",
    rating: 4,
    comment: "Very fun to play, took a bit longer to download than expected but everything works well.",
    date: "1 week ago"
  },
  {
    id: 3,
    user: "GameWizard",
    rating: 5,
    comment: "One of the best mobile games I've played this year. Amazing mechanics and responsive controls.",
    date: "2 weeks ago"
  }
];

// User review type
interface UserReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Get favorite functionality from context
  const { isFavorite, addToFavorites, removeFromFavorites, addToRecentlyViewed } = useUserPreferences();

  // Find the game by ID
  const game = GAME_RESOURCES.find(game => game.id === gameId);

  // If game not found, redirect to 404
  useEffect(() => {
    if (!game && gameId) {
      navigate("/not-found");
    } else if (game && gameId) {
      // Add to recently viewed
      addToRecentlyViewed(gameId);
    }
  }, [game, gameId, navigate, addToRecentlyViewed]);

  // Load user reviews from localStorage
  useEffect(() => {
    if (gameId) {
      const savedReviews = localStorage.getItem(`reviews_${gameId}`);
      if (savedReviews) {
        setUserReviews(JSON.parse(savedReviews));
      }
    }
  }, [gameId]);

  // Handle screenshot navigation
  const nextScreenshot = () => {
    if (game?.screenshots && game.screenshots.length > 0) {
      setCurrentScreenshot((prev) =>
        prev === game.screenshots.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevScreenshot = () => {
    if (game?.screenshots && game.screenshots.length > 0) {
      setCurrentScreenshot((prev) =>
        prev === 0 ? game.screenshots.length - 1 : prev - 1
      );
    }
  };

  // If game doesn't exist yet (loading state) or wasn't found
  if (!game) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // Get screenshots and handle cases with missing screenshots
  const screenshots = game.screenshots && game.screenshots.length > 0
    ? game.screenshots
    : DEFAULT_SCREENSHOTS;

  // Find related games
  const relatedGames = getRelatedGames(game.id, game.category);
  const isDownloaded = localStorage.getItem(`unlocked_${game.id}`) === 'true';

  // Combine dummy reviews with user reviews
  const allReviews = [...REVIEWS, ...userReviews].sort((a, b) => {
    // This will sort with newest first
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Handle review submission
  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!reviewName.trim() || !reviewComment.trim()) {
      return; // Don't submit empty reviews
    }

    const newReview: UserReview = {
      id: Date.now(),
      user: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: "Just now"
    };

    const updatedReviews = [...userReviews, newReview];
    setUserReviews(updatedReviews);

    // Save to localStorage
    if (gameId) {
      localStorage.setItem(`reviews_${gameId}`, JSON.stringify(updatedReviews));
    }

    // Reset form
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    setReviewSubmitted(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 3000);
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    if (!gameId) return;

    if (isFavorite(gameId)) {
      removeFromFavorites(gameId);
    } else {
      addToFavorites(gameId);
    }
  };

  return (
    <div className="container-custom py-12">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-[#00f7ff] mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Games
      </Link>

      {/* Game header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Game image */}
        <div className="lg:w-1/3">
          <div className="relative overflow-hidden rounded-lg shadow-[0_0_30px_rgba(0,247,255,0.2)] border border-[#00f7ff]/20">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
            {game.featured && (
              <Badge className="absolute top-3 left-3 bg-[#00f7ff] text-primary-foreground">
                Featured
              </Badge>
            )}
            {game.new && (
              <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                New
              </Badge>
            )}

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label={isFavorite(gameId || '') ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite(gameId || '')
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                }`}
              />
            </button>
          </div>

          {/* Game info card */}
          <div className="mt-4 bg-card/70 backdrop-blur-sm rounded-lg border border-[#00f7ff]/20 p-4">
            <h3 className="text-lg font-semibold mb-3 text-[#00f7ff]">Game Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#00f7ff]" />
                  Category:
                </span>
                <span className="text-muted-foreground">{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#00f7ff]" />
                  Developer:
                </span>
                <span className="text-muted-foreground">{game.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#00f7ff]" />
                  Released:
                </span>
                <span className="text-muted-foreground">{game.publishYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#00f7ff]" />
                  Version:
                </span>
                <span className="text-muted-foreground">{game.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#00f7ff]" />
                  Size:
                </span>
                <span className="text-muted-foreground">{game.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#00f7ff]" />
                  Age Rating:
                </span>
                <span className="text-muted-foreground">{game.ageRating}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-[#00f7ff]" />
                  Platforms:
                </span>
                <span className="text-muted-foreground">{game.platforms.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game info */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{game.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="border-[#00f7ff]/40 text-muted-foreground">
              {game.category.toUpperCase()}
            </Badge>
            <div className="flex items-center text-yellow-400">
              <Star className="fill-yellow-400 h-4 w-4 mr-1" />
              <span>{game.rating}/5</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Download className="h-4 w-4 mr-1" />
              <span>{game.unlocks.toLocaleString()} Downloads</span>
            </div>
          </div>

          <p className="text-lg mb-6">{game.description}</p>

          <h3 className="font-semibold text-lg mb-3">Key Features:</h3>
          <ul className="space-y-2 mb-6">
            {game.features.map((feature, index) => (
              <li key={`feature-${index}-${feature.substring(0, 10)}`} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-[#00f7ff] mr-2 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg mb-3">System Requirements:</h3>
          <p className="text-muted-foreground mb-6">{game.requirements}</p>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button
              size="lg"
              className={`px-6 py-6 text-lg ${isDownloaded ? 'bg-green-600 hover:bg-green-700' : 'btn-primary shine-effect'}`}
              onClick={() => setIsDialogOpen(true)}
            >
              <FileDown className="mr-2 h-5 w-5" />
              {isDownloaded ? 'PLAY GAME' : 'DOWNLOAD GAME'}
            </Button>

            {game.storeLink && (
              <a href={game.storeLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="px-6 py-6 text-lg border-[#00f7ff]/30 hover:bg-[#00f7ff]/10">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  VISIT OFFICIAL SITE
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs for additional content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
        <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto bg-muted">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-[#00f7ff] data-[state=active]:text-primary-foreground"
          >
            Screenshots
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-[#00f7ff] data-[state=active]:text-primary-foreground"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="related"
            className="data-[state=active]:bg-[#00f7ff] data-[state=active]:text-primary-foreground"
          >
            Related
          </TabsTrigger>
        </TabsList>

        {/* Screenshots tab */}
        <TabsContent value="details" className="mt-6">
          <div className="relative rounded-lg overflow-hidden border border-[#00f7ff]/20 aspect-video max-w-4xl mx-auto mb-4">
            {/* Main screenshot */}
            <img
              src={screenshots[currentScreenshot]}
              alt={`${game.title} screenshot ${currentScreenshot + 1}`}
              className="w-full h-full object-contain bg-black/70"
              onError={(e) => {
                (e.target as HTMLImageElement).src = game.image;
              }}
            />

            {/* Previous/Next buttons */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={prevScreenshot}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Current/total indicator */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentScreenshot + 1} / {screenshots.length}
            </div>
          </div>

          {/* Thumbnail navigation */}
          {screenshots.length > 1 && (
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {screenshots.map((screenshot, index) => (
                <button
                  key={`${game.id}-thumb-${index}`}
                  onClick={() => setCurrentScreenshot(index)}
                  className={`relative w-24 h-16 overflow-hidden rounded-md transition-all ${
                    currentScreenshot === index
                      ? 'ring-2 ring-[#00f7ff] scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={screenshot}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = game.image;
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Reviews tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Review form for downloaded games */}
            {isDownloaded && (
              <Card className="bg-card/70 backdrop-blur-sm border-[#00f7ff]/20 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#00f7ff]">Leave Your Review</h3>

                  {reviewSubmitted ? (
                    <div className="bg-green-500/20 border border-green-500/30 text-green-500 rounded-md p-4 mb-4 flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span>Thanks for your review! It has been added successfully.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Your Name"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          className="bg-background/50 border-[#00f7ff]/20 focus-visible:ring-[#00f7ff]"
                          required
                        />
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <span className="mr-2">Your Rating:</span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-5 w-5 ${
                                    star <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <Textarea
                          placeholder="Share your thoughts about this game..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="bg-background/50 border-[#00f7ff]/20 focus-visible:ring-[#00f7ff]"
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" className="btn-primary shine-effect">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Review
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Display reviews */}
            {allReviews.map(review => (
              <Card key={review.id} className="bg-card/70 backdrop-blur-sm border-[#00f7ff]/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <div className="text-yellow-400 text-sm">
                        {"⭐".repeat(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}

            {/* If no reviews yet */}
            {allReviews.length === 0 && (
              <div className="text-center py-8 border border-dashed border-[#00f7ff]/20 rounded-lg">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
                <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-muted-foreground mb-4">
                  {isDownloaded
                    ? "Be the first to review this game!"
                    : "Download this game to leave a review."}
                </p>
                {!isDownloaded && (
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="btn-primary shine-effect"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Game
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Related games tab */}
        <TabsContent value="related" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGames.map(relatedGame => (
              <Card key={relatedGame.id} className="bg-card/70 backdrop-blur-sm border-[#00f7ff]/20 overflow-hidden hover:shadow-[0_0_15px_rgba(0,247,255,0.2)] transition-all">
                <div className="h-40 overflow-hidden">
                  <img
                    src={relatedGame.image}
                    alt={relatedGame.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{relatedGame.title}</h3>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Star className="fill-yellow-400 h-3 w-3 mr-1" />
                      <span>{relatedGame.rating}/5</span>
                    </div>
                    <span className="text-muted-foreground">{relatedGame.unlocks.toLocaleString()} Downloads</span>
                  </div>
                  <Link to={`/games/${relatedGame.id}`}>
                    <Button className="w-full btn-primary" size="sm">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Download dialog */}
      <ContentLockerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Download ${game.title}`}
        description="Complete one quick verification to download this game:"
        contentId={game.id}
      />
    </div>
  );
}
