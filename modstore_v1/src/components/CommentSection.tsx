import type React from 'react';
import { useState, useEffect } from 'react';
import { FiMessageSquare, FiUser, FiSend, FiThumbsUp, FiFlag, FiTrash, FiClock } from 'react-icons/fi';

// Define comment type
export interface Comment {
  id: string;
  videoId: string;
  userId: string; // For demo, this will be a random ID or 'user'
  username: string; // For demo, we'll use 'You' for the current user or random names
  content: string;
  timestamp: string; // ISO date string
  likes: number;
  isUserComment: boolean; // To identify the current user's comments
}

interface CommentSectionProps {
  videoId: string;
  gameName: string;
  onCommentAdded?: (comment: Comment) => void;
}

// Local storage key for comments
const COMMENTS_STORAGE_KEY = 'modstore_video_comments';

// Generate random username for demo purposes
const getRandomUsername = (): string => {
  const names = [
    'GamerPro', 'ModMaster', 'AppHunter',
    'TechGuru', 'GameWizard', 'PixelNinja',
    'AppSlayer', 'ModdedGamer', 'TikTokGamer',
    'MobileModder', 'GameChamp'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Format relative time (e.g., "2 minutes ago", "1 hour ago", etc.)
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const CommentSection: React.FC<CommentSectionProps> = ({ videoId, gameName, onCommentAdded }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'liked'>('newest');

  // Load comments from localStorage
  useEffect(() => {
    try {
      const storedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
      if (storedComments) {
        const allComments: Comment[] = JSON.parse(storedComments);
        // Filter comments for this video
        const videoComments = allComments.filter(comment => comment.videoId === videoId);
        setComments(videoComments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }, [videoId]);

  // Save comments to localStorage whenever they change
  const saveComments = (updatedComments: Comment[]) => {
    try {
      // Get all existing comments
      const storedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
      let allComments: Comment[] = [];

      if (storedComments) {
        allComments = JSON.parse(storedComments);
        // Remove comments for this video
        allComments = allComments.filter(comment => comment.videoId !== videoId);
      }

      // Add updated comments for this video
      allComments = [...allComments, ...updatedComments];

      // Save back to localStorage
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Create new comment object
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      videoId,
      userId: 'current-user',
      username: 'You',
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      isUserComment: true
    };

    // Add to state
    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);

    // Save to localStorage
    saveComments(updatedComments);

    // Call callback if provided
    if (onCommentAdded) {
      onCommentAdded(newCommentObj);
    }

    // Reset form
    setNewComment('');
    setIsSubmitting(false);
  };

  // Handle liking a comment
  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });

    setComments(updatedComments);
    saveComments(updatedComments);
  };

  // Handle deleting a comment (only user's own comments)
  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    saveComments(updatedComments);
  };

  // Sort comments based on selected sort method
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else {
      // sort by likes
      return b.likes - a.likes;
    }
  });

  // Generate sample comments if none exist (for demo purposes)
  useEffect(() => {
    if (comments.length === 0) {
      const sampleComments: Comment[] = [
        {
          id: `sample-${videoId}-1`,
          videoId,
          userId: 'sample-user-1',
          username: getRandomUsername(),
          content: `Great gameplay on ${gameName}! I love how you handled that situation at 0:45.`,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          likes: Math.floor(Math.random() * 10) + 1,
          isUserComment: false
        },
        {
          id: `sample-${videoId}-2`,
          videoId,
          userId: 'sample-user-2',
          username: getRandomUsername(),
          content: `Is this mod version better than the official release? I've been trying to decide which one to download.`,
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          likes: Math.floor(Math.random() * 5),
          isUserComment: false
        },
        {
          id: `sample-${videoId}-3`,
          videoId,
          userId: 'sample-user-3',
          username: getRandomUsername(),
          content: `Just downloaded this mod after watching your video. Works perfectly!`,
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
          likes: Math.floor(Math.random() * 8) + 2,
          isUserComment: false
        }
      ];

      setComments(sampleComments);
      saveComments(sampleComments);
    }
  }, [comments.length, videoId, gameName]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center dark:text-white">
          <FiMessageSquare className="mr-2" />
          Comments ({comments.length})
        </h3>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'liked')}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="liked">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Add a comment */}
      <div className="mb-6">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
            <FiUser />
          </div>
          <div className="ml-3 flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              rows={2}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {newComment.length}/500 characters
              </span>
              <button
                onClick={handleAddComment}
                disabled={isSubmitting || !newComment.trim()}
                className="flex items-center px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="mr-1" /> Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => (
            <div key={comment.id} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 flex items-center justify-center flex-shrink-0">
                <FiUser />
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <span className="font-medium dark:text-white">{comment.username}</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <FiClock className="mr-1" /> {formatRelativeTime(comment.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                <div className="flex text-sm items-center">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mr-4"
                  >
                    <FiThumbsUp className="mr-1" /> {comment.likes > 0 ? comment.likes : ''}
                  </button>
                  {comment.isUserComment ? (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <FiTrash className="mr-1" /> Delete
                    </button>
                  ) : (
                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <FiFlag className="mr-1" /> Report
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
