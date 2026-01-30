// Type definitions
export interface VideoItem {
  id: string;
  gameId: string;
  gameName: string;
  title: string;
  description: string;
  path: string;
  thumbnail: string;
  duration?: string;
  uploadDate?: string;
  tags?: string[];
  visibility?: 'public' | 'unlisted';
}

// Map to translate app IDs to folder names
export const appIdToFolderMap: Record<string, string> = {
  'pubg-mobile-mod': 'pubg',
  'baseball9-unlimited': 'baseball9',
  'cod-mobile-mod': 'cod',
  'minecraft-pe-mod': 'minecraft',
  'asphalt9-legends-mod': 'asphalt9',
  'subway-surfers-mod': 'subwaysurfers',
  'brawl-stars-mod': 'brawlstars',
  'genshin-impact-mod': 'genshinimpact',
  'honkai-star-rail-mod': 'honkaistarrail'
};

// Map to translate folder names back to app IDs
export const folderToAppIdMap: Record<string, string> = {
  'pubg': 'pubg-mobile-mod',
  'baseball9': 'baseball9-unlimited',
  'cod': 'cod-mobile-mod',
  'minecraft': 'minecraft-pe-mod',
  'asphalt9': 'asphalt9-legends-mod',
  'subwaysurfers': 'subway-surfers-mod',
  'brawlstars': 'brawl-stars-mod',
  'genshinimpact': 'genshin-impact-mod',
  'honkaistarrail': 'honkai-star-rail-mod'
};

// Function to get folder name from app ID
export const getFolderName = (appId: string): string => {
  return appIdToFolderMap[appId] || '';
};

// Function to get app ID from folder name
export const getAppId = (folderName: string): string => {
  return folderToAppIdMap[folderName] || '';
};

// Function to get videos for a game
export const getGameVideos = (gameId: string, gameTitle: string): VideoItem[] => {
  const folderName = getFolderName(gameId);
  if (!folderName) return [];

  // Use actual video data now that we have samples
  return [
    {
      id: `${folderName}-1`,
      gameId,
      gameName: gameTitle,
      title: `${gameTitle} - Enhanced Gameplay`,
      description: `See the enhanced features and premium unlocks in ${gameTitle}. This video showcases the modded experience you can enjoy with our version.`,
      path: `/videos/games/${folderName}/${folderName}1.mp4`,
      thumbnail: `/images/${folderName}/${folderName}1.jpg`,
      duration: '0:42',
      uploadDate: '2025-04-20',
      tags: ['enhanced', 'gameplay', 'premium'],
      visibility: 'public'
    },
    {
      id: `${folderName}-2`,
      gameId,
      gameName: gameTitle,
      title: `${gameTitle} - Premium Features`,
      description: `Explore all premium features unlocked in our modded version of ${gameTitle}. Enjoy unlimited resources and full access to all content.`,
      path: `/videos/games/${folderName}/${folderName}2.mp4`,
      thumbnail: `/images/${folderName}/${folderName}2.jpg`,
      duration: '0:36',
      uploadDate: '2025-04-18',
      tags: ['premium', 'features', 'modded'],
      visibility: 'unlisted'
    },
    {
      id: `${folderName}-3`,
      gameId,
      gameName: gameTitle,
      title: `${gameTitle} - Secret Tricks`,
      description: `Discover secret tricks and tips for ${gameTitle}. Learn how to maximize your experience with our mod.`,
      path: `/videos/games/${folderName}/${folderName}3.mp4`,
      thumbnail: `/images/${folderName}/${folderName}3.jpg`,
      duration: '0:55',
      uploadDate: '2025-04-15',
      tags: ['secret', 'tricks', 'tips'],
      visibility: 'public'
    }
  ];
};

// Function to get all game videos
export const getAllGameVideos = (): VideoItem[] => {
  const games = [
    { id: 'pubg-mobile-mod', name: 'PUBG Mobile Hack' },
    { id: 'baseball9-unlimited', name: 'Baseball 9 Unlimited' },
    { id: 'cod-mobile-mod', name: 'Call of Duty Mobile Mod' },
    { id: 'minecraft-pe-mod', name: 'Minecraft PE Ultimate' },
    { id: 'asphalt9-legends-mod', name: 'Asphalt 9 Legends Mod' },
    { id: 'subway-surfers-mod', name: 'Subway Surfers Unlimited' },
    { id: 'brawl-stars-mod', name: 'Brawl Stars Unlimited' },
    { id: 'genshin-impact-mod', name: 'Genshin Impact Ultimate' },
    { id: 'honkai-star-rail-mod', name: 'Honkai Star Rail Infinity' }
  ];

  return games.flatMap(game => getGameVideos(game.id, game.name));
};

// Function to check if a video exists
export const doesVideoExist = (videoPath: string): boolean => {
  // This would be replaced with an actual check in a real app
  // For now, assume all videos in our mock data exist
  return true;
};

// Function to format video duration
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Function to generate placeholder videos for a game
export const generatePlaceholderVideos = (gameId: string, gameName: string): VideoItem[] => {
  const folderName = getFolderName(gameId);
  if (!folderName) return [];

  return Array.from({ length: 3 }).map((_, index) => ({
    id: `${folderName}-${index + 1}`,
    gameId,
    gameName,
    title: `${gameName} Video ${index + 1}`,
    description: `Gameplay video for ${gameName}`,
    path: `/videos/games/${folderName}/${folderName}${index + 1}.mp4`,
    thumbnail: `/images/${folderName}/${folderName}${(index % 3) + 1}.jpg`,
    duration: formatDuration(Math.floor(Math.random() * (120 - 30 + 1) + 30)), // 30-120 seconds
    uploadDate: new Date().toISOString().split('T')[0],
    tags: ['placeholder', 'gameplay'],
    visibility: 'unlisted'
  }));
};

// Fix path for Baseball 9 videos and handle new mobile games
export const fixVideoPath = (path: string): string => {
  // Special handling for Baseball 9 which has underscore in filename
  if (path.includes('/baseball9/baseball9')) {
    return path.replace('baseball9.mp4', 'baseball9_1.mp4')
      .replace('baseball92.mp4', 'baseball9_2.mp4')
      .replace('baseball93.mp4', 'baseball9_3.mp4');
  }

  // New mobile games may not have actual video files, so we'll return placeholder videos
  if (path.includes('/subwaysurfers/') || path.includes('/brawlstars/') ||
      path.includes('/genshinimpact/') || path.includes('/honkaistarrail/')) {
    // Redirect to a sample video we know exists
    const placeholderVideo = path.includes('1.mp4') ?
      '/videos/games/pubg/pubg1.mp4' : path.includes('2.mp4') ?
      '/videos/games/pubg/pubg2.mp4' : '/videos/games/pubg/pubg3.mp4';
    return placeholderVideo;
  }

  return path;
};
