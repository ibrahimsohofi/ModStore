import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FiUpload, FiX, FiCheck, FiAlertCircle, FiCameraOff, FiTag, FiVideo, FiFile, FiClock, FiPlus, FiInfo } from 'react-icons/fi';
import { appIdToFolderMap } from '../utils/videoHelpers';
import type { App } from '../data/apps';

interface VideoUploadFormProps {
  apps: App[];
  onUploadComplete: (videoData: {
    file: File;
    title: string;
    description: string;
    gameId: string;
    thumbnailTime: number;
    thumbnailBlob?: Blob;
    tags: string[];
    visibility: 'public' | 'unlisted';
  }) => void;
  initialData?: {
    title?: string;
    description?: string;
    gameId?: string;
    tags?: string[];
    visibility?: 'public' | 'unlisted';
  };
  isEditing?: boolean;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  apps,
  onUploadComplete,
  initialData,
  isEditing = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [gameId, setGameId] = useState(initialData?.gameId || '');
  const [thumbnailTime, setThumbnailTime] = useState(0);
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileValidationError, setFileValidationError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'unlisted'>(initialData?.visibility || 'public');
  const [thumbnailGenerated, setThumbnailGenerated] = useState(false);
  const [videoResolution, setVideoResolution] = useState<string | null>(null);
  const [videoFileSize, setVideoFileSize] = useState<string | null>(null);
  const [videoType, setVideoType] = useState<string | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [showThumbnailGuide, setShowThumbnailGuide] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Filter only apps that have corresponding video folders
  const videoEnabledApps = apps.filter(app => app.id in appIdToFolderMap);

  // Generate suggested tags based on selected game and title
  useEffect(() => {
    if (gameId || title) {
      const gameTags: string[] = [];

      // Add game-specific tags
      if (gameId) {
        const selectedApp = apps.find(app => app.id === gameId);
        if (selectedApp) {
          gameTags.push(selectedApp.name.toLowerCase());
          if (selectedApp.category) {
            gameTags.push(selectedApp.category.toLowerCase());
          }
          if (selectedApp.modType) {
            selectedApp.modType.forEach(type => {
              gameTags.push(type.toLowerCase());
            });
          }
        }
      }

      // Add title-based tags
      if (title) {
        const titleWords = title.toLowerCase().split(' ');
        const relevantTitleWords = titleWords.filter(word =>
          word.length > 3 &&
          !['with', 'this', 'that', 'from', 'have', 'what'].includes(word)
        );
        gameTags.push(...relevantTitleWords);
      }

      // Common gameplay tags
      const commonTags = ['gameplay', 'tutorial', 'walkthrough', 'tips', 'tricks', 'review', 'mod', 'hacks'];
      // Create final suggestions (unique tags)
      const allSuggestions = [...new Set([...gameTags, ...commonTags])].slice(0, 10);
      setSuggestedTags(allSuggestions);
    }
  }, [gameId, title, apps]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleFile = (file: File) => {
    // Reset any previous errors
    setError(null);
    setFileValidationError(null);

    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setFileValidationError('Please upload a video file (MP4, WebM, MOV)');
      return;
    }

    // Validate supported formats
    const supportedFormats = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!supportedFormats.includes(file.type)) {
      setFileValidationError(`Unsupported video format: ${file.type}. Please use MP4, WebM, or MOV.`);
      return;
    }

    // Set the video file type
    setVideoType(file.type);

    // Check file size (max 100MB for demo, adjust as needed)
    if (file.size > 100 * 1024 * 1024) {
      setFileValidationError(`File is too large (${formatFileSize(file.size)}). Maximum size is 100MB.`);
      return;
    }

    setVideoFileSize(formatFileSize(file.size));

    // Create object URL for preview
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setUploadedFile(file);

    // Auto-generate title from filename
    const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    if (!initialData?.title) {
      setTitle(fileName.replace(/-|_/g, ' ')); // Replace dashes/underscores with spaces
    }

    // Load video to get duration and resolution
    const video = document.createElement('video');
    video.src = fileUrl;
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      // Default thumbnail at 25% of the video duration
      setThumbnailTime(Math.floor(video.duration * 0.25));

      // Get video resolution
      video.onloadeddata = () => {
        setVideoResolution(`${video.videoWidth}x${video.videoHeight}`);
      };
    };
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
    setVideoDuration(0);
    setThumbnailTime(0);
    setVideoResolution(null);
    setVideoFileSize(null);
    setVideoType(null);
    setThumbnailGenerated(false);
    setThumbnailBlob(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSeekVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value);
    setThumbnailTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Memoized captureVideoFrame to ensure stable reference for useEffect
  const captureVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and store it
    canvas.toBlob((blob) => {
      if (blob) {
        setThumbnailBlob(blob);
        setThumbnailGenerated(true);
      }
    }, 'image/jpeg', 0.9); // 90% quality JPEG
  }, []);

  // Add tag to the list
  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
      tagInputRef.current?.focus();
    }
  };

  // Remove tag from the list
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle tag input key press (for Enter key)
  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Add tag directly from suggestions
  const addSuggestedTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  // Add all suggested tags at once (up to the limit of 5)
  const addAllSuggestedTags = () => {
    const availableSlots = 5 - tags.length;
    if (availableSlots <= 0) return;

    const newTags = suggestedTags
      .filter(tag => !tags.includes(tag))
      .slice(0, availableSlots);

    setTags([...tags, ...newTags]);
  };

  // Find optimal thumbnail positions based on video duration
  const suggestThumbnailPositions = () => {
    if (!videoDuration) return [];
    const positions = [];
    if (videoDuration < 60) {
      // For videos under 1 minute
      positions.push({
        label: 'Beginning',
        time: Math.min(3, videoDuration * 0.1)
      });
      positions.push({
        label: 'Middle',
        time: videoDuration * 0.5
      });
      positions.push({
        label: 'End',
        time: Math.max(videoDuration - 3, videoDuration * 0.9)
      });
    } else {
      // For longer videos
      positions.push({
        label: 'Intro',
        time: Math.min(5, videoDuration * 0.05)
      });
      positions.push({
        label: '25%',
        time: videoDuration * 0.25
      });
      positions.push({
        label: 'Halfway',
        time: videoDuration * 0.5
      });
      positions.push({
        label: '75%',
        time: videoDuration * 0.75
      });
      positions.push({
        label: 'Near End',
        time: Math.max(videoDuration - 5, videoDuration * 0.95)
      });
    }
    return positions;
  };

  const thumbnailPositions = suggestThumbnailPositions();

  const jumpToThumbnailPosition = (time: number) => {
    setThumbnailTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditing && !uploadedFile) {
      setError('Please upload a video file');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!gameId) {
      setError('Please select a game');
      return;
    }

    // Capture thumbnail frame if not already done
    if (!thumbnailGenerated && videoRef.current) {
      captureVideoFrame();
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload to a server here
      // For this demo, we'll simulate a delay then call the callback
      setTimeout(() => {
        onUploadComplete({
          file: uploadedFile as File, // We've already checked if uploadedFile exists
          title,
          description,
          gameId,
          thumbnailTime,
          thumbnailBlob: thumbnailBlob || undefined,
          tags,
          visibility
        });

        // Reset form if not editing
        if (!isEditing) {
          handleRemoveFile();
          setTitle('');
          setDescription('');
          setGameId('');
          setTags([]);
          setVisibility('public');
        }

        setIsUploading(false);
      }, 1500);

    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload video. Please try again.');
      setIsUploading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Create thumbnail when thumbnailTime changes
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      captureVideoFrame();
    }
  }, [thumbnailTime, captureVideoFrame]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {isEditing ? 'Edit Video Details' : 'Upload Gameplay Video'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Video Upload Area */}
          {(!uploadedFile && !isEditing) ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center">
                <FiUpload className="w-12 h-12 mb-3 text-gray-400 dark:text-gray-500" />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  MP4, WebM or MOV (MAX. 100MB)
                </p>
                {fileValidationError && (
                  <p className="text-sm text-red-500 mb-2">{fileValidationError}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Recommended: HD quality (720p or 1080p), 16:9 aspect ratio,
                  clean footage with good lighting
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Select File
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              {previewUrl && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={previewUrl}
                    className="w-full h-auto rounded-lg"
                    controls
                  >
                    <track kind="captions" src="" label="English" />
                  </video>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Hidden Canvas for Thumbnail Generation */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Video Info */}
              {(videoResolution || videoFileSize || videoType) && (
                <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Video Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {videoResolution && (
                      <div className="flex items-center">
                        <FiVideo className="mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{videoResolution}</span>
                      </div>
                    )}
                    {videoFileSize && (
                      <div className="flex items-center">
                        <FiFile className="mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{videoFileSize}</span>
                      </div>
                    )}
                    {videoDuration > 0 && (
                      <div className="flex items-center">
                        <FiClock className="mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{formatTime(videoDuration)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Thumbnail selector */}
              {videoDuration > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                        Thumbnail Position ({formatTime(thumbnailTime)})
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowThumbnailGuide(!showThumbnailGuide)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <FiInfo className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={captureVideoFrame}
                      className="text-xs px-2 py-1 bg-primary-500 text-white rounded hover:bg-primary-600"
                    >
                      {thumbnailGenerated ? 'Recapture' : 'Capture'} Thumbnail
                    </button>
                  </div>

                  {showThumbnailGuide && (
                    <div className="mb-2 p-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md">
                      <p className="mb-1"><strong>Thumbnail Tips:</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Choose a frame that clearly shows gameplay</li>
                        <li>Avoid blurry or dark scenes</li>
                        <li>Select moments that highlight key features</li>
                        <li>Try to include action or interesting visuals</li>
                      </ul>
                    </div>
                  )}

                  <input
                    type="range"
                    min="0"
                    max={videoDuration}
                    step="0.1"
                    value={thumbnailTime}
                    onChange={handleSeekVideo}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />

                  {/* Quick thumbnail position selectors */}
                  {thumbnailPositions && thumbnailPositions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {thumbnailPositions.map((pos, index) => (
                        <button
                          key={`thumb-pos-${index}`}
                          type="button"
                          onClick={() => jumpToThumbnailPosition(pos.time)}
                          className={`text-xs px-2 py-1 rounded ${
                            Math.abs(thumbnailTime - pos.time) < 1
                              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Thumbnail Preview */}
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thumbnail Preview</h4>
                    <div className="aspect-video w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                      {thumbnailGenerated ? (
                        <img
                          src={thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : ''}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiCameraOff className="text-gray-400 w-12 h-12" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Game Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Game <span className="text-red-500">*</span>
            </label>
            <select
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select a game</option>
              {videoEnabledApps.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title & Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter a descriptive title for your video"
              required
              maxLength={100}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
              {title.length}/100
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Describe your gameplay video"
              rows={3}
              maxLength={500}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
              {description.length}/500
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags <span className="text-xs text-gray-500 dark:text-gray-400">(max 5)</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                ref={tagInputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-white"
                placeholder="Add tags (e.g., gameplay, tips, walkthrough)"
                disabled={tags.length >= 5}
                maxLength={20}
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= 5}
                className="bg-primary-500 text-white p-2 rounded-r-md hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FiTag className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-1">
              Press Enter to add a tag
            </p>

            {/* Suggested tags section */}
            {suggestedTags.length > 0 && tags.length < 5 && (
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Suggested tags:</span>
                  {suggestedTags.length > 1 && (
                    <button
                      type="button"
                      onClick={addAllSuggestedTags}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                    >
                      <FiPlus className="w-3 h-3 mr-1" /> Add all
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {suggestedTags
                    .filter(tag => !tags.includes(tag))
                    .map(tag => (
                      <button
                        key={`suggestion-${tag}`}
                        type="button"
                        onClick={() => addSuggestedTag(tag)}
                        disabled={tags.length >= 5}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {tag}
                      </button>
                    ))
                  }
                </div>
              </div>
            )}
          </div>

          {/* Visibility Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Visibility
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={() => setVisibility('public')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Public</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="unlisted"
                  checked={visibility === 'unlisted'}
                  onChange={() => setVisibility('unlisted')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Unlisted</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {visibility === 'public'
                ? 'Public videos appear in search results and can be viewed by anyone.'
                : 'Unlisted videos can only be viewed by people who have the link.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-md flex items-center">
              <FiAlertCircle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  {isEditing ? 'Save Changes' : 'Upload Video'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadForm;
