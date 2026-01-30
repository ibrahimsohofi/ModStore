import type React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MODDED_APPS, type App, getAppById } from '../data/apps';
import GameplayVideos from '../components/GameplayVideos';
import RelatedVideos from '../components/RelatedVideos';
import CommentSection from '../components/CommentSection';
import { appIdToFolderMap, getAllGameVideos, type VideoItem } from '../utils/videoHelpers';
import { FiFilter, FiVideo, FiShare2, FiDownload } from 'react-icons/fi';
import { trackVideoView, trackCommentAdd } from '../utils/analyticsHelpers';

const GameplayVideosPage: React.FC = () => {
  const params = useParams<{ gameId?: string }>();

  // Only include games with potential gameplay videos
  const gameApps = MODDED_APPS.filter(app =>
    Object.keys(appIdToFolderMap).includes(app.id)
  );

  // Find the app from the URL param if provided
  const defaultApp = params.gameId ?
    gameApps.find(app => app.id === params.gameId) || gameApps[0] :
    gameApps[0];

  const [selectedApp, setSelectedApp] = useState<App | null>(defaultApp || null);
  const [allVideos, setAllVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>(params.gameId || 'all');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  useEffect(() => {
    // Simulate loading videos
    setLoading(true);
    setTimeout(() => {
      const videos = getAllGameVideos();
      setAllVideos(videos);
      setLoading(false);
    }, 800);
  }, []);

  // When params.gameId changes, update the selected app and filter
  useEffect(() => {
    if (params.gameId) {
      const app = gameApps.find(app => app.id === params.gameId);
      if (app) {
        setSelectedApp(app);
        setActiveFilter(app.id);
      }
    }
  }, [params.gameId, gameApps]);

  // Filter videos based on selected category
  const filteredVideos = allVideos.filter(video =>
    activeFilter === 'all' || video.gameId === activeFilter
  );

  // Handle video selection
  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
    setShowVideoPlayer(true);

    // Track video view
    trackVideoView({
      videoId: video.id,
      videoTitle: video.title,
      gameId: video.gameId,
      gameName: video.gameName
    });

    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Handle back button click
  const handleBackToGallery = () => {
    setSelectedVideo(null);
    setShowVideoPlayer(false);
  };

  // Share video
  const handleShareVideo = () => {
    if (!selectedVideo) return;

    // Create shareable URL
    const shareUrl = `${window.location.origin}/gameplay-videos/${selectedVideo.gameId}?video=${selectedVideo.id}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error('Could not copy text: ', err);
        alert("Failed to copy link. Please try again.");
      }
    );
  };

  // Handle comment addition
  const handleCommentAdded = (comment: { id: string; content: string }) => {
    if (!selectedVideo) return;

    trackCommentAdd({
      videoId: selectedVideo.id,
      videoTitle: selectedVideo.title,
      gameId: selectedVideo.gameId,
      gameName: selectedVideo.gameName,
      commentId: comment.id,
      commentText: comment.content
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showVideoPlayer && selectedVideo ? (
        // Video player view
        <div>
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={handleBackToGallery}
              className="text-primary-600 dark:text-primary-400 flex items-center hover:underline"
            >
              ← Back to Gallery
            </button>
            <div className="flex space-x-3">
              <button
                onClick={handleShareVideo}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <FiShare2 className="mr-1" /> Share
              </button>
              <a
                href={selectedVideo.path}
                download
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <FiDownload className="mr-1" /> Download
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black">
              <video
                src={selectedVideo.path}
                poster={selectedVideo.thumbnail}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <h1 className="text-xl font-bold mb-2 dark:text-white">{selectedVideo.title}</h1>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="mr-4">{selectedVideo.gameName}</span>
              {selectedVideo.uploadDate && <span>Uploaded on {selectedVideo.uploadDate}</span>}
            </div>

            {selectedVideo.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedVideo.description}</p>
            )}

            {selectedVideo.tags && selectedVideo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedVideo.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related videos */}
          <RelatedVideos
            currentVideo={selectedVideo}
            onVideoSelect={handleVideoSelect}
            limit={4}
            showHeader={true}
          />

          {/* Comments Section */}
          <div className="mt-6">
            <CommentSection
              videoId={selectedVideo.id}
              gameName={selectedVideo.gameName}
              onCommentAdded={handleCommentAdded}
            />
          </div>

          {/* App info card */}
          {selectedApp && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <img
                  src={selectedApp.icon}
                  alt={selectedApp.name}
                  className="w-12 h-12 rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold dark:text-white">{selectedApp.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedApp.category}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">{selectedApp.description}</p>
              </div>

              <Link
                to={`/app/${selectedApp.id}`}
                className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                View App Details
              </Link>
            </div>
          )}
        </div>
      ) : (
        // Gallery view
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 dark:text-white">Gameplay Videos</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Check out exciting gameplay footage of our modded games. See the enhanced features in action before you download!
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 whitespace-nowrap font-medium ${
                  activeFilter === 'all'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                All Videos
              </button>
              {gameApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => setActiveFilter(app.id)}
                  className={`px-4 py-2 whitespace-nowrap font-medium ${
                    activeFilter === app.id
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4 dark:text-white">Games</h3>
                <div className="space-y-2">
                  {gameApps.map(app => (
                    <div
                      key={app.id}
                      className={`p-2 rounded-md cursor-pointer flex items-center space-x-3 transition-colors ${
                        selectedApp?.id === app.id
                          ? 'bg-primary bg-opacity-10 dark:bg-primary-dark dark:bg-opacity-20'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedApp(app)}
                    >
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-10 h-10 rounded-md"
                      />
                      <span className={`font-medium ${
                        selectedApp?.id === app.id
                          ? 'text-primary dark:text-primary-dark'
                          : 'dark:text-white'
                      }`}>
                        {app.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4 dark:text-white">About TikTok Content</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Our TikTok channel features exclusive gameplay footage showing the amazing benefits of our modded games.
                  Follow us for daily updates!
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to="https://tiktok.com/@modstore"
                    className="flex items-center text-primary dark:text-primary-dark hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 448 512">
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                    </svg>
                    @ModStore
                  </Link>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Updated daily</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9">
              {selectedApp ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center mb-6">
                    <img
                      src={selectedApp.icon}
                      alt={selectedApp.name}
                      className="w-16 h-16 rounded-xl mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-bold dark:text-white">{selectedApp.name}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{selectedApp.description}</p>
                      <div className="mt-2">
                        <Link
                          to={`/app/${selectedApp.id}`}
                          className="text-primary dark:text-primary-dark text-sm hover:underline"
                        >
                          View App Details →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <GameplayVideos
                    app={selectedApp}
                    autoplay={false}
                    onVideoSelect={handleVideoSelect}
                  />

                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">Mod Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedApp.features.slice(0, 6).map((feature, index) => (
                        <li key={`feature-${selectedApp.id}-${index}`} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4 dark:text-white">
                    All Gameplay Videos
                  </h2>

                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`skeleton-item-${i}`} className="animate-pulse">
                          <div className="bg-gray-200 dark:bg-gray-700 aspect-video rounded-lg mb-2" />
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredVideos.map(video => (
                        <div
                          key={video.id}
                          className="group cursor-pointer"
                          onClick={() => handleVideoSelect(video)}
                        >
                          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 bg-primary-600 dark:bg-primary-400 bg-opacity-90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                                <FiVideo className="h-8 w-8 text-white" />
                              </div>
                            </div>
                            {video.duration && (
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                                {video.duration}
                              </div>
                            )}
                          </div>
                          <h3 className="font-medium mt-2 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {video.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span className="mr-2">{video.gameName}</span>
                            {video.uploadDate && <span>•  {video.uploadDate}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameplayVideosPage;
