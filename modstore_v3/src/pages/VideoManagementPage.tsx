import type React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiVideo, FiList, FiUpload, FiBarChart2, FiEdit2, FiTrash2, FiEye, FiTag, FiCalendar, FiFilter } from 'react-icons/fi';
import { MODDED_APPS } from '../data/apps';
import VideoUploadForm from '../components/VideoUploadForm';
import { getAllGameVideos, type VideoItem } from '../utils/videoHelpers';

// Local storage key for uploaded videos
const UPLOADED_VIDEOS_KEY = 'modstore_uploaded_videos';

// Tabs for the management interface
type TabType = 'upload' | 'videos' | 'analytics';

// Filter options for the videos tab
type VideoFilterType = 'all' | 'uploaded' | 'library';

const VideoManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [uploadedVideos, setUploadedVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [videoFilter, setVideoFilter] = useState<VideoFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get all videos
  const allVideos = [...getAllGameVideos(), ...uploadedVideos];

  // Filtered videos based on selected filter and search query
  const filteredVideos = allVideos.filter(video => {
    const matchesFilter = videoFilter === 'all' ||
      (videoFilter === 'uploaded' && uploadedVideos.some(v => v.id === video.id)) ||
      (videoFilter === 'library' && !uploadedVideos.some(v => v.id === video.id));

    const matchesSearch = searchQuery ?
      (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       video.gameName.toLowerCase().includes(searchQuery.toLowerCase())) :
      true;

    return matchesFilter && matchesSearch;
  });

  // Load uploaded videos from local storage
  useEffect(() => {
    setLoading(true);
    try {
      const savedVideos = localStorage.getItem(UPLOADED_VIDEOS_KEY);
      if (savedVideos) {
        setUploadedVideos(JSON.parse(savedVideos));
      }
    } catch (err) {
      console.error('Failed to load videos from localStorage:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save uploaded videos to local storage when they change
  useEffect(() => {
    if (uploadedVideos.length > 0) {
      localStorage.setItem(UPLOADED_VIDEOS_KEY, JSON.stringify(uploadedVideos));
    }
  }, [uploadedVideos]);

  // Handle video upload completion
  const handleUploadComplete = (videoData: {
    file: File;
    title: string;
    description: string;
    gameId: string;
    thumbnailTime: number;
    thumbnailBlob?: Blob;
    tags: string[];
    visibility: 'public' | 'unlisted';
  }) => {
    try {
      // If editing existing video
      if (editingVideo) {
        // Update the video properties (except the blob URL which remains the same)
        const updatedVideos = uploadedVideos.map(video => {
          if (video.id === editingVideo.id) {
            return {
              ...video,
              title: videoData.title,
              description: videoData.description,
              gameId: videoData.gameId,
              tags: videoData.tags,
              visibility: videoData.visibility,
              // Update thumbnail if a new one was provided
              thumbnail: videoData.thumbnailBlob
                ? URL.createObjectURL(videoData.thumbnailBlob)
                : video.thumbnail
            };
          }
          return video;
        });

        setUploadedVideos(updatedVideos);
        setEditingVideo(null);

        // Show success message
        setMessage({
          type: 'success',
          text: 'Video updated successfully!'
        });

        // Switch to videos tab
        setActiveTab('videos');

        // Auto-dismiss message
        setTimeout(() => setMessage(null), 3000);
        return;
      }

      // Get the app info for new upload
      const app = MODDED_APPS.find(a => a.id === videoData.gameId);
      if (!app) throw new Error('Invalid game selected');

      // Create a unique ID
      const newId = `upload-${Date.now()}`;

      // Create a blob URL for the uploaded video
      const videoUrl = URL.createObjectURL(videoData.file);

      // Create timestamp for the upload date
      const uploadDate = new Date().toISOString().split('T')[0];

      // Create thumbnail URL if blob exists
      const thumbnailUrl = videoData.thumbnailBlob
        ? URL.createObjectURL(videoData.thumbnailBlob)
        : app.screenshots[0] || '';

      // Calculate video duration (for production, this would be determined more accurately)
      const videoDurationSecs = Math.round(videoData.file.size / (500000)); // Very rough estimate
      const minutes = Math.floor(videoDurationSecs / 60);
      const seconds = videoDurationSecs % 60;
      const durationString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      // Create new video item
      const newVideo: VideoItem = {
        id: newId,
        gameId: videoData.gameId,
        gameName: app.name,
        title: videoData.title,
        description: videoData.description,
        path: videoUrl,
        thumbnail: thumbnailUrl,
        duration: durationString,
        uploadDate,
        tags: videoData.tags,
        visibility: videoData.visibility
      };

      // Add to uploaded videos
      setUploadedVideos(prev => [newVideo, ...prev]);

      // Show success message
      setMessage({
        type: 'success',
        text: 'Video uploaded successfully!'
      });

      // Auto-dismiss message after 3 seconds
      setTimeout(() => setMessage(null), 3000);

      // Switch to videos tab to show the new upload
      setActiveTab('videos');

    } catch (error) {
      console.error('Error handling upload:', error);
      setMessage({
        type: 'error',
        text: 'Failed to process video. Please try again.'
      });

      // Auto-dismiss error message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  // Handle video deletion
  const handleDeleteVideo = (videoId: string) => {
    try {
      // Find the video
      const videoToDelete = uploadedVideos.find(v => v.id === videoId);

      // If it's a blob URL, revoke it to free memory
      if (videoToDelete?.path.startsWith('blob:')) {
        URL.revokeObjectURL(videoToDelete.path);
      }

      // If the video has a blob thumbnail, revoke it
      if (videoToDelete?.thumbnail.startsWith('blob:')) {
        URL.revokeObjectURL(videoToDelete.thumbnail);
      }

      // Remove from state
      setUploadedVideos(prev => prev.filter(v => v.id !== videoId));

      // Show success message
      setMessage({
        type: 'success',
        text: 'Video deleted successfully!'
      });

      // Auto-dismiss
      setTimeout(() => setMessage(null), 3000);

    } catch (error) {
      console.error('Error deleting video:', error);
      setMessage({
        type: 'error',
        text: 'Failed to delete video. Please try again.'
      });

      setTimeout(() => setMessage(null), 5000);
    }
  };

  // Handle video edit button click
  const handleEditVideo = (video: VideoItem) => {
    setEditingVideo(video);
    setActiveTab('upload');
  };

  // Handle canceling the edit mode
  const handleCancelEdit = () => {
    setEditingVideo(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 dark:text-white">Content Management</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload and manage gameplay videos for your ModStore TikTok promotional content.
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setActiveTab('upload');
            if (editingVideo) {
              setEditingVideo(null);
            }
          }}
          className={`flex items-center px-4 py-2 font-medium ${
            activeTab === 'upload'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <FiUpload className="mr-2" /> {editingVideo ? 'Edit Video' : 'Upload'}
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center px-4 py-2 font-medium ${
            activeTab === 'videos'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <FiList className="mr-2" /> Videos ({allVideos.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center px-4 py-2 font-medium ${
            activeTab === 'analytics'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <FiBarChart2 className="mr-2" /> Analytics
        </button>
      </div>

      <div>
        {activeTab === 'upload' && (
          <div>
            {editingVideo && (
              <div className="mb-4 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiEdit2 className="text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-blue-800 dark:text-blue-300">
                    Editing: <strong>{editingVideo.title}</strong>
                  </span>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
                >
                  Cancel
                </button>
              </div>
            )}
            <VideoUploadForm
              apps={MODDED_APPS}
              onUploadComplete={handleUploadComplete}
              initialData={editingVideo ? {
                title: editingVideo.title,
                description: editingVideo.description || '',
                gameId: editingVideo.gameId,
                tags: editingVideo.tags || [],
                visibility: editingVideo.visibility || 'public'
              } : undefined}
              isEditing={!!editingVideo}
            />
          </div>
        )}

        {activeTab === 'videos' && (
          <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search videos by title, game, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center">
                  <FiFilter className="mr-2 text-gray-500 dark:text-gray-400" />
                  <select
                    value={videoFilter}
                    onChange={(e) => setVideoFilter(e.target.value as VideoFilterType)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Videos</option>
                    <option value="uploaded">My Uploads</option>
                    <option value="library">Library Videos</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  to="#"
                  onClick={() => {
                    setEditingVideo(null);
                    setActiveTab('upload');
                  }}
                  className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiPlus className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                  <span className="text-gray-500 dark:text-gray-400">Add New Video</span>
                </Link>

                {filteredVideos.map(video => {
                  const isUploaded = uploadedVideos.some(v => v.id === video.id);

                  return (
                    <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative group">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                            <FiVideo className="h-6 w-6 text-primary-600" />
                          </div>
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                        )}
                        {isUploaded && (
                          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                            Uploaded
                          </div>
                        )}
                        {video.visibility === 'unlisted' && (
                          <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                            Unlisted
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-1 dark:text-white truncate" title={video.title}>
                          {video.title}
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {video.tags?.map((tag, index) => (
                            <span
                              key={`${video.id}-tag-${index}`}
                              className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center">
                            <FiVideo className="mr-1 text-xs" />
                            {video.gameName}
                          </div>
                          {video.uploadDate && (
                            <div className="flex items-center">
                              <FiCalendar className="mr-1 text-xs" />
                              {video.uploadDate}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <Link
                            to={`/gameplay-videos/${video.gameId}`}
                            className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                          >
                            <FiEye className="mr-1" /> View
                          </Link>
                          {isUploaded && (
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEditVideo(video)}
                                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <FiEdit2 className="mr-1" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteVideo(video.id)}
                                className="flex items-center text-red-600 dark:text-red-400 hover:underline"
                              >
                                <FiTrash2 className="mr-1" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                <FiVideo className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No videos found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? "No videos match your search criteria."
                    : videoFilter === 'uploaded'
                      ? "You haven't uploaded any videos yet."
                      : "No videos available in the selected category."}
                </p>
                <button
                  onClick={() => {
                    setEditingVideo(null);
                    setActiveTab('upload');
                  }}
                  className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  <FiPlus className="mr-2" /> Upload New Video
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Video Analytics</h2>

            {/* Simulated metrics overview - Added comments metric */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Views</p>
                <p className="text-2xl font-bold dark:text-white">48.3K</p>
                <p className="text-xs text-green-500">+12% this week</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold dark:text-white">7.8%</p>
                <p className="text-xs text-green-500">+2.4% this week</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Comments</p>
                <p className="text-2xl font-bold dark:text-white">845</p>
                <p className="text-xs text-green-500">+18% this week</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Converted Downloads</p>
                <p className="text-2xl font-bold dark:text-white">1,254</p>
                <p className="text-xs text-green-500">+8% this week</p>
              </div>
            </div>

            {/* Top videos - Updated table with comments column */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 dark:text-white">Top Videos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Video</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Likes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Comments</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Watch Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CTR</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Sample data - would be real metrics in a production app */}
                    {allVideos.slice(0, 5).map((video, index) => (
                      <tr key={video.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0">
                              <img className="w-10 h-10 rounded object-cover" src={video.thumbnail} alt={video.title} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{video.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{video.gameName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{9500 - (index * 1500)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{850 - (index * 120)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{280 - (index * 45)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{Math.floor(30 - (index * 2.5))}s</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{(8.5 - (index * 0.8)).toFixed(1)}%</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Engagement breakdown - New section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 dark:text-white">Engagement Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Comment Activity</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">New Comments</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">+124 (last 7 days)</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Most Commented Video</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">PUBG Gameplay #3</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Comment to View Ratio</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1.7%</span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full mt-3">
                    <div className="h-1 bg-green-500 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">68% of goal reached</p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Monthly Trends</h4>
                  <div className="h-40 flex items-end justify-between space-x-2">
                    {[35, 45, 55, 40, 50, 65, 70, 75, 60, 80, 85, 90].map((h, i) => (
                      <div key={`bar-${i}`} className="relative flex-1">
                        <div
                          className="bg-primary-500 dark:bg-primary-400 rounded-t w-full absolute bottom-0"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Jan</span>
                    <span className="text-xs text-gray-500">Feb</span>
                    <span className="text-xs text-gray-500">Mar</span>
                    <span className="text-xs text-gray-500">Apr</span>
                    <span className="text-xs text-gray-500">May</span>
                    <span className="text-xs text-gray-500">Jun</span>
                    <span className="text-xs text-gray-500">Jul</span>
                    <span className="text-xs text-gray-500">Aug</span>
                    <span className="text-xs text-gray-500">Sep</span>
                    <span className="text-xs text-gray-500">Oct</span>
                    <span className="text-xs text-gray-500">Nov</span>
                    <span className="text-xs text-gray-500">Dec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics explanation - Updated to include comment metrics */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
              <p className="text-blue-800 dark:text-blue-300 mb-2">
                <strong>Note:</strong> This demo shows simulated analytics. In a production app, these metrics would be based on actual user interactions tracked through analytics.
              </p>
              <ul className="list-disc pl-5 text-blue-700 dark:text-blue-400">
                <li>CTR (Click-Through Rate): Percentage of viewers who click on download links</li>
                <li>Engagement Rate: Combined metric of likes, comments, and shares relative to views</li>
                <li>Avg. Watch Time: Average duration viewers spend watching each video</li>
                <li>Comment Activity: Tracks comment frequency and sentiment on videos</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManagementPage;
