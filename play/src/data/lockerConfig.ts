import type { GameResource } from "../types/games";

// Interface for locker configuration
export interface LockerConfig {
  // Instead of having multiple campaign IDs, we'll use a single campaign ID
  // and dynamically handle the redirect
  redirectUrl: string;
}

// AdBlueMedia configuration interface
export interface AdBlueMediaConfig {
  variable: string;  // Variable name like "nUtRu_QzT_cplrFc"
  it: number;        // The "it" value
  key: string;       // The "key" value
  scriptSrc: string; // Script source URL
  functionName: string; // Function name like "_iH", "_VR", etc.
}

// AdBlueMedia configurations per game
// Each game can have its own unique locker configuration
export const GAME_ADBLUE_CONFIGS: Record<string, AdBlueMediaConfig> = {
  // Example configuration for first game
  "gta-san-andreas": {
    variable: "nUtRu_QzT_cplrFc",
    it: 4503226,
    key: "bbe8f",
    scriptSrc: "https://dfmpe7igjx4jo.cloudfront.net/420ad58.js",
    functionName: "_iH"
  },

  // Example configuration for second game
  "fifa-24": {
    variable: "nCsyH_pTk_eiPFic",
    it: 4507559,
    key: "6407a",
    scriptSrc: "https://dfmpe7igjx4jo.cloudfront.net/965d84f.js",
    functionName: "_VR"
  },

  // Add more games here with their specific configurations
  // "clash-of-clans": {
  //   variable: "nXXX_XXX_XXXXX",
  //   it: 1234567,
  //   key: "xxxxx",
  //   scriptSrc: "https://dfmpe7igjx4jo.cloudfront.net/xxxxxx.js",
  //   functionName: "_ABC"
  // },
};

// Default configuration (fallback)
const DEFAULT_CONFIG: AdBlueMediaConfig = {
  variable: "nUtRu_QzT_cplrFc",
  it: 4503226,
  key: "bbe8f",
  scriptSrc: "https://dfmpe7igjx4jo.cloudfront.net/420ad58.js",
  functionName: "_iH"
};

// Helper function to get AdBlueMedia config for a specific game
export function getAdBlueMediaConfig(gameId: string): AdBlueMediaConfig {
  return GAME_ADBLUE_CONFIGS[gameId] || DEFAULT_CONFIG;
}

// Helper function to get campaign ID for a specific game (legacy)
export function getCampaignId(gameId: string): string {
  const config = getAdBlueMediaConfig(gameId);
  return config.key; // Using key as campaign ID for backward compatibility
}

// Legacy export for backward compatibility
export const ADBLUE_CAMPAIGN_ID = DEFAULT_CONFIG.key;

// Map game IDs to their download URLs
// This allows us to use a single locker but have different download URLs per game
// Using official store URLs and reliable APK sources
export const DOWNLOAD_URLS: Record<string, string> = {
  "clash-of-clans": "https://play.google.com/store/apps/details?id=com.supercell.clashofclans",
  "free-fire": "https://play.google.com/store/apps/details?id=com.dts.freefireth",
  "clash-royale": "https://play.google.com/store/apps/details?id=com.supercell.clashroyale",
  "candy-crush": "https://play.google.com/store/apps/details?id=com.king.candycrushsaga",
  "pubg-mobile": "https://play.google.com/store/apps/details?id=com.tencent.ig",
  "pokemon-go": "https://play.google.com/store/apps/details?id=com.nianticlabs.pokemongo",
  "subway-surfers": "https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf",
  "genshin-impact": "https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact",
  "roblox": "https://play.google.com/store/apps/details?id=com.roblox.client",
  "among-us": "https://play.google.com/store/apps/details?id=com.innersloth.spacemafia",
  "minecraft": "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
  "baseball-9": "https://play.google.com/store/apps/details?id=com.playus.baseball9"
};

// Helper function to get the download URL for a specific game
export function getDownloadUrl(gameId: string): string {
  return DOWNLOAD_URLS[gameId] || "";
}

// Helper function to get the redirect URL for use with AdBlueMedia locker
// This creates a URL with 'gameId' as a query parameter so we can extract it
// in our redirect handler
export function getRedirectUrl(gameId: string): string {
  // Determine if we're in development or production
  const isProduction = window.location.hostname !== 'localhost';

  if (isProduction) {
    // For production deployment
    return `https://playvault.com/download-handler?game=${encodeURIComponent(gameId)}`;
  }
  // For local development
  return `/download-handler?gameId=${encodeURIComponent(gameId)}`;
}

// Helper function to get locker configuration for a game
export function getLockerConfigForGame(game: GameResource): LockerConfig {
  return {
    redirectUrl: getRedirectUrl(game.id)
  };
}

// To set up AdBlueMedia with your campaign:
// 1. Sign up with AdBlueMedia and create a campaign
// 2. Get your campaign ID and replace the ADBLUE_CAMPAIGN_ID above
// 3. Configure the campaign settings in AdBlueMedia dashboard:
//    - Set allowback to true to let users return to your site
//    - Set the callback URL to your domain to receive completion events
//    - Enable events for better tracking and user experience
