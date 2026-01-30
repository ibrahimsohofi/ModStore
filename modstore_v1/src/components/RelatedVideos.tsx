import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllGameVideos, type VideoItem } from '../utils/videoHelpers';
import { FiPlay, FiClock, FiEye } from 'react-icons/fi';
import { formatViewCount } from '../utils/analyticsHelpers';

interface RelatedVideosProps {
  currentVideo: VideoItem;
  onVideoSelect?: (video: VideoItem) => void;
  limit?: number;
  autoplayNext?: boolean;
  excludeIds?: string[];
  showHeader?: boolean;
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({
  currentVideo,
  onVideoSelect,
  limit = 4,
  autoplayNext = false,
  excludeIds = [],
  showHeader = true
}) => {
  const [relatedVideos, setRelatedVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Find related videos based on game and tags
  useEffect(() => {
    setIsLoading(true);

    // Get all videos
    const allVideos = getAllGameVideos();

    // Filter out current video and excluded IDs
    const videosToFilter = allVideos.filter(
      video => video.id !== currentVideo.id && !excludeIds.includes(video.id)
    );

    // Find videos from the same game
    const sameGameVideos = videosToFilter.filter(
      video => video.gameId === currentVideo.gameId
    );

    // Find videos with matching tags
    const matchingTagVideos = videosToFilter.filter(video =>
      currentVideo.tags && video.tags &&
      video.tags.some(tag => currentVideo.tags?.includes(tag))
    );

    // Merge and deduplicate related videos (prioritizing same game)
    let filteredVideos = [...sameGameVideos];

    // Add matching tag videos that aren't already in filteredVideos
    matchingTagVideos.forEach(video => {
      if (!filteredVideos.some(v => v.id === video.id)) {
        filteredVideos.push(video);
      }
    });

    // If we still need more videos, add random ones
    if (filteredVideos.length < limit) {
      const remainingVideos = videosToFilter.filter(
        video => !filteredVideos.some(v => v.id === video.id)
      );

      // Randomize and take what we need
      const randomVideos = remainingVideos
        .sort(() => 0.5 - Math.random())
        .slice(0, limit - filteredVideos.length);

      filteredVideos = [...filteredVideos, ...randomVideos];
    }

    // Limit to the specified number
    filteredVideos = filteredVideos.slice(0, limit);

    setRelatedVideos(filteredVideos);
    setIsLoading(false);
  }, [currentVideo.id, currentVideo.gameId, currentVideo.tags, excludeIds, limit]);

  // Auto-select the next video (for autoplay) if enabled and there are related videos
  React.useEffect(() => {
    if (autoplayNext && relatedVideos.length > 0) {
      // Use a timeout to simulate a delay before autoplay
      const autoplayTimer = setTimeout(() => {
        if (onVideoSelect && relatedVideos[0]) {
          onVideoSelect(relatedVideos[0]);
        }
      }, 3000);

      return () => clearTimeout(autoplayTimer);
    }
  }, [autoplayNext, relatedVideos, onVideoSelect]);

  // If there are no related videos, don't render anything
  if (relatedVideos.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="mt-6">
      {showHeader && (
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium dark:text-white">Related Videos</h3>
          {autoplayNext && relatedVideos.length > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Next video plays in 3s
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={`skeleton-rel-${i}`} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 aspect-video rounded-lg mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        // Actual video list
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedVideos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer transition-all hover:opacity-95"
              onClick={() => onVideoSelect && onVideoSelect(video)}
            >
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                  <div className="w-12 h-12 rounded-full bg-primary-500 bg-opacity-90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                    <FiPlay className="text-white ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                )}
              </div>

              <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                {video.title}
              </h4>

              <div className="flex items-center justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{video.gameName}</span>
                <div className="flex items-center">
                  <FiEye className="mr-1 h-3 w-3" />
                  <span>{formatViewCount(Math.floor(Math.random() * 15000) + 200)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedVideos;
