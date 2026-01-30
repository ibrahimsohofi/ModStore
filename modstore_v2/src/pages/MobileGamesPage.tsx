import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type App, MODDED_APPS } from '../data/apps';
import { FiDownload, FiStar, FiThumbsUp, FiCalendar, FiArrowRight } from 'react-icons/fi';
import SkeletonLoader from '../components/SkeletonLoader';
import GameMetricsDashboard from '../components/GameMetricsDashboard';
import LatestUpdateNews from '../components/LatestUpdateNews';
import MobileGameVideos from '../components/MobileGameVideos';
import ReviewSubmissionForm from '../components/ReviewSubmissionForm';
import GameRecommendationEngine from '../components/GameRecommendationEngine';

const MobileGamesPage = () => {
  const [mobileGames, setMobileGames] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'action', 'casual', 'rpg'
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Get all apps that are in the Games category
      const games = MODDED_APPS.filter(app => app.category === 'Games');
      setMobileGames(games);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredGames = mobileGames.filter(game => {
    if (filter === 'all') return true;
    return game.subcategory?.toLowerCase() === filter.toLowerCase();
  });

  // Select the first game in the filtered list as the featured/selected app
  useEffect(() => {
    if (!loading && filteredGames.length > 0) {
      setSelectedApp(filteredGames[0]);
    } else {
      setSelectedApp(null);
    }
    // eslint-disable-next-line
  }, [loading, filter, mobileGames]);

  // Handle selecting a specific game
  const handleSelectGame = (game: App) => {
    setSelectedApp(game);
    // Scroll to game details section
    document.getElementById('game-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  const gameCategories = [
    { id: 'all', name: 'All Games' },
    { id: 'action', name: 'Action' },
    { id: 'casual', name: 'Casual' },
    { id: 'rpg', name: 'RPG' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mobile Games <span className="text-primary-500">Collection</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Browse our extensive collection of premium modded mobile games. Get unlimited resources, all characters unlocked, and enhanced gameplay features without any restrictions.
          </p>
        </div>

        {/* Featured Game of the Week */}
        <div className="mb-12 relative overflow-hidden bg-gradient-to-r from-dark-800 to-dark-700 rounded-2xl">
          {loading ? (
            <div className="p-8 flex flex-col items-center">
              <SkeletonLoader height={300} width="100%" />
            </div>
          ) : (
            <div className="relative">
              {/* Background image with overlay */}
              {mobileGames.length > 0 && mobileGames[0].screenshots && (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={mobileGames[0].screenshots[0]}
                    alt="Featured game"
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/80" />
                </div>
              )}

              {/* Content */}
              {mobileGames.length > 0 && (
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <span className="bg-primary-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Featured Game</span>
                      {mobileGames[0].verified && (
                        <span className="ml-3 flex items-center bg-green-900/40 text-green-400 text-xs px-2 py-1 rounded-full">
                          <FiThumbsUp className="mr-1" /> Verified Mod
                        </span>
                      )}
                    </div>

                    <div className="flex items-center">
                      <img src={mobileGames[0].icon} alt={mobileGames[0].name} className="w-16 h-16 rounded-xl border-2 border-primary-500 shadow-lg mr-4" />
                      <div>
                        <h2 className="text-3xl font-bold text-white">{mobileGames[0].name}</h2>
                        <p className="text-primary-300 flex items-center">
                          <span className="mr-2">{mobileGames[0].rating.toFixed(1)}</span>
                          <FiStar className="text-yellow-400" />
                          <span className="mx-2 text-gray-400">|</span>
                          <span>{(mobileGames[0].downloads / 1000000).toFixed(1)}M downloads</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300">{mobileGames[0].longDescription && typeof mobileGames[0].longDescription === 'string'
                      ? mobileGames[0].longDescription.substring(0, 200) + '...'
                      : (mobileGames[0].description || '')}</p>

                    <div className="flex flex-wrap gap-2">
                      {mobileGames[0].modType?.map((type, index) => (
                        <span key={`featured-mod-${index}`} className="bg-dark-400 text-primary-300 px-3 py-1 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Link
                        to={`/app/${mobileGames[0].id}`}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full flex items-center transition-colors"
                      >
                        <FiDownload className="mr-2" /> Download Now
                      </Link>
                      <button className="bg-dark-400 hover:bg-dark-300 text-white px-6 py-2 rounded-full flex items-center transition-colors">
                        <FiStar className="mr-2" /> Add to Wishlist
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center items-center">
                    {mobileGames[0].screenshots && mobileGames[0].screenshots.length > 1 && (
                      <div className="relative w-[250px] h-[500px] rotate-3 transform shadow-xl rounded-xl overflow-hidden border-4 border-dark-500">
                        <img
                          src={mobileGames[0].screenshots[1]}
                          alt={mobileGames[0].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {gameCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-400 text-gray-300 hover:bg-dark-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Game Metrics Dashboard */}
        {!loading && filteredGames.length > 0 && (
          <GameMetricsDashboard
            games={filteredGames}
            className="mb-12"
          />
        )}

        {/* Games Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-dark-600 rounded-lg overflow-hidden">
                <SkeletonLoader height={200} />
                <div className="p-4 space-y-3">
                  <SkeletonLoader height={24} width="70%" />
                  <SkeletonLoader height={16} width="90%" />
                  <SkeletonLoader height={16} width="50%" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-400">No games found for this category.</h3>
                <p className="text-gray-500 mt-2">Try selecting a different category or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                  <div
                    key={game.id}
                    className="bg-dark-600 rounded-lg overflow-hidden hover:shadow-xl transition-all hover:translate-y-[-5px] hover:bg-dark-500 cursor-pointer"
                    onClick={() => handleSelectGame(game)}
                  >
                    <div className="relative aspect-video bg-dark-700">
                      {game.screenshots && game.screenshots.length > 0 && (
                        <img
                          src={game.screenshots[0]}
                          alt={game.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark-900/80" />

                      {/* Game Icon */}
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-12 h-12 bg-dark-800 rounded-lg overflow-hidden border-2 border-dark-600 shadow-lg">
                          <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Verification Badge */}
                      {game.verified && (
                        <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                          <FiThumbsUp className="mr-1" /> Verified
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-white font-semibold text-lg">{game.name}</h3>
                        <Link
                          to={`/app/${game.id}`}
                          className="text-xs bg-primary-500 hover:bg-primary-600 text-white px-2 py-1 rounded-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View
                        </Link>
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{game.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {game.modType?.slice(0, 3).map((type, index) => (
                          <span key={index} className="text-xs bg-dark-500 text-primary-300 px-2 py-1 rounded">
                            {type}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <FiDownload className="mr-1" />
                          <span>{(game.downloads / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex items-center">
                          <FiStar className="mr-1 text-yellow-400" />
                          <span>{game.rating.toFixed(1)}</span>
                        </div>
                        {game.lastUpdated && (
                          <div className="flex items-center">
                            <FiCalendar className="mr-1" />
                            <span>{new Date(game.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Latest Update News */}
        {!loading && filteredGames.length > 0 && (
          <LatestUpdateNews
            games={filteredGames}
            className="mt-12"
            limit={3}
          />
        )}

        {/* Game Recommendations */}
        {!loading && filteredGames.length > 0 && (
          <GameRecommendationEngine
            allGames={filteredGames}
            className="mt-12"
            onAddToWishlist={(game) => {
              console.log('Added to wishlist:', game.name);
              // In a real app, this would add the game to the user's wishlist
            }}
          />
        )}

        {/* Special Features Section */}
        <div className="mt-16 bg-dark-700 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Special Features</h2>
          <p className="text-gray-300 mb-6">
            Our modded mobile games come with premium features that enhance your gaming experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-600 p-5 rounded-lg">
              <div className="text-primary-500 text-xl mb-3">🔓 Unlimited Resources</div>
              <p className="text-gray-300">
                All our games come with unlimited in-game currencies, gems, coins, and premium items. Play without restrictions!
              </p>
            </div>

            <div className="bg-dark-600 p-5 rounded-lg">
              <div className="text-primary-500 text-xl mb-3">👤 All Characters Unlocked</div>
              <p className="text-gray-300">
                Access every character, skin, weapon, and customization option without spending real money.
              </p>
            </div>

            <div className="bg-dark-600 p-5 rounded-lg">
              <div className="text-primary-500 text-xl mb-3">🛡️ Anti-Ban Protection</div>
              <p className="text-gray-300">
                Our mods include advanced protection features to keep your account safe from being banned.
              </p>
            </div>
          </div>
        </div>

        {/* Tutorials and Guides Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Game Tutorials & Cheat Codes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGames.slice(0, 4).map(game => (
              <div key={`tutorial-${game.id}`} className="bg-dark-600 rounded-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 w-full h-[160px] md:h-auto relative">
                  {game.screenshots && game.screenshots.length > 0 && (
                    <img
                      src={game.screenshots[0]}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4 md:w-2/3">
                  <h3 className="text-white font-semibold mb-2">{game.name} - Advanced Guide</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Learn how to maximize your gameplay experience with our pro tips and cheat codes.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="bg-primary-900 text-primary-300 px-2 py-1 rounded-full text-xs mr-2">Cheat Code</span>
                      <span className="text-gray-300">Unlimited Health: Triple-tap the settings icon</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="bg-primary-900 text-primary-300 px-2 py-1 rounded-full text-xs mr-2">Pro Tip</span>
                      <span className="text-gray-300">Enable Developer Mode for hidden content</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-full transition-colors">
              View All Tutorials
            </button>
          </div>
        </div>

        {/* Gameplay Videos Section */}
        {selectedApp && !loading && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Latest Gameplay Videos</h2>
              <Link to="/gameplay-videos" className="text-primary-400 hover:text-primary-300 flex items-center">
                <span>View All</span>
                <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <MobileGameVideos
              gameId={selectedApp.id}
              gameName={selectedApp.name}
              compact={true}
            />
          </div>
        )}

        {/* Selected Game Details Section */}
        <div id="game-details" className="mt-16">
          {selectedApp && (
            <div className="bg-dark-700 rounded-xl p-6 shadow-xl mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img src={selectedApp.icon} alt={selectedApp.name} className="w-14 h-14 rounded-xl border-2 border-primary-500 shadow-lg mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      {selectedApp.name}
                      {selectedApp.verified && (
                        <span className="ml-2 bg-green-900/40 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiThumbsUp className="mr-1" /> Verified
                        </span>
                      )}
                    </h2>
                    <p className="text-primary-300 flex items-center">
                      <span className="mr-2">{selectedApp.rating.toFixed(1)}</span>
                      <FiStar className="text-yellow-400" />
                      <span className="mx-2 text-gray-400">|</span>
                      <span>{(selectedApp.downloads / 1000000).toFixed(1)}M downloads</span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/app/${selectedApp.id}`}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full flex items-center transition-colors"
                >
                  <FiDownload className="mr-2" /> Download Now
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Game Description & Features */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300">
                      {selectedApp.longDescription && typeof selectedApp.longDescription === 'string'
                        ? selectedApp.longDescription
                        : selectedApp.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Mod Features</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedApp.modType?.map((type, index) => (
                        <span key={`mod-type-${index}`} className="bg-dark-500 text-primary-300 px-3 py-1 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedApp.changeLog && selectedApp.changeLog.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">What's New</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        {selectedApp.changeLog.map((log, index) => (
                          <li key={`changelog-${index}`}>{log}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Game Screenshots */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Screenshots</h3>
                  <div className="space-y-2">
                    {selectedApp.screenshots?.slice(0, 3).map((screenshot, index) => (
                      <div key={`screenshot-${index}`} className="rounded-lg overflow-hidden">
                        <img src={screenshot} alt={`${selectedApp.name} screenshot ${index + 1}`} className="w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gameplay Videos Section */}
          {selectedApp && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Gameplay Videos</h2>
              <MobileGameVideos
                gameId={selectedApp.id}
                gameName={selectedApp.name}
                maxVideos={3}
                compact={false}
              />
            </div>
          )}

          {/* Game Metrics Dashboard */}
          {!loading && filteredGames.length > 0 && (
            <GameMetricsDashboard
              games={filteredGames}
              className="mb-12"
            />
          )}

          {/* Latest Updates News */}
          {!loading && filteredGames.length > 0 && (
            <LatestUpdateNews
              games={filteredGames}
              className="mt-12 mb-12"
              limit={3}
            />
          )}
        </div>

        {/* Community Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Community Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {(selectedApp ? [selectedApp] : filteredGames.slice(0, 4)).map(game => (
              <div key={`review-${game.id}`} className="bg-dark-600 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {game.reviews && game.reviews.length > 0 && game.reviews[0].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{game.reviews && game.reviews.length > 0 && game.reviews[0].name}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            game.reviews && game.reviews.length > 0 && i < game.reviews[0].rating
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                          size={14}
                        />
                      ))}
                      <span className="text-gray-400 text-xs ml-2">
                        {game.reviews && game.reviews.length > 0
                          ? new Date(game.reviews[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm italic">"{game.reviews && game.reviews.length > 0 && game.reviews[0].comment}"</p>

                <div className="mt-3 pt-3 border-t border-dark-500 flex justify-between items-center">
                  <div className="flex items-center text-primary-400 text-sm">
                    <span className="font-semibold mr-2">{game.name}</span>
                    <img src={game.icon} alt={game.name} className="w-6 h-6 rounded" />
                  </div>
                  <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                    View All Reviews
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Review Submission Form */}
          {selectedApp && (
            <ReviewSubmissionForm
              gameId={selectedApp.id}
              gameName={selectedApp.name}
              onSubmit={(review) => {
                console.log('Review submitted:', review);
                // In a real app, this would send the review to a server
              }}
            />
          )}
        </div>

        {/* Game Comparison Chart */}
        <div className="mt-16 bg-dark-700 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Game Comparison Chart</h2>
          <p className="text-gray-300 mb-6">
            Compare our most popular modded mobile games to find the perfect one for you.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] bg-dark-600 rounded-lg">
              <thead>
                <tr className="border-b border-dark-500">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Game</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Features</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Updates</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredGames.slice(0, 5).map(game => (
                  <tr key={`compare-${game.id}`} className="border-b border-dark-500 hover:bg-dark-500 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img src={game.icon} alt={game.name} className="w-8 h-8 rounded mr-2" />
                        <span className="text-white font-medium">{game.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {game.subcategory || "Game"}
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{game.size}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400 font-semibold mr-1">{game.rating.toFixed(1)}</span>
                        <FiStar className="text-yellow-400" size={14} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {game.modType?.slice(0, 2).map((type, i) => (
                          <span key={`${game.id}-feature-${i}`} className="text-xs bg-primary-900 text-primary-300 px-2 py-0.5 rounded">
                            {type}
                          </span>
                        ))}
                        {game.modType && game.modType.length > 2 && (
                          <span className="text-xs bg-dark-400 text-gray-300 px-2 py-0.5 rounded">
                            +{game.modType.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {game.lastUpdated ? new Date(game.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/app/${game.id}`}
                        className="inline-block bg-primary-500 hover:bg-primary-600 text-white text-xs px-3 py-1 rounded-full transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-dark-500 hover:bg-dark-400 text-white text-sm px-6 py-2 rounded-full transition-colors">
              View Full Comparison
            </button>
          </div>
        </div>

        {/* Cheat Codes & Mod Tips Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Cheat Codes & Mod Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-600 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Universal Mod Activation</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                  <span>Install the modded APK file</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                  <span>Open the app and close it immediately</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
                  <span>Reopen the app and play in airplane mode first time</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs mr-2">4</span>
                  <span>Enjoy all premium features unlocked!</span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-600 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Popular Game Cheat Codes</h3>
              <ul className="space-y-2">
                {filteredGames.slice(0, 3).map((game, index) => (
                  <li key={`cheat-${game.id}`} className="pb-2 border-b border-dark-500 last:border-0">
                    <div className="flex items-center mb-1">
                      <img src={game.icon} alt={game.name} className="w-5 h-5 mr-2 rounded" />
                      <span className="text-white text-sm font-medium">{game.name}</span>
                    </div>
                    <p className="text-gray-400 text-xs pl-7">{`Triple tap settings → Enter "mod${index+1}" → Unlock all items`}</p>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-3 text-primary-400 text-sm hover:text-primary-300 transition-colors">
                View All Cheat Codes →
              </button>
            </div>

            <div className="bg-dark-600 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Anti-Ban Protection</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 h-2 bg-dark-500 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-primary-500 w-[85%]" />
                </div>
                <span className="text-white font-semibold ml-3">85%</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Our mods include advanced protection measures to prevent account bans. For maximum security, follow these tips:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>Don't use modded accounts in competitive modes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>Avoid excessive resource collection in short periods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>Use private servers when available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileGamesPage;
