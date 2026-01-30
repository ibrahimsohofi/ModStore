import type React from 'react';
import { useState, useEffect } from 'react';
import type { App } from '../data/apps';
import { FiClock, FiTag, FiArrowRight, FiStar, FiThumbsUp } from 'react-icons/fi';

interface LatestUpdateNewsProps {
  games: App[];
  className?: string;
  limit?: number;
}

interface NewsItem {
  id: string;
  gameId: string;
  gameName: string;
  gameIcon: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

const LatestUpdateNews: React.FC<LatestUpdateNewsProps> = ({
  games,
  className = '',
  limit = 5
}) => {
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      // Generate news items from available games
      const items = generateNewsItems(games).slice(0, limit);
      setNewsItems(items);
      setLoading(false);
    }, 800);
  }, [games, limit]);

  // Generate random news items based on games
  const generateNewsItems = (games: App[]): NewsItem[] => {
    const items: NewsItem[] = [];

    // Use the games with changelog
    games.filter(game => game.changeLog && game.changeLog.length > 0)
      .forEach(game => {
        // Create news item from the game's changelog
        const changeLogItem = game.changeLog?.[0] || '';

        items.push({
          id: `news-${game.id}-${Date.now()}`,
          gameId: game.id,
          gameName: game.name,
          gameIcon: game.icon,
          title: `${game.name} Update: ${changeLogItem.split(' ').slice(0, 4).join(' ')}...`,
          description: game.changeLog?.join('. ') || '',
          date: game.lastUpdated || new Date().toISOString(),
          tags: game.modType || []
        });
      });

    // Sort by date (newest first)
    return items.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`bg-dark-700 rounded-xl p-6 shadow-xl ${className}`}>
        <h2 className="text-2xl font-bold text-white mb-2">Latest Updates</h2>
        <p className="text-gray-300 mb-6">See what's new in our modded mobile games.</p>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="animate-pulse bg-dark-600 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-dark-500 rounded-lg mr-3" />
                <div className="flex-1">
                  <div className="h-4 bg-dark-500 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-dark-500 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-dark-500 rounded w-full" />
                <div className="h-3 bg-dark-500 rounded w-full" />
                <div className="h-3 bg-dark-500 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className={`bg-dark-700 rounded-xl p-6 shadow-xl ${className}`}>
        <h2 className="text-2xl font-bold text-white mb-2">Latest Updates</h2>
        <p className="text-gray-300 mb-4">No updates available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`bg-dark-700 rounded-xl p-6 shadow-xl ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-2">Latest Updates</h2>
      <p className="text-gray-300 mb-6">See what's new in our modded mobile games.</p>

      <div className="space-y-4">
        {newsItems.map(item => (
          <div key={item.id} className="bg-dark-600 p-4 rounded-lg hover:bg-dark-500 transition-colors">
            <div className="flex items-center mb-3">
              <img src={item.gameIcon} alt={item.gameName} className="w-10 h-10 rounded-lg mr-3" />
              <div>
                <h3 className="text-white font-medium">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <FiClock className="mr-1" />
                  <span>{formatDate(item.date)}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span key={`${item.id}-tag-${index}`} className="bg-dark-500 text-primary-300 text-xs px-2 py-1 rounded-full flex items-center">
                  <FiTag className="mr-1" /> {tag}
                </span>
              ))}
            </div>

            <div className="text-right">
              <a
                href={`/app/${item.gameId}`}
                className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm"
              >
                View Details <FiArrowRight className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUpdateNews;
