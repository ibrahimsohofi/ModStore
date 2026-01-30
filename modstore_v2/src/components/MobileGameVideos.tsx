import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type VideoItem, getGameVideos } from '../utils/videoHelpers';
import { FiVideo, FiPlay, FiClock } from 'react-icons/fi';
import SkeletonLoader from './SkeletonLoader';

interface MobileGameVideosProps {
  gameId: string;
  gameName: string;
  compact?: boolean;
  maxVideos?: number;
  className?: string;
}

const MobileGameVideos = ({
  gameId,
  gameName,
  compact = false,
  maxVideos = 3,
  className = ''
}: MobileGameVideosProps) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch the videos
    const gameVideos = getGameVideos(gameId, gameName);

    // Set the videos with a small delay to simulate loading
    setTimeout(() => {
      setVideos(gameVideos.slice(0, maxVideos));
      setLoading(false);
    }, 500);
  }, [gameId, gameName, maxVideos]);

  if (loading) {
    return (
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 ${className}`}>
        {Array.from({ length: maxVideos }).map((_, i) => (
          <div key={`skeleton-${gameId}-${i}`} className="animate-pulse">
            <div className="aspect-video bg-dark-700 rounded-lg mb-2" />
            <div className="h-4 bg-dark-700 rounded w-3/4 mb-1" />
            <div className="h-3 bg-dark-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={`p-6 text-center bg-dark-700 rounded-lg ${className}`}>
        <FiVideo className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-300">No gameplay videos available for {gameName} yet.</p>
        <Link to="/gameplay-videos" className="mt-3 text-primary-400 hover:text-primary-300 inline-block">
          Check other gameplay videos
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
        {videos.map(video => (
          <Link
            key={video.id}
            to={`/gameplay-videos/${gameId}?video=${video.id}`}
            className="group block"
          >
            <div className="aspect-video bg-dark-700 rounded-lg overflow-hidden relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-dark-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-primary-500 bg-opacity-90 rounded-full flex items-center justify-center">
                  <FiPlay className="h-6 w-6 text-white" />
                </div>
              </div>
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-dark-900 bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                  <FiClock className="mr-1 text-xs" />
                  {video.duration}
                </div>
              )}
            </div>
            <h3 className="font-medium mt-2 text-white group-hover:text-primary-400 line-clamp-1">
              {video.title}
            </h3>
            {!compact && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {video.description}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          to={`/gameplay-videos/${gameId}`}
          className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm"
        >
          <FiVideo className="mr-1" /> View all {gameName} videos
        </Link>
      </div>
    </div>
  );
};

export default MobileGameVideos;
