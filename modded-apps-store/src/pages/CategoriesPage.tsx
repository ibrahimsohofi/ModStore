import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { MODDED_APPS } from '../data/apps';
import { FiSearch, FiFilter, FiGrid, FiDownload, FiStar } from 'react-icons/fi';

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CategoriesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [filteredApps, setFilteredApps] = useState(MODDED_APPS);
  const [sortOption, setSortOption] = useState<'popular' | 'rating' | 'newest'>('popular');

  // Get all categories from data
  const allCategories = Array.from(new Set(MODDED_APPS.map(app => app.category)));

  // Filter and sort apps based on category, search query, and sort option
  useEffect(() => {
    let result = [...MODDED_APPS];

    // Filter by category if not "all"
    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'trending') {
      result = result.filter(app => app.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by trending (top downloads) if trending is selected
    if (selectedCategory === 'trending') {
      result = result.sort((a, b) => b.downloads - a.downloads).slice(0, 12);
    }

    // Filter by search query if exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query)
      );
    }

    // Sort results
    if (sortOption === 'popular') {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      // For demo purposes, we'll just use the existing order as "newest"
      // In a real app, you would sort by date added
    }

    setFilteredApps(result);
  }, [selectedCategory, searchQuery, sortOption]);

  // Update selected category when route param changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // Generate page title
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }

    if (selectedCategory === 'all') {
      return 'All Modded Apps';
    }

    if (selectedCategory === 'trending') {
      return 'Trending Apps';
    }

    return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Apps`;
  };

  return (
    <div className="min-h-screen bg-dark-500 pb-20 md:pb-0">
      {/* Category Header */}
      <div className="bg-dark-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            {getPageTitle()}
          </h1>

          {/* Search Bar (Only shown when on search page) */}
          {searchParams.has('q') && (
            <div className="relative max-w-xl mb-6">
              <form action="/search">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for modded apps..."
                  className="w-full bg-dark-400 border border-dark-300 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  defaultValue={searchQuery}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
          )}

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <Link
              to="/categories/all"
              className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-400 text-gray-300 hover:bg-dark-300'
              }`}
            >
              All Apps
            </Link>
            <Link
              to="/categories/trending"
              className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                selectedCategory === 'trending'
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-400 text-gray-300 hover:bg-dark-300'
              }`}
            >
              Trending
            </Link>
            {allCategories.map(cat => (
              <Link
                key={cat}
                to={`/categories/${cat.toLowerCase()}`}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                  selectedCategory === cat.toLowerCase()
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-400 text-gray-300 hover:bg-dark-300'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* App Results */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-300">
              Showing <span className="text-white font-medium">{filteredApps.length}</span> apps
            </div>

            {/* Sort Options */}
            <div className="flex items-center">
              <span className="text-gray-400 mr-2 hidden sm:inline">
                <FiFilter /> Sort by:
              </span>
              <select
                className="bg-dark-600 text-gray-300 border border-dark-400 rounded py-1 px-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* App Grid */}
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <Link
                  key={app.id}
                  to={`/app/${app.id}`}
                  className="bg-dark-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:-translate-y-1 transition-all group border border-dark-400"
                >
                  <div className="p-5">
                    <div className="flex items-start mb-4">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-16 h-16 rounded-xl object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {app.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {app.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-yellow-400">
                        <FiStar className="fill-current mr-1" />
                        <span>{app.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <FiDownload className="mr-1" />
                        <span>{formatNumber(app.downloads)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center mb-4 bg-dark-400 p-4 rounded-full text-gray-300 text-3xl">
                <FiSearch />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                No Apps Found
              </h3>
              <p className="text-gray-400 max-w-lg mx-auto">
                We couldn't find any apps matching your search criteria. Try adjusting your search terms or browse categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
