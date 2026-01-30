import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Star,
  Search,
  Grid,
  List,
  SlidersHorizontal,
  ChevronDown,
  Filter,
  X,
  ArrowUpDown
} from 'lucide-react';
import { GAME_RESOURCES } from '@/data/gameData';
import type { GameResource } from '@/types/games';
import { useUserPreferences } from '@/context/UserPreferencesContext';

// Featured Game Card Component
function FeaturedGameCard({ game }: { game: GameResource }) {
  const isUnlocked = typeof window !== "undefined" && localStorage.getItem(`unlocked_${game.id}`) === 'true';
  const { isFavorite, addToFavorites, removeFromFavorites } = useUserPreferences();

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game.id);
    }
  };

  return (
    <Card className="overflow-hidden border-[#00f7ff]/40 bg-gradient-to-br from-[#00f7ff]/10 to-card/80 backdrop-blur-md shadow-lg group transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {game.featured && (
            <Badge className="bg-[#00f7ff] text-primary-foreground">Featured</Badge>
          )}
          {game.new && (
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">New</Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label={isFavorite(game.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite(game.id)
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center">
          <Badge variant="outline" className="bg-black/50 text-white border-none text-xs">
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold group-hover:text-[#00f7ff] transition-colors line-clamp-1">{game.title}</h3>
        <p className="text-muted-foreground text-base mb-4 line-clamp-2">{game.description}</p>
        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground mt-auto">
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{game.rating}/5</span>
          </div>
          <span className="text-xs">By {game.developer}</span>
        </div>
        <Link to={`/games/${game.id}`} className="w-full">
          <Button className={`w-full ${isUnlocked ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'}`}>
            {isUnlocked ? 'Play Now' : 'View Game'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Game Card Component for Grid View
function GameCard({ game }: { game: GameResource }) {
  const isUnlocked = typeof window !== "undefined" && localStorage.getItem(`unlocked_${game.id}`) === 'true';
  const { isFavorite, addToFavorites, removeFromFavorites } = useUserPreferences();

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game.id);
    }
  };

  return (
    <Card className="overflow-hidden border-[#00f7ff]/20 bg-card/70 backdrop-blur-sm card-hover group transition-all duration-300 h-full flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {game.featured && (
          <Badge className="absolute top-2 left-2 bg-[#00f7ff] text-primary-foreground">
            Featured
          </Badge>
        )}
        {game.new && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white">
            New
          </Badge>
        )}

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label={isFavorite(game.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite(game.id)
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-2 left-2 flex items-center">
          <Badge variant="outline" className="bg-black/50 text-white border-none text-xs">
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold group-hover:text-[#00f7ff] transition-colors line-clamp-1">{game.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{game.description}</p>

        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground mt-auto">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{game.rating}/5</span>
          </div>
          <span className="text-xs">By {game.developer}</span>
        </div>

        <Link to={`/games/${game.id}`} className="w-full">
          <Button className={`w-full ${isUnlocked ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'}`}>
            {isUnlocked ? 'Play Now' : 'View Game'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Game List Item Component for List View
function GameListItem({ game }: { game: GameResource }) {
  const isUnlocked = typeof window !== "undefined" && localStorage.getItem(`unlocked_${game.id}`) === 'true';
  const { isFavorite, addToFavorites, removeFromFavorites } = useUserPreferences();

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game.id);
    }
  };

  return (
    <Card className="border-[#00f7ff]/20 bg-card/70 backdrop-blur-sm hover:bg-card/90 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative h-24 md:w-32 overflow-hidden rounded-md flex-shrink-0">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            {game.featured && (
              <Badge className="absolute top-1 left-1 bg-[#00f7ff] text-primary-foreground text-xs">
                Featured
              </Badge>
            )}
            {game.new && (
              <Badge className="absolute top-1 left-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs">
                New
              </Badge>
            )}

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-1 right-1 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label={isFavorite(game.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-3 w-3 ${
                  isFavorite(game.id)
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                }`}
              />
            </button>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h3 className="text-lg font-bold">{game.title}</h3>
              <div className="flex items-center md:ml-auto">
                <Badge variant="outline" className="text-xs border-[#00f7ff]/20 mr-2">
                  {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                </Badge>
                <div className="flex items-center text-yellow-400">
                  <Star className="fill-yellow-400 h-3 w-3 mr-1" />
                  <span className="text-xs">{game.rating}/5</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{game.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-xs text-muted-foreground">
                <span className="inline-block mr-3">By {game.developer}</span>
                <span className="inline-block">{game.platforms.slice(0, 3).join(", ")}{game.platforms.length > 3 ? "..." : ""}</span>
              </div>

              <div className="flex gap-2 sm:ml-auto">
                <Link to={`/games/${game.id}`} className="flex-1 sm:flex-none">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
                  >
                    Details
                  </Button>
                </Link>
                <Link to={`/games/${game.id}`} className="flex-1 sm:flex-none">
                  <Button
                    size="sm"
                    className={`w-full sm:w-auto ${isUnlocked ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'}`}
                  >
                    {isUnlocked ? 'Play' : 'Download'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main component export
export function GameCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<'rating' | 'name' | 'newest'>('rating');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { favoriteGames, recentlyViewed } = useUserPreferences();

  // Get all unique categories
  const categories = ['all', ...Array.from(new Set(GAME_RESOURCES.map(game => game.category)))];

  // Get all unique platforms
  const platforms = ['all', ...Array.from(new Set(GAME_RESOURCES.flatMap(game => game.platforms)))];

  // Filter games based on all criteria
  const filteredGames = GAME_RESOURCES.filter(game => {
    // Search query filter
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;

    // Rating filter
    const matchesRating = !selectedRating || game.rating >= selectedRating;

    // Platform filter
    const matchesPlatform = selectedPlatform === 'all' || game.platforms.includes(selectedPlatform);

    // Featured filter
    const matchesFeatured = !showFeaturedOnly || game.featured;

    // New filter
    const matchesNew = !showNewOnly || game.new;

    return matchesSearch && matchesCategory && matchesRating && matchesPlatform && matchesFeatured && matchesNew;
  });

  // Sort games
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortOrder) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'newest':
        return b.publishYear - a.publishYear;
      default:
        return b.rating - a.rating;
    }
  });

  // Featured games (for carousel)
  const featuredGames = GAME_RESOURCES.filter(game => game.featured).slice(0, 3);

  // New releases
  const newReleases = GAME_RESOURCES.filter(game => game.new).slice(0, 4);

  // Favorite games
  const favGames = GAME_RESOURCES.filter(game => favoriteGames.includes(game.id));

  // Recently viewed games
  const recentGames = recentlyViewed
    .map(id => GAME_RESOURCES.find(game => game.id === id))
    .filter((game): game is GameResource => !!game)
    .slice(0, 4);

  // Popular genres with counts
  const genreCounts = GAME_RESOURCES.reduce((acc, game) => {
    acc[game.category] = (acc[game.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, count]) => ({ category, count }));

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRating(null);
    setSelectedPlatform('all');
    setShowFeaturedOnly(false);
    setShowNewOnly(false);
    setSortOrder('rating');
  };

  // Count active filters
  const activeFilterCount = (
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    (selectedPlatform !== 'all' ? 1 : 0) +
    (showFeaturedOnly ? 1 : 0) +
    (showNewOnly ? 1 : 0) +
    (searchQuery ? 1 : 0)
  );

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Game Categories</h1>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setFiltersOpen(!filtersOpen)}
          variant="outline"
          className="w-full flex items-center justify-between border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? 'transform rotate-180' : ''}`} />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar - visible on desktop or when expanded on mobile */}
        <div className={`lg:w-1/4 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-card/70 backdrop-blur-sm rounded-lg border border-[#00f7ff]/20 p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-[#00f7ff]" />
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs h-8 hover:bg-[#00f7ff]/10"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-md border border-[#00f7ff]/30 bg-background/50 pl-9 h-10 focus:border-[#00f7ff] focus:ring-1 focus:ring-[#00f7ff] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Category filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#00f7ff]/20 text-[#00f7ff]'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
              <div className="flex gap-1">
                {[null, 5, 4, 3].map((rating) => (
                  <button
                    key={rating === null ? 'all' : rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`flex-1 px-2 py-1.5 rounded-md text-sm transition-colors ${
                      selectedRating === rating
                        ? 'bg-[#00f7ff]/20 text-[#00f7ff]'
                        : 'hover:bg-muted border border-muted'
                    }`}
                  >
                    {rating === null ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Platform</h3>
              <div className="space-y-1">
                {platforms.slice(0, 7).map(platform => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                      selectedPlatform === platform
                        ? 'bg-[#00f7ff]/20 text-[#00f7ff]'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {platform === 'all' ? 'All Platforms' : platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Special filters */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Special</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={`flex-1 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    showFeaturedOnly
                      ? 'bg-[#00f7ff]/20 text-[#00f7ff]'
                      : 'hover:bg-muted border border-muted'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setShowNewOnly(!showNewOnly)}
                  className={`flex-1 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    showNewOnly
                      ? 'bg-[#00f7ff]/20 text-[#00f7ff]'
                      : 'hover:bg-muted border border-muted'
                  }`}
                >
                  New
                </button>
              </div>
            </div>

            {/* Sort options */}
            <div>
              <h3 className="text-sm font-medium mb-2">Sort By</h3>
              <div className="flex flex-col gap-1">
                {[
                  { value: 'rating', label: 'Highest Rated' },
                  { value: 'newest', label: 'Newest First' },
                  { value: 'name', label: 'Alphabetical' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortOrder(option.value as 'rating' | 'name' | 'newest')}
                    className={`text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                      sortOrder === option.value
                        ? 'bg-[#00f7ff]/20 text-[#00f7ff]'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Featured games carousel */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Featured Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredGames.map(game => (
                <FeaturedGameCard key={game.id} game={game} />
              ))}
            </div>
          </div>

          {/* Special sections row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* New releases */}
            <div className="bg-card/70 backdrop-blur-sm rounded-lg border border-[#00f7ff]/20 p-4">
              <h2 className="text-lg font-bold mb-3 flex items-center">
                <Badge className="mr-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white">New</Badge>
                New Releases
              </h2>
              <div className="space-y-3">
                {newReleases.length > 0 ? (
                  newReleases.map(game => (
                    <Link to={`/games/${game.id}`} key={game.id} className="block">
                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-card/90 transition-colors">
                        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                          <img src={game.image} alt={game.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-sm truncate">{game.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                            {game.rating}/5
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-3">No new games available</p>
                )}
              </div>
            </div>

            {/* Favorites or Recently viewed */}
            <div className="bg-card/70 backdrop-blur-sm rounded-lg border border-[#00f7ff]/20 p-4">
              <h2 className="text-lg font-bold mb-3 flex items-center">
                {favGames.length > 0 ? (
                  <>
                    <Heart className="h-4 w-4 mr-2 fill-red-500 text-red-500" />
                    Your Favorites
                  </>
                ) : (
                  <>
                    <Badge className="mr-2 bg-[#00f7ff] text-primary-foreground">History</Badge>
                    Recently Viewed
                  </>
                )}
              </h2>
              <div className="space-y-3">
                {favGames.length > 0 ? (
                  favGames.slice(0, 4).map(game => (
                    <Link to={`/games/${game.id}`} key={game.id} className="block">
                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-card/90 transition-colors">
                        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                          <img src={game.image} alt={game.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-sm truncate">{game.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                            {game.rating}/5
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : recentGames.length > 0 ? (
                  recentGames.map(game => (
                    <Link to={`/games/${game.id}`} key={game.id} className="block">
                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-card/90 transition-colors">
                        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                          <img src={game.image} alt={game.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-sm truncate">{game.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                            {game.rating}/5
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-3">No favorites or recent games</p>
                )}
              </div>
            </div>
          </div>

          {/* Popular genres quick access */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3">Popular Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {popularGenres.map(({ category, count }) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 rounded-lg text-center border transition-all hover:border-[#00f7ff]/50 hover:bg-[#00f7ff]/10 ${
                    selectedCategory === category
                      ? 'border-[#00f7ff] bg-[#00f7ff]/20'
                      : 'border-[#00f7ff]/20 bg-card/50'
                  }`}
                >
                  <p className="font-medium text-sm capitalize mb-1">{category}</p>
                  <p className="text-xs text-muted-foreground">{count} Games</p>
                </button>
              ))}
            </div>
          </div>

          {/* Game stats */}
          <div className="mb-8">
            <div className="bg-card/70 backdrop-blur-sm rounded-lg border border-[#00f7ff]/20 p-4">
              <div className="grid grid-cols-3 divide-x divide-[#00f7ff]/20">
                <div className="text-center px-4">
                  <p className="text-2xl font-bold text-[#00f7ff]">{GAME_RESOURCES.length}</p>
                  <p className="text-xs text-muted-foreground">Total Games</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-2xl font-bold text-[#00f7ff]">
                    {GAME_RESOURCES.reduce((total, game) => total + game.unlocks, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Downloads</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-2xl font-bold text-[#00f7ff]">{categories.length - 1}</p>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game results */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h2 className="text-xl font-bold flex items-center">
                Game Library
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 bg-[#00f7ff]/20 text-[#00f7ff] hover:bg-[#00f7ff]/30">
                    {sortedGames.length} results
                  </Badge>
                )}
              </h2>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-[#00f7ff]/30 ${viewMode === 'grid' ? 'bg-[#00f7ff]/20 text-[#00f7ff]' : 'hover:bg-[#00f7ff]/10'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-[#00f7ff]/30 ${viewMode === 'list' ? 'bg-[#00f7ff]/20 text-[#00f7ff]' : 'hover:bg-[#00f7ff]/10'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>

                <div className="ml-2 text-sm text-muted-foreground hidden sm:flex items-center">
                  <ArrowUpDown className="h-3 w-3 mr-1" />
                  <span>
                    Sort:
                    <select
                      className="ml-1 bg-transparent border-none outline-none cursor-pointer p-0 text-foreground"
                      value={sortOrder}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as 'rating' | 'name' | 'newest')}
                    >
                      <option value="rating">Rating</option>
                      <option value="newest">Newest</option>
                      <option value="name">A-Z</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>

            {/* Game grid or list */}
            {sortedGames.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedGames.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedGames.map(game => (
                    <GameListItem key={game.id} game={game} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 border border-dashed border-[#00f7ff]/20 rounded-lg">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
                <h3 className="text-xl font-semibold mb-2">No Games Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query.
                </p>
                <Button variant="outline" onClick={resetFilters} className="border-[#00f7ff]/30 hover:bg-[#00f7ff]/10">
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
