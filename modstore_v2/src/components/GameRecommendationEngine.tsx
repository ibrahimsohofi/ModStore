import type React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiThumbsUp, FiThumbsDown, FiArrowRight, FiRefreshCw, FiHeart } from 'react-icons/fi';
import type { App } from '../data/apps';

interface GameRecommendationEngineProps {
  allGames: App[];
  className?: string;
  onAddToWishlist?: (game: App) => void;
}

// Preference types that will be used to recommend games
type GamePreference = {
  category?: 'Action' | 'Casual' | 'RPG' | 'Arcade' | 'Strategy';
  features?: string[];
  rating?: number;
  popularity?: 'high' | 'medium' | 'low';
};

type UserPreferences = {
  likedGames: Set<string>;
  dislikedGames: Set<string>;
  preferences: GamePreference;
};

const GameRecommendationEngine: React.FC<GameRecommendationEngineProps> = ({
  allGames,
  className = '',
  onAddToWishlist
}) => {
  const [recommendations, setRecommendations] = useState<App[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    likedGames: new Set<string>(),
    dislikedGames: new Set<string>(),
    preferences: {
      rating: 4.5 // Start with recommending higher-rated games
    }
  });

  // Preference tags that users can select
  const preferenceTags = [
    { id: 'action', name: 'Action', icon: '🎮' },
    { id: 'casual', name: 'Casual', icon: '🍭' },
    { id: 'rpg', name: 'RPG', icon: '⚔️' },
    { id: 'unlimited-money', name: 'Unlimited Money', icon: '💰' },
    { id: 'ad-free', name: 'Ad-Free', icon: '🚫' },
    { id: 'premium', name: 'Premium Features', icon: '✨' },
    { id: 'unlocked', name: 'All Unlocked', icon: '🔓' },
    { id: 'high-graphics', name: 'High Graphics', icon: '🎨' }
  ];

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Initial fetch of recommendations
  useEffect(() => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      generateRecommendations();
      setLoading(false);
    }, 800);
  }, [userPreferences]);

  // Generate recommendations based on current preferences
  const generateRecommendations = () => {
    // Filter the available games based on preferences
    let filteredGames = [...allGames];

    // Don't recommend games the user has already seen
    filteredGames = filteredGames.filter(game =>
      !userPreferences.likedGames.has(game.id) &&
      !userPreferences.dislikedGames.has(game.id)
    );

    // Filter by selected tags
    if (selectedTags.size > 0) {
      filteredGames = filteredGames.filter(game => {
        // Match by subcategory
        if (game.subcategory && selectedTags.has(game.subcategory.toLowerCase())) {
          return true;
        }

        // Match by features or mod types
        const modTypeTags = game.modType?.map(type => type.toLowerCase()) || [];

        return Array.from(selectedTags).some(tag =>
          modTypeTags.includes(tag) ||
          (game.features && game.features.some(feature =>
            feature.toLowerCase().includes(tag)
          ))
        );
      });
    }

    // Sort by rating if that's a preference
    if (userPreferences.preferences.rating) {
      filteredGames.sort((a, b) => b.rating - a.rating);
    }

    // If we've learned from likes/dislikes, use that to adjust recommendations
    if (userPreferences.likedGames.size > 0) {
      // Simple collaborative filtering - boost games similar to liked ones
      const likedGameIds = Array.from(userPreferences.likedGames);
      const likedGames = allGames.filter(game => likedGameIds.includes(game.id));

      // Boost scores for games with similar categories or features
      filteredGames = filteredGames.map(game => {
        let similarityScore = 0;

        likedGames.forEach(likedGame => {
          // Same category/subcategory
          if (game.category === likedGame.category) similarityScore += 2;
          if (game.subcategory === likedGame.subcategory) similarityScore += 3;

          // Similar features
          const gameFeatures = game.features || [];
          const likedFeatures = likedGame.features || [];

          likedFeatures.forEach(feature => {
            if (gameFeatures.some(f => f.includes(feature))) similarityScore += 1;
          });

          // Similar mod types
          const gameModTypes = game.modType || [];
          const likedModTypes = likedGame.modType || [];

          likedModTypes.forEach(modType => {
            if (gameModTypes.includes(modType)) similarityScore += 2;
          });
        });

        return { game, similarityScore };
      }).sort((a, b) => b.similarityScore - a.similarityScore)
        .map(item => item.game);
    }

    // Get at most 5 recommendations
    setRecommendations(filteredGames.slice(0, 5));
    setCurrentIndex(0);
  };

  // Handle user liking a game
  const handleLike = (game: App) => {
    // Update preferences
    setUserPreferences(prev => {
      const newLikedGames = new Set(prev.likedGames);
      newLikedGames.add(game.id);

      const newPreferences = { ...prev.preferences };

      // Learn from this like
      if (game.subcategory) {
        newPreferences.category = game.subcategory as any;
      }

      return {
        ...prev,
        likedGames: newLikedGames,
        preferences: newPreferences
      };
    });

    // Move to next recommendation
    if (currentIndex < recommendations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Generate new recommendations if we've gone through all current ones
      generateRecommendations();
    }
  };

  // Handle user disliking a game
  const handleDislike = (game: App) => {
    // Update preferences
    setUserPreferences(prev => {
      const newDislikedGames = new Set(prev.dislikedGames);
      newDislikedGames.add(game.id);

      return {
        ...prev,
        dislikedGames: newDislikedGames
      };
    });

    // Move to next recommendation
    if (currentIndex < recommendations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Generate new recommendations if we've gone through all current ones
      generateRecommendations();
    }
  };

  // Handle adding to wishlist
  const handleAddToWishlist = (game: App) => {
    if (onAddToWishlist) {
      onAddToWishlist(game);
    }
  };

  // Toggle preference tags
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      const newTags = new Set(prev);
      if (newTags.has(tagId)) {
        newTags.delete(tagId);
      } else {
        newTags.add(tagId);
      }
      return newTags;
    });
  };

  // Reset all preferences
  const handleReset = () => {
    setSelectedTags(new Set());
    setUserPreferences({
      likedGames: new Set(),
      dislikedGames: new Set(),
      preferences: {
        rating: 4.5
      }
    });
    generateRecommendations();
  };

  // Current recommended game
  const currentGame = recommendations[currentIndex];

  return (
    <div className={`bg-dark-700 rounded-xl p-6 shadow-xl ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Game Recommendations</h2>
          <p className="text-gray-300">Games we think you'll enjoy based on your preferences</p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
        >
          <FiRefreshCw className="mr-1" /> Reset
        </button>
      </div>

      {/* Preference Tags */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3">What are you looking for?</h3>
        <div className="flex flex-wrap gap-2">
          {preferenceTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(tag.id)}
              className={`
                flex items-center px-3 py-1.5 rounded-full text-sm transition-colors
                ${selectedTags.has(tag.id)
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-500 text-gray-300 hover:bg-dark-400'}
              `}
            >
              <span className="mr-1">{tag.icon}</span> {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {loading ? (
        <div className="bg-dark-600 rounded-lg p-6 flex flex-col items-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full mb-4" />
          <p className="text-gray-300">Finding the perfect games for you...</p>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="bg-dark-600 rounded-lg p-6 text-center">
          <p className="text-gray-300 mb-4">No games match your current preferences.</p>
          <button
            onClick={handleReset}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset Preferences
          </button>
        </div>
      ) : (
        <div className="bg-dark-600 rounded-lg overflow-hidden">
          <div className="relative aspect-video">
            {currentGame.screenshots && currentGame.screenshots.length > 0 && (
              <img
                src={currentGame.screenshots[0]}
                alt={currentGame.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end">
              <img
                src={currentGame.icon}
                alt={currentGame.name}
                className="w-16 h-16 rounded-xl border-2 border-dark-500 mr-3"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{currentGame.name}</h3>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-400 flex items-center mr-3">
                    <FiStar className="mr-1" /> {currentGame.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-300">
                    {(currentGame.downloads / 1000000).toFixed(1)}M downloads
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-300 mb-4 line-clamp-2">{currentGame.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentGame.modType?.slice(0, 3).map((modType, index) => (
                <span
                  key={`${currentGame.id}-mod-${index}`}
                  className="bg-dark-500 text-primary-300 px-2 py-1 rounded-full text-xs"
                >
                  {modType}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDislike(currentGame)}
                  className="bg-dark-500 hover:bg-dark-400 text-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                >
                  <FiThumbsDown size={20} />
                </button>
                <button
                  onClick={() => handleLike(currentGame)}
                  className="bg-dark-500 hover:bg-dark-400 text-green-400 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                >
                  <FiThumbsUp size={20} />
                </button>
                <button
                  onClick={() => handleAddToWishlist(currentGame)}
                  className="bg-dark-500 hover:bg-dark-400 text-red-400 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                >
                  <FiHeart size={20} />
                </button>
              </div>

              <Link
                to={`/app/${currentGame.id}`}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                View Details <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="px-4 pb-4 text-xs text-gray-500 flex justify-between">
            <span>Game {currentIndex + 1} of {recommendations.length}</span>
            {!loading && (
              <button
                onClick={() => {
                  if (currentIndex < recommendations.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    setCurrentIndex(0);
                  }
                }}
                className="text-primary-400 hover:text-primary-300"
              >
                Skip →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameRecommendationEngine;
