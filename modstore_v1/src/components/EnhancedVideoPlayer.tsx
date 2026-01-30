import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiShare2, FiDownload, FiEye, FiThumbsUp, FiCopy, FiTwitter, FiMessageSquare, FiSettings, FiMaximize, FiX } from 'react-icons/fi';
import type { VideoItem } from '../utils/videoHelpers';
import { fixVideoPath } from '../utils/videoHelpers';
import {
  trackVideoPlay,
  trackVideoPause,
  trackVideoFinish,
  trackVideoShare,
  trackVideoDownload,
  formatViewCount
} from '../utils/analyticsHelpers';

interface EnhancedVideoPlayerProps {
  video: VideoItem;
  autoplay?: boolean;
  onEnded?: () => void;
}

type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;

const EnhancedVideoPlayer: React.FC<EnhancedVideoPlayerProps> = ({ video, autoplay = false, onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [views, setViews] = useState(Math.floor(Math.random() * 10000) + 100); // Demo views
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000) + 10); // Demo likes
  const [hasLiked, setHasLiked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Fix video path if needed (handles special cases like baseball9)
  const videoPath = fixVideoPath(video.path);

  // Calculate completion percentage for progress bar
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // Format time display (e.g., 1:24)
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // When autoplay changes, update isPlaying
  useEffect(() => {
    setIsPlaying(autoplay);
  }, [autoplay]);

  // Apply playback speed when it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle keypresses if the video is in focus
      if (!playerRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
              videoRef.current.duration,
              videoRef.current.currentTime + 5
            );
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
              0,
              videoRef.current.currentTime - 5
            );
          }
          break;
        case 'f':
          e.preventDefault();
          toggleFullScreen();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Track video play/pause events
  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play().catch(err => {
        console.error('Failed to play video:', err);
        setIsPlaying(false);
      });

      trackVideoPlay({
        videoId: video.id,
        videoTitle: video.title,
        gameId: video.gameId,
        gameName: video.gameName,
        duration: video.duration
      });
    } else {
      videoRef.current?.pause();
      if (currentTime > 0) {
        trackVideoPause({
          videoId: video.id,
          videoTitle: video.title,
          gameId: video.gameId,
          gameName: video.gameName,
          currentTime,
          totalDuration: duration,
          percentageWatched: Math.floor((currentTime / duration) * 100)
        });
      }
    }
  }, [isPlaying, video, currentTime, duration]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle video duration loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setLoading(false);
    }
  };

  // Handle video end
  const handleVideoEnded = () => {
    setIsPlaying(false);
    trackVideoFinish({
      videoId: video.id,
      videoTitle: video.title,
      gameId: video.gameId,
      gameName: video.gameName,
      duration: video.duration
    });
    if (onEnded) onEnded();
  };

  // Handle video error
  const handleVideoError = () => {
    console.error('Video error for:', videoPath);
    setVideoError(true);
    setLoading(false);
  };

  // Handle seek on progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  // Handle video play/pause toggle
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle fullscreen toggle
  const toggleFullScreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle playback speed change
  const changePlaybackSpeed = (speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed);
    setShowSettingsMenu(false);
  };

  // Handle share button click
  const handleShare = (method: 'copy' | 'twitter' | 'whatsapp' | 'telegram') => {
    // Generate share URL (would come from your app's configuration)
    const shareUrl = `https://modstore.com/videos/${video.gameId}/${video.id}`;
    let shareSuccessful = false;

    switch (method) {
      case 'copy':
        try {
          navigator.clipboard.writeText(shareUrl);
          shareSuccessful = true;
          setShareMessage('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy URL: ', err);
          setShareMessage('Failed to copy link');
        }
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=Check out this awesome ${video.gameName} mod!&url=${encodeURIComponent(shareUrl)}`, '_blank');
        shareSuccessful = true;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this awesome ${video.gameName} mod! ${shareUrl}`)}`, '_blank');
        shareSuccessful = true;
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this awesome ${video.gameName} mod!`)}`, '_blank');
        shareSuccessful = true;
        break;
    }

    if (shareSuccessful) {
      trackVideoShare({
        videoId: video.id,
        videoTitle: video.title,
        gameId: video.gameId,
        gameName: video.gameName,
        shareMethod: method
      });
    }

    setTimeout(() => {
      setShareMessage('');
      setShowShareMenu(false);
    }, 2000);
  };

  // Handle download button click
  const handleDownload = async () => {
    if (videoBlobUrl) {
      // If we already created a blob URL, use it
      const a = document.createElement('a');
      a.href = videoBlobUrl;
      a.download = `${video.gameName}_gameplay.mp4`;
      a.click();

      trackVideoDownload({
        videoId: video.id,
        videoTitle: video.title,
        gameId: video.gameId,
        gameName: video.gameName
      });
    } else {
      // For the placeholder UI, we'll just show a message
      alert("In the real app, this would download the video");
    }
  };

  // Handle like button click
  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      ref={playerRef}
      className={`relative w-full ${isFullScreen ? 'fullscreen-video' : ''}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-800 z-10">
            <div className="animate-spin h-10 w-10 border-4 border-primary-400 border-t-transparent rounded-full" />
          </div>
        )}

        {/* Using actual video when available, fallback to image */}
        {videoError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            poster={video.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            playsInline
          >
            <source src={videoPath} type="video/mp4" />
            <track kind="captions" src="" label="English" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Overlay for play button and controls when not playing */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${isPlaying && !loading ? 'opacity-0' : 'opacity-100'}`}
          onClick={togglePlayPause}
        >
          <div className="w-20 h-20 rounded-full bg-primary bg-opacity-80 flex items-center justify-center cursor-pointer">
            <FiPlay className="text-white text-4xl ml-1" />
          </div>
        </div>

        {/* Video Info Overlay (always visible) */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div>
            <h3 className="text-white font-bold text-lg drop-shadow-md">{video.title}</h3>
            <p className="text-white text-opacity-90 text-sm drop-shadow-md">{video.gameName}</p>
          </div>
          <div className="bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs text-white">
            <FiEye className="inline mr-1" /> {formatViewCount(views)}
          </div>
        </div>

        {/* Video Controls (show on hover or when paused) */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-4 transition-opacity ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Progress bar */}
          <div
            className="w-full h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer mb-3"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary-400"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4 items-center">
              {/* Play/Pause button */}
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-primary-300 focus:outline-none"
              >
                {isPlaying ? <FiPause className="text-xl" /> : <FiPlay className="text-xl" />}
              </button>

              {/* Time display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {video.duration || formatTime(duration)}
              </div>

              {/* Playback speed indicator */}
              <div className="text-white text-xs px-2 py-1 bg-black bg-opacity-50 rounded">
                {playbackSpeed}x
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              {/* Like button */}
              <button
                onClick={handleLike}
                className={`text-white focus:outline-none flex items-center ${hasLiked ? 'text-red-500' : 'hover:text-primary-300'}`}
              >
                <FiThumbsUp className="mr-1" /> {formatViewCount(likes)}
              </button>

              {/* Settings button & menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSettingsMenu(!showSettingsMenu);
                    setShowShareMenu(false);
                  }}
                  className="text-white hover:text-primary-300 focus:outline-none"
                >
                  <FiSettings className={`text-xl ${showSettingsMenu ? 'text-primary-300' : ''}`} />
                </button>

                {/* Settings menu dropdown */}
                {showSettingsMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-dark-700 rounded-lg shadow-lg p-2 w-40 z-20">
                    <div className="text-white text-xs font-medium mb-1 px-3">
                      Playback Speed
                    </div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={`speed-${speed}`}
                        onClick={() => changePlaybackSpeed(speed as PlaybackSpeed)}
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-dark-600 flex items-center justify-between ${
                          playbackSpeed === speed ? 'bg-dark-600 text-primary-400' : 'text-white'
                        }`}
                      >
                        {speed}x
                        {playbackSpeed === speed && (
                          <span className="h-2 w-2 rounded-full bg-primary-400"></span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Share button & menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowShareMenu(!showShareMenu);
                    setShowSettingsMenu(false);
                  }}
                  className="text-white hover:text-primary-300 focus:outline-none"
                >
                  <FiShare2 className={`text-xl ${showShareMenu ? 'text-primary-300' : ''}`} />
                </button>

                {/* Share menu dropdown */}
                {showShareMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-dark-700 rounded-lg shadow-lg p-2 w-40 z-20">
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full text-left px-3 py-2 text-sm rounded hover:bg-dark-600 text-white flex items-center"
                    >
                      <FiCopy className="mr-2" /> Copy Link
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full text-left px-3 py-2 text-sm rounded hover:bg-dark-600 text-white flex items-center"
                    >
                      <FiTwitter className="mr-2" /> Twitter
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full text-left px-3 py-2 text-sm rounded hover:bg-dark-600 text-white flex items-center"
                    >
                      <FiMessageSquare className="mr-2" /> WhatsApp
                    </button>
                  </div>
                )}

                {/* Share success message */}
                {shareMessage && (
                  <div className="absolute top-full right-0 mt-2 bg-dark-700 rounded-lg shadow-lg p-2 text-sm text-white z-20">
                    {shareMessage}
                  </div>
                )}
              </div>

              {/* Fullscreen button */}
              <button
                onClick={toggleFullScreen}
                className="text-white hover:text-primary-300 focus:outline-none"
              >
                {isFullScreen ? <FiX className="text-xl" /> : <FiMaximize className="text-xl" />}
              </button>

              {/* Download button */}
              <button
                onClick={handleDownload}
                className="text-white hover:text-primary-300 focus:outline-none"
              >
                <FiDownload className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video description */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {video.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {video.uploadDate || 'Recently uploaded'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedVideoPlayer;
