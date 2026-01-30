import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiDownload, FiStar, FiTrash2, FiFilter, FiX } from 'react-icons/fi';
import { MODDED_APPS, type App } from '../data/apps';
import { useWishlist } from '../components/WishlistContext';
import VerifiedAppBadge from '../components/VerifiedAppBadge';
import ModTypeBadge from '../components/ModTypeBadge';
import WishlistButton from '../components/WishlistButton';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [wishlistApps, setWishlistApps] = useState<App[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Load apps from wishlist
  useEffect(() => {
    const apps = MODDED_APPS.filter(app => wishlist.includes(app.id));
    setWishlistApps(apps);

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(apps.map(app => app.category)));
    setCategories(uniqueCategories);
  }, [wishlist]);

  // Handle removal from wishlist
  const handleRemove = (appId: string) => {
    removeFromWishlist(appId);
  };

  // Filter apps by category
  const filteredApps = categoryFilter
    ? wishlistApps.filter(app => app.category === categoryFilter)
    : wishlistApps;

  return (
    <div className="container mx-auto px-4 py-12 pb-20 md:pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-2">
          <FiHeart className="text-red-500" />
          <span>My Wishlist</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">{wishlistApps.length} apps</span>

          {wishlistApps.length > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 text-white bg-dark-600 rounded-full px-3 py-1 hover:bg-dark-500 transition-colors"
            >
              <FiFilter size={16} />
              <span className="text-sm">Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && wishlistApps.length > 0 && (
        <div className="mb-6 bg-dark-600 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-medium">Filter by Category</h2>
            <button
              onClick={() => setCategoryFilter(null)}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={!categoryFilter}
              aria-label="Clear filters"
            >
              <FiX size={18} className={categoryFilter ? 'opacity-100' : 'opacity-50'} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(categoryFilter === category ? null : category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  categoryFilter === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                } transition-colors`}
              >
                {category}
                {categoryFilter === category && (
                  <span className="ml-2 bg-primary-400 text-white text-xs px-1.5 rounded-full">
                    {filteredApps.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {wishlistApps.length === 0 ? (
        <div className="text-center py-16 bg-dark-600 rounded-xl">
          <div className="w-20 h-20 rounded-full bg-dark-500 flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-4xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-display font-medium text-white mb-3">Your wishlist is empty</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Add your favorite apps to the wishlist by clicking the heart icon on any app card or details page.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all inline-flex items-center"
          >
            Discover Apps
          </Link>
        </div>
      ) : (
        <>
          {categoryFilter && (
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <h2 className="text-xl text-white">
                  {categoryFilter} Apps
                  <span className="ml-2 text-gray-400">({filteredApps.length})</span>
                </h2>
              </div>
              <button
                onClick={() => setCategoryFilter(null)}
                className="text-primary-400 flex items-center hover:text-primary-300 transition-colors"
              >
                <FiX className="mr-1" /> Clear Filter
              </button>
            </div>
          )}

          {filteredApps.length === 0 ? (
            <div className="text-center py-16 bg-dark-600 rounded-xl">
              <h2 className="text-xl font-display font-medium text-white mb-3">No apps in this category</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                You don't have any apps in the "{categoryFilter}" category in your wishlist.
              </p>
              <button
                onClick={() => setCategoryFilter(null)}
                className="bg-dark-500 text-white font-medium py-2 px-6 rounded-full hover:bg-dark-400 transition-all"
              >
                Show All Apps
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <div
                  key={app.id}
                  className="bg-dark-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:translate-y-[-4px] transition-all group border border-dark-400 relative"
                >
                  <Link to={`/app/${app.id}`} className="block p-6">
                    <div className="flex items-start mb-4">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-16 h-16 rounded-xl object-cover mr-4 shadow-md shadow-dark-900/20"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors mr-2">
                            {app.name}
                          </h3>
                          {app.verified && (
                            <VerifiedAppBadge verified={app.verified} safetyRating={app.safetyRating} />
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{app.category}</p>
                        {app.modType && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {app.modType.slice(0, 2).map(modType => (
                              <ModTypeBadge
                                key={`${app.id}-${modType}`}
                                type={modType}
                                size="sm"
                              />
                            ))}
                          </div>
                        )}
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
                  </Link>
                  <div className="absolute top-4 right-4 flex">
                    <button
                      onClick={() => handleRemove(app.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none bg-dark-500 rounded-full"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistPage;
