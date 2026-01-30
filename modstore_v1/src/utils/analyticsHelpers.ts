// Analytics Helper Functions
// These functions would typically send data to a real analytics service
// For this demo, they just log to console and track local metrics

type VideoData = {
  videoId: string;
  videoTitle: string;
  gameId: string;
  gameName: string;
  duration?: string;
  currentTime?: number;
  totalDuration?: number;
  percentageWatched?: number;
  shareMethod?: string;
  commentId?: string;
  commentText?: string;
};

// In-memory analytics storage (for demo purposes)
const analyticsStore = {
  videoViews: {} as Record<string, number>,
  videoCompletions: {} as Record<string, number>,
  videoLikes: {} as Record<string, number>,
  videoShares: {} as Record<string, number>,
  videoDownloads: {} as Record<string, number>,
  videoComments: {} as Record<string, number>,
  commentLikes: {} as Record<string, number>,
  videoEngagement: {} as Record<string, {clicks: number, watchTime: number, completion: number, comments: number}>,
  sessionStart: Date.now(),
};

// Track when a user views a video
export const trackVideoView = (data: VideoData) => {
  console.log('Video View Tracked:', data);

  // Update video views count
  analyticsStore.videoViews[data.videoId] = (analyticsStore.videoViews[data.videoId] || 0) + 1;

  // Initialize engagement metrics if needed
  if (!analyticsStore.videoEngagement[data.videoId]) {
    analyticsStore.videoEngagement[data.videoId] = {
      clicks: 0,
      watchTime: 0,
      completion: 0,
      comments: 0
    };
  }

  // Log to console with timestamp
  console.log(`[${new Date().toISOString()}] Video view: ${data.videoTitle}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_view', {...data});
};

// Track when a user clicks on a video thumbnail
export const trackVideoThumbnailClick = (data: VideoData) => {
  console.log('Video Thumbnail Click Tracked:', data);

  // Update engagement metrics
  if (!analyticsStore.videoEngagement[data.videoId]) {
    analyticsStore.videoEngagement[data.videoId] = {
      clicks: 0,
      watchTime: 0,
      completion: 0,
      comments: 0
    };
  }

  analyticsStore.videoEngagement[data.videoId].clicks += 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Thumbnail click: ${data.videoTitle}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_thumbnail_click', {...data});
};

// Track when a video starts playing
export const trackVideoPlay = (data: VideoData) => {
  console.log('Video Play Tracked:', data);

  // Log to console
  console.log(`[${new Date().toISOString()}] Video play: ${data.videoTitle}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_play', {...data});
};

// Track when a video is paused
export const trackVideoPause = (data: VideoData) => {
  console.log('Video Pause Tracked:', data);

  // Update engagement metrics - track watch time
  if (data.currentTime && data.totalDuration) {
    if (!analyticsStore.videoEngagement[data.videoId]) {
      analyticsStore.videoEngagement[data.videoId] = {
        clicks: 0,
        watchTime: 0,
        completion: 0,
        comments: 0
      };
    }

    analyticsStore.videoEngagement[data.videoId].watchTime += data.currentTime;
  }

  // Log to console
  console.log(`[${new Date().toISOString()}] Video pause: ${data.videoTitle} at ${data.currentTime}s (${data.percentageWatched}%)`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_pause', {...data});
};

// Track when a video finishes playing
export const trackVideoFinish = (data: VideoData) => {
  console.log('Video Finish Tracked:', data);

  // Update video completions count
  analyticsStore.videoCompletions[data.videoId] = (analyticsStore.videoCompletions[data.videoId] || 0) + 1;

  // Update engagement metrics
  if (!analyticsStore.videoEngagement[data.videoId]) {
    analyticsStore.videoEngagement[data.videoId] = {
      clicks: 0,
      watchTime: 0,
      completion: 0,
      comments: 0
    };
  }

  analyticsStore.videoEngagement[data.videoId].completion += 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Video finish: ${data.videoTitle}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_finish', {...data});
};

// Track when a video is shared
export const trackVideoShare = (data: VideoData) => {
  console.log('Video Share Tracked:', data);

  // Update video shares count
  analyticsStore.videoShares[data.videoId] = (analyticsStore.videoShares[data.videoId] || 0) + 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Video share: ${data.videoTitle} via ${data.shareMethod}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_share', {...data, share_method: data.shareMethod});
};

// Track when a video is downloaded
export const trackVideoDownload = (data: VideoData) => {
  console.log('Video Download Tracked:', data);

  // Update video downloads count
  analyticsStore.videoDownloads[data.videoId] = (analyticsStore.videoDownloads[data.videoId] || 0) + 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Video download: ${data.videoTitle}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_download', {...data});
};

// Track when a video is liked
export const trackVideoLike = (data: VideoData) => {
  console.log('Video Like Tracked:', data);

  // Update video likes count
  analyticsStore.videoLikes[data.videoId] = (analyticsStore.videoLikes[data.videoId] || 0) + 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Video like: ${data.videoTitle}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_like', {...data});
};

// Track when a comment is added
export const trackCommentAdd = (data: VideoData) => {
  console.log('Comment Add Tracked:', data);

  // Update video comments count
  analyticsStore.videoComments[data.videoId] = (analyticsStore.videoComments[data.videoId] || 0) + 1;

  // Update engagement metrics
  if (!analyticsStore.videoEngagement[data.videoId]) {
    analyticsStore.videoEngagement[data.videoId] = {
      clicks: 0,
      watchTime: 0,
      completion: 0,
      comments: 0
    };
  }

  analyticsStore.videoEngagement[data.videoId].comments += 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Comment added: ${data.videoTitle} - "${data.commentText?.substring(0, 30)}${data.commentText && data.commentText.length > 30 ? '...' : ''}"`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_comment_add', {...data});
};

// Track when a comment is liked
export const trackCommentLike = (data: VideoData) => {
  if (!data.commentId) return;

  console.log('Comment Like Tracked:', data);

  // Update comment likes count
  analyticsStore.commentLikes[data.commentId] = (analyticsStore.commentLikes[data.commentId] || 0) + 1;

  // Log to console
  console.log(`[${new Date().toISOString()}] Comment like: ${data.videoTitle} - Comment ID: ${data.commentId}`);

  // In a real implementation, this would send data to an analytics service
  // analytics.logEvent('video_comment_like', {...data});
};

// Get video stats for a specific video
export const getVideoStats = (videoId: string) => {
  return {
    views: analyticsStore.videoViews[videoId] || 0,
    completions: analyticsStore.videoCompletions[videoId] || 0,
    likes: analyticsStore.videoLikes[videoId] || 0,
    shares: analyticsStore.videoShares[videoId] || 0,
    downloads: analyticsStore.videoDownloads[videoId] || 0,
    comments: analyticsStore.videoComments[videoId] || 0,
    engagement: analyticsStore.videoEngagement[videoId] || {
      clicks: 0,
      watchTime: 0,
      completion: 0,
      comments: 0
    }
  };
};

// Format view count for display (e.g. 1.2K, 3.5M)
export const formatViewCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }

  return `${(count / 1000000).toFixed(1)}M`;
};

// Calculate and return total platform metrics
export const getPlatformStats = () => {
  // Calculate total views
  const totalViews = Object.values(analyticsStore.videoViews).reduce((sum, views) => sum + views, 0);

  // Calculate total completions
  const totalCompletions = Object.values(analyticsStore.videoCompletions).reduce((sum, completions) => sum + completions, 0);

  // Calculate total shares
  const totalShares = Object.values(analyticsStore.videoShares).reduce((sum, shares) => sum + shares, 0);

  // Calculate total downloads
  const totalDownloads = Object.values(analyticsStore.videoDownloads).reduce((sum, downloads) => sum + downloads, 0);

  // Calculate total comments
  const totalComments = Object.values(analyticsStore.videoComments).reduce((sum, comments) => sum + comments, 0);

  // Calculate completion rate
  const completionRate = totalViews > 0 ? (totalCompletions / totalViews) * 100 : 0;

  // Calculate total session time
  const sessionTimeMinutes = (Date.now() - analyticsStore.sessionStart) / (1000 * 60);

  return {
    totalViews,
    totalCompletions,
    totalShares,
    totalDownloads,
    totalComments,
    completionRate: `${completionRate.toFixed(1)}%`,
    sessionTimeMinutes: Math.round(sessionTimeMinutes)
  };
};

// Get the 5 most viewed videos
export const getTopVideos = (limit = 5) => {
  // Create array of [videoId, viewCount] pairs
  const viewCountPairs = Object.entries(analyticsStore.videoViews);

  // Sort by view count (descending)
  viewCountPairs.sort((a, b) => b[1] - a[1]);

  // Take the top 'limit' items
  return viewCountPairs.slice(0, limit).map(([videoId, views]) => ({
    videoId,
    views,
    likes: analyticsStore.videoLikes[videoId] || 0,
    completions: analyticsStore.videoCompletions[videoId] || 0,
    engagement: analyticsStore.videoEngagement[videoId] || { clicks: 0, watchTime: 0, completion: 0, comments: 0 }
  }));
};

// Reset analytics data (for demo purposes)
export const resetAnalytics = () => {
  Object.keys(analyticsStore).forEach(key => {
    if (typeof analyticsStore[key as keyof typeof analyticsStore] === 'object') {
      analyticsStore[key as keyof typeof analyticsStore] = {} as any;
    }
  });

  analyticsStore.sessionStart = Date.now();

  console.log('[Analytics] Data reset');
};
