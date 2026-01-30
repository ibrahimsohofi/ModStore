import type React from 'react';
import { useState, useEffect } from 'react';
import { FiBarChart2, FiDownload, FiStar, FiUsers, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import type { App } from '../data/apps';

interface GameMetricsDashboardProps {
  games: App[];
  className?: string;
}

const GameMetricsDashboard: React.FC<GameMetricsDashboardProps> = ({ games, className = '' }) => {
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'date'>('downloads');
  const [activeTab, setActiveTab] = useState<'popularity' | 'trending'>('popularity');
  const [isLoading, setIsLoading] = useState(true);

  // Calculate total statistics
  const totalDownloads = games.reduce((total, game) => total + game.downloads, 0);
  const averageRating = games.length > 0
    ? (games.reduce((total, game) => total + game.rating, 0) / games.length).toFixed(1)
    : '0.0';

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Get sorted games for the charts
  const getSortedGames = () => {
    const sortedGames = [...games];

    switch (sortBy) {
      case 'downloads':
        return sortedGames.sort((a, b) => b.downloads - a.downloads);
      case 'rating':
        return sortedGames.sort((a, b) => b.rating - a.rating);
      case 'date':
        return sortedGames.sort((a, b) => {
          if (!a.lastUpdated || !b.lastUpdated) return 0;
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        });
      default:
        return sortedGames;
    }
  };

  // Generate random trend data
  const getTrendingData = (game: App) => {
    // Just for demo purposes - generate random trending percentage between -15% and +40%
    const trendPercentage = Math.floor(Math.random() * 55) - 15;
    const rising = trendPercentage > 0;

    return {
      trend: trendPercentage,
      rising
    };
  };

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [sortBy, activeTab]);

  const sortedGames = getSortedGames().slice(0, 5); // Top 5 games

  return (
    <div className={`bg-dark-700 rounded-xl p-6 shadow-xl ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Game Metrics Dashboard</h2>
          <p className="text-gray-300">Track the performance and popularity of our modded mobile games.</p>
        </div>

        <div className="flex mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab('popularity')}
            className={`px-4 py-2 rounded-l-md ${
              activeTab === 'popularity'
              ? 'bg-primary-500 text-white'
              : 'bg-dark-600 text-gray-300 hover:bg-dark-500'
            }`}
          >
            <span className="flex items-center">
              <FiBarChart2 className="mr-2" /> Popularity
            </span>
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-r-md ${
              activeTab === 'trending'
              ? 'bg-primary-500 text-white'
              : 'bg-dark-600 text-gray-300 hover:bg-dark-500'
            }`}
          >
            <span className="flex items-center">
              <FiTrendingUp className="mr-2" /> Trending
            </span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-600 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-900/50 rounded-full flex items-center justify-center mr-4">
              <FiDownload className="text-primary-400 text-xl" />
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Total Downloads</h3>
              <p className="text-white text-xl font-bold">{formatNumber(totalDownloads)}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-600 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
              <FiStar className="text-yellow-400 text-xl" />
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Average Rating</h3>
              <p className="text-white text-xl font-bold">{averageRating} / 5.0</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-600 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mr-4">
              <FiUsers className="text-green-400 text-xl" />
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Active Games</h3>
              <p className="text-white text-xl font-bold">{games.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-dark-600 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">
            {activeTab === 'popularity' ? 'Top Mobile Games' : 'Trending This Week'}
          </h3>

          {activeTab === 'popularity' && (
            <div className="flex text-sm">
              <button
                onClick={() => setSortBy('downloads')}
                className={`px-3 py-1 rounded-l-md ${
                  sortBy === 'downloads'
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                Downloads
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1 ${
                  sortBy === 'rating'
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                Rating
              </button>
              <button
                onClick={() => setSortBy('date')}
                className={`px-3 py-1 rounded-r-md ${
                  sortBy === 'date'
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                Recent
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`pulse-${i}`} className="flex items-center">
                <div className="w-8 h-8 bg-dark-500 rounded mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-dark-500 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-dark-500 rounded w-full"></div>
                </div>
                <div className="w-16 h-6 bg-dark-500 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedGames.map((game, index) => {
              const trendData = getTrendingData(game);

              return (
                <div key={game.id} className="flex items-center bg-dark-700 p-3 rounded-lg hover:bg-dark-500 transition-colors">
                  <div className="flex items-center flex-1">
                    <span className="w-6 text-gray-500 font-medium text-center">{index + 1}</span>
                    <img src={game.icon} alt={game.name} className="w-10 h-10 rounded-lg mx-3" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{game.name}</h4>
                      <p className="text-gray-400 text-xs">{game.developer}</p>
                    </div>
                  </div>

                  {activeTab === 'popularity' ? (
                    <div className="text-right">
                      {sortBy === 'downloads' && (
                        <div className="flex items-center text-gray-300">
                          <FiDownload className="mr-1" />
                          <span>{formatNumber(game.downloads)}</span>
                        </div>
                      )}

                      {sortBy === 'rating' && (
                        <div className="flex items-center text-yellow-400">
                          <FiStar className="mr-1" />
                          <span>{game.rating.toFixed(1)}</span>
                        </div>
                      )}

                      {sortBy === 'date' && game.lastUpdated && (
                        <div className="flex items-center text-gray-300">
                          <FiCalendar className="mr-1" />
                          <span>{new Date(game.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`
                      flex items-center
                      ${trendData.rising ? 'text-green-400' : 'text-red-400'}`
                    }>
                      <span className="text-lg font-bold">{trendData.rising ? '+' : ''}{trendData.trend}%</span>
                      <FiTrendingUp className={`ml-1 ${!trendData.rising && 'transform rotate-180'}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="text-center text-gray-400 text-sm">
        <p>Data updated every 24 hours. Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
};

export default GameMetricsDashboard;
