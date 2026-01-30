import type React from 'react';
import { useState, useEffect } from 'react';
import type { App } from '../data/apps';
import { type VideoItem, getFolderName, getGameVideos } from '../utils/videoHelpers';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import { trackVideoThumbnailClick as trackThumbnailClick } from '../utils/analyticsHelpers';

interface GameplayVideosProps {
  app: App;
  autoplay?: boolean;
  onVideoSelect?: (video: VideoItem) => void;
}

const GameplayVideos: React.FC<GameplayVideosProps> = ({ app, autoplay = false, onVideoSelect }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate network delay
        setTimeout(() => {
          // Get videos for this game
          const gameVideos = getGameVideos(app.id, app.name);

          if (gameVideos.length === 0) {
            setError(`No gameplay videos available for ${app.name}`);
          } else {
            setVideos(gameVideos);
            setSelectedVideo(gameVideos[0]?.id || null);
          }

          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading videos:', error);
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };

    if (app) {
      loadVideos();
    }
  }, [app]);

  // Handle thumbnail click with analytics tracking
  const handleThumbnailClick = (videoId: string) => {
    const clickedVideo = videos.find(v => v.id === videoId);
    if (clickedVideo) {
      if (onVideoSelect) {
        // If external handler is provided, use it
        onVideoSelect(clickedVideo);
      } else {
        // Otherwise use internal state
        setSelectedVideo(videoId);
      }

      // Track the thumbnail click
      trackThumbnailClick({
        videoId: clickedVideo.id,
        videoTitle: clickedVideo.title,
        gameId: clickedVideo.gameId,
        gameName: clickedVideo.gameName
      });
    }
  };

  // Check if this app has gameplay videos
  const hasGameplayVideos = !!getFolderName(app.id);

  if (!hasGameplayVideos) {
    return (
      <div className="py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">No gameplay videos available for this app.</p>
      </div>
    );
  }

  // Handle video end event
  const handleVideoEnd = () => {
    // Auto-advance to next video if we're not using external video selection
    if (!onVideoSelect && videos.length > 1) {
      const currentIndex = videos.findIndex(v => v.id === selectedVideo);
      const nextIndex = (currentIndex + 1) % videos.length;
      setSelectedVideo(videos[nextIndex].id);
    }
  };

  const currentVideo = videos.find(v => v.id === selectedVideo);

  if (error) {
    return (
      <div className="py-4 px-6 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Gameplay Videos</h3>
      {loading ? (
        <div className="flex justify-center items-center h-56 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
          <span className="text-gray-500 dark:text-gray-400">Loading videos...</span>
        </div>
      ) : videos.length > 0 ? (
        <div className="space-y-4">
          {currentVideo && !onVideoSelect && (
            <EnhancedVideoPlayer
              video={currentVideo}
              autoplay={autoplay}
              onEnded={handleVideoEnd}
            />
          )}

          <div className="grid grid-cols-3 gap-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                  video.id === selectedVideo && !onVideoSelect
                    ? 'border-primary dark:border-primary-dark'
                    : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(video.id)}
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-primary dark:bg-primary-dark bg-opacity-80 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  )}
                </div>
                <p className="text-xs p-1 truncate dark:text-white">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-gray-500 dark:text-gray-400">No gameplay videos available</span>
        </div>
      )}
    </div>
  );
};

export default GameplayVideos;
