/**
 * Analytics utility for tracking user interactions in ModStore
 *
 * This provides a simple interface for tracking events that can be connected
 * to various analytics providers (Google Analytics, Plausible, etc.)
 */

export type EventCategory =
  | 'app_view'
  | 'app_download'
  | 'video_interaction'
  | 'wishlist'
  | 'search'
  | 'navigation';

export interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
}

// Check if we're in development mode
const isDevelopment = () => {
  return import.meta.env.DEV || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
};

/**
 * Track an event in the analytics system
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  // In production, this would send to your actual analytics provider
  // For now, we'll just log to console in development
  if (isDevelopment()) {
    console.log('[Analytics]', event);
  }

  // Example integration with Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const { category, action, label, value, properties } = event;
    // Type safety for window.gtag
    type GtagFunction = (command: string, action: string, params: object) => void;
    const gtag = (window as unknown as { gtag: GtagFunction }).gtag;
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...properties
    });
  }
};

/**
 * Video analytics specific functions
 */
export const videoAnalytics = {
  trackPlay: (videoId: string, videoTitle: string, gameId: string) => {
    trackEvent({
      category: 'video_interaction',
      action: 'play',
      label: videoTitle,
      properties: { videoId, gameId }
    });
  },

  trackPause: (videoId: string, videoTitle: string, gameId: string, currentTime: number) => {
    trackEvent({
      category: 'video_interaction',
      action: 'pause',
      label: videoTitle,
      value: Math.floor(currentTime),
      properties: { videoId, gameId, currentTime }
    });
  },

  trackComplete: (videoId: string, videoTitle: string, gameId: string) => {
    trackEvent({
      category: 'video_interaction',
      action: 'complete',
      label: videoTitle,
      properties: { videoId, gameId }
    });
  },

  trackShare: (videoId: string, videoTitle: string, gameId: string, platform: string) => {
    trackEvent({
      category: 'video_interaction',
      action: 'share',
      label: platform,
      properties: { videoId, videoTitle, gameId, platform }
    });
  },

  trackDownload: (videoId: string, videoTitle: string, gameId: string) => {
    trackEvent({
      category: 'video_interaction',
      action: 'download',
      label: videoTitle,
      properties: { videoId, gameId }
    });
  }
};

/**
 * App analytics specific functions
 */
export const appAnalytics = {
  trackView: (appId: string, appName: string) => {
    trackEvent({
      category: 'app_view',
      action: 'view',
      label: appName,
      properties: { appId }
    });
  },

  trackDownload: (appId: string, appName: string, server: string) => {
    trackEvent({
      category: 'app_download',
      action: 'download',
      label: appName,
      properties: { appId, server }
    });
  },

  trackWishlist: (appId: string, appName: string, action: 'add' | 'remove') => {
    trackEvent({
      category: 'wishlist',
      action,
      label: appName,
      properties: { appId }
    });
  }
};

/**
 * Initialize analytics
 */
export const initAnalytics = (): void => {
  // In a real app, you would initialize your analytics provider here
  // For example, Google Analytics or Plausible

  if (isDevelopment()) {
    console.log('[Analytics] Initialized in development mode');
  }
};

export default {
  trackEvent,
  videoAnalytics,
  appAnalytics,
  initAnalytics
};
