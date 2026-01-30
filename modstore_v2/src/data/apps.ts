import spotifyIcon from '../assets/icons/spotify.png';
import netflixIcon from '../assets/icons/netflix.png';
import youtubeIcon from '../assets/icons/youtube.png';
import instagramIcon from '../assets/icons/instagram.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import minecraftIcon from '../assets/icons/minecraft.png';
import canvaIcon from '../assets/icons/canva.png';
import pubgIcon from '../assets/icons/pubg.png';
import baseball9Icon from '../assets/icons/baseball9.png';
import snaptubeIcon from '../assets/icons/snaptube.png';
import codIcon from '../assets/icons/cod.png';
import asphalt9Icon from '../assets/icons/asphalt9.png';
import subwaySurfersIcon from '../assets/icons/subwaysurfers.png';
import brawlStarsIcon from '../assets/icons/brawlstars.png';
import genshinImpactIcon from '../assets/icons/genshinimpact.png';
import honkaiStarRailIcon from '../assets/icons/honkaistarrail.png';

export interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  version: string;
  size: string;
  developer: string;
  category: string;
  subcategory?: string;
  features: string[];
  screenshots: string[];
  downloads: number;
  rating: number;
  reviews: Review[];
  downloadLinks?: DownloadLink[];
  verified?: boolean;
  lastUpdated?: string;
  changeLog?: string[];
  modType?: ModType[];
  safetyRating?: number;
  requirements?: string;
  workingOn?: string[];
}

export enum ModType {
  PREMIUM_UNLOCKED = "Premium Unlocked",
  UNLIMITED_MONEY = "Unlimited Money",
  AD_FREE = "Ad-Free",
  UNLIMITED_GEMS = "Unlimited Gems",
  GOD_MODE = "God Mode",
  HIGH_DAMAGE = "High Damage",
  UNLOCKED_LEVELS = "Unlocked Levels",
  CUSTOM_SKINS = "Custom Skins",
  SPEED_HACK = "Speed Hack",
  NO_VERIFICATION = "No Verification Required"
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DownloadLink {
  name: string;
  url: string;
  server: string;
  speed: string;
}

export const MODDED_APPS: App[] = [
  {
    id: 'spotify-premium',
    name: 'Spotify Premium Mod',
    icon: spotifyIcon,
    description: 'Enjoy Spotify Premium features without a subscription. No ads, unlimited skips, high quality audio, and more!',
    longDescription: 'This modded version of Spotify gives you premium features without requiring a paid subscription. Enjoy ad-free music streaming, unlimited skips, on-demand playback, extreme audio quality, and offline downloads. Stay in control of your music experience with this enhanced version.',
    version: '9.0.30.242',
    size: '45 MB',
    developer: 'ModdedStore Team',
    category: 'Music',
    subcategory: 'Streaming',
    features: [
      'Ad-free listening experience',
      'Unlimited skips',
      'High-quality audio',
      'Download for offline listening',
      'No premium subscription needed',
      'Background play',
      'Custom equalizer settings'
    ],
    screenshots: [
      '/images/spotify/spotify1.jpg',
      '/images/spotify/spotify2.jpg',
      '/images/spotify/spotify3.jpg'
    ],
    downloads: 547829,
    rating: 4.8,
    reviews: [
      {
        id: 'sp-r1',
        name: 'Music Lover',
        rating: 5,
        comment: 'Works perfectly! No more ads and I can skip tracks whenever I want.',
        date: '2025-03-15'
      },
      {
        id: 'sp-r2',
        name: 'Alex Johnson',
        rating: 4,
        comment: 'Great mod, but sometimes crashes when downloading too many songs at once.',
        date: '2025-02-28'
      }
    ],
    downloadLinks: [
      {
        name: 'Main Server',
        url: 'https://spdn.poumod.com/Spotify-Premium-9.0.30.242.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Spotify/Spotify-Premium-9.0.30.242.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-01',
    changeLog: [
      'Updated to the latest Spotify base version',
      'Fixed login issues on some devices',
      'Improved ad-blocking algorithm',
      'Fixed crashing on Android 14'
    ],
    modType: [ModType.PREMIUM_UNLOCKED, ModType.AD_FREE],
    safetyRating: 5,
    requirements: 'Android 8.0+',
    workingOn: ['Samsung', 'Pixel', 'OnePlus', 'Xiaomi']
  },
  {
    id: 'netflix-premium',
    name: 'Netflix Premium Mod',
    icon: netflixIcon,
    description: 'Watch Netflix content in HD/UHD quality without subscription fees. Unlock all premium features!',
    longDescription: 'This modded version of Netflix allows users to access premium content without a paid subscription. Enjoy HD and UHD streaming quality, download movies and series for offline viewing, and access region-locked content. The mod removes subscription verification and provides an ad-free experience.',
    version: '8.73.0',
    size: '58 MB',
    developer: 'ModdedStore Team',
    category: 'Entertainment',
    subcategory: 'Streaming',
    features: [
      'Full access to Netflix content library',
      'HD/UHD streaming quality',
      'Download content for offline viewing',
      'No subscription required',
      'Region-lock bypass',
      'Ad-free experience',
      'Multiple profiles support'
    ],
    screenshots: [
      '/images/netflix/netflix1.jpg',
      '/images/netflix/netflix2.jpg',
      '/images/netflix/netflix3.jpg'
    ],
    downloads: 842156,
    rating: 4.7,
    reviews: [
      {
        id: 'nf-r1',
        name: 'StreamingKing',
        rating: 5,
        comment: 'Amazing! I can watch everything in 4K now without paying for the premium plan!',
        date: '2025-04-02'
      },
      {
        id: 'nf-r2',
        name: 'Sarah Smith',
        rating: 4,
        comment: 'Works great, but some very new releases still show as premium only.',
        date: '2025-03-21'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/Netflix-Premium-8.73.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Netflix/Netflix-Premium-8.73.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-03-28',
    changeLog: [
      'Updated to latest Netflix base version',
      'Added support for Dolby Atmos audio',
      'Fixed crashing on startup for some devices',
      'Improved HDR support'
    ],
    modType: [ModType.PREMIUM_UNLOCKED, ModType.NO_VERIFICATION],
    safetyRating: 4,
    requirements: 'Android 9.0+',
    workingOn: ['Samsung', 'Pixel', 'OnePlus', 'Xiaomi', 'Oppo']
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium Mod',
    icon: youtubeIcon,
    description: 'Enjoy YouTube without ads, background play, and download videos directly. No premium subscription needed!',
    longDescription: 'This modded version of YouTube provides all the premium features without requiring a premium subscription. Enjoy ad-free video watching, background playback when your screen is off, picture-in-picture mode, and the ability to download videos directly within the app. The mod also includes enhanced video quality options and additional customization features.',
    version: '18.36.45',
    size: '52 MB',
    developer: 'ModdedStore Team',
    category: 'Entertainment',
    features: [
      'Ad-free video watching',
      'Background playback',
      'Video downloads',
      'Picture-in-picture mode',
      'HD/4K quality selection',
      'No premium subscription needed',
      'Enhanced UI customization'
    ],
    screenshots: [
      '/images/youtube/youtube1.jpg',
      '/images/youtube/youtube2.jpg',
      '/images/youtube/youtube3.jpg'
    ],
    downloads: 1245790,
    rating: 4.9,
    reviews: [
      {
        id: 'yt-r1',
        name: 'Tech Enthusiast',
        rating: 5,
        comment: 'Finally no more ads! Background play works flawlessly even with screen off.',
        date: '2025-04-10'
      },
      {
        id: 'yt-r2',
        name: 'Video Creator',
        rating: 5,
        comment: 'The download feature is amazing! I can watch tutorials offline anytime.',
        date: '2025-03-30'
      }
    ],
    downloadLinks: [
      {
        name: 'Fast Server',
        url: 'https://spdn.poumod.com/YouTube-Premium-18.36.45.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/YouTube/YouTube-Premium-18.36.45.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ]
  },
  {
    id: 'instagram-pro',
    name: 'Instagram Pro',
    icon: instagramIcon,
    description: 'Enhanced Instagram with photo/video downloads, story viewing without notification, and ad blocking.',
    longDescription: 'This modded version of Instagram adds powerful features not available in the official app. Download any photos and videos with a simple tap, view stories anonymously without the poster knowing, hide your online status, and enjoy an ad-free experience. The mod also includes enhanced image upload quality, custom themes, and privacy features.',
    version: '290.0.0.16',
    size: '38 MB',
    developer: 'ModdedStore Team',
    category: 'Social',
    features: [
      'Download photos and videos',
      'View stories anonymously',
      'Hidden online status',
      'Ad-free experience',
      'Enhanced upload quality',
      'Custom themes',
      'Privacy features'
    ],
    screenshots: [
      '/images/instagram/instagram1.jpg',
      '/images/instagram/instagram2.jpg',
      '/images/instagram/instagram1.jpg'
    ],
    downloads: 926473,
    rating: 4.7,
    reviews: [
      {
        id: 'ig-r1',
        name: 'Social Media Expert',
        rating: 5,
        comment: 'The anonymous story viewing is a game-changer! No more accidentally tapping on stories.',
        date: '2025-04-05'
      },
      {
        id: 'ig-r2',
        name: 'Photo Enthusiast',
        rating: 4,
        comment: 'Love the download feature, but wish it had batch download for multiple photos.',
        date: '2025-03-25'
      }
    ],
    downloadLinks: [
      {
        name: 'Primary Server',
        url: 'https://spdn.poumod.com/Instagram-Pro-290.0.0.16.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Instagram/Instagram-Pro-290.0.0.16.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ]
  },
  {
    id: 'tiktok-plus',
    name: 'TikTok Plus',
    icon: tiktokIcon,
    description: 'Enhanced TikTok with video downloading, no watermarks, and ad-free browsing experience.',
    longDescription: 'This modded version of TikTok enhances your experience with powerful features. Download any TikTok video without watermarks in high quality with a single tap. Browse without annoying ads, unlock region-restricted content, and enjoy enhanced privacy features. The mod also includes the ability to use premium effects without restrictions.',
    version: '31.2.4',
    size: '42 MB',
    developer: 'ModdedStore Team',
    category: 'Social',
    features: [
      'Watermark-free video downloads',
      'Ad-free browsing',
      'Region restriction bypass',
      'Enhanced privacy options',
      'Unlimited access to premium effects',
      'Auto-repeat video option',
      'Advanced video sharing'
    ],
    screenshots: [
      '/images/tiktok/tiktok1.jpg',
      '/images/tiktok/tiktok2.jpg',
      '/images/tiktok/tiktok3.jpg'
    ],
    downloads: 763928,
    rating: 4.8,
    reviews: [
      {
        id: 'tt-r1',
        name: 'Content Creator',
        rating: 5,
        comment: 'The watermark-free download is perfect for reusing content on other platforms!',
        date: '2025-04-08'
      },
      {
        id: 'tt-r2',
        name: 'TikTok Addict',
        rating: 5,
        comment: 'I love that I can save videos easily and the ad-free experience is amazing.',
        date: '2025-03-29'
      }
    ],
    downloadLinks: [
      {
        name: 'Main Server',
        url: 'https://spdn.poumod.com/TikTok-Plus-31.2.4.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/TikTok/TikTok-Plus-31.2.4.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      },
      {
        name: 'Mirror 2',
        url: 'https://dl.happymod.com/TikTok/TikTok-Plus-31.2.4.apk',
        server: 'HappyMod',
        speed: 'Medium'
      }
    ]
  },
  {
    id: 'minecraft-pe-mod',
    name: 'Minecraft PE Ultimate',
    icon: minecraftIcon,
    description: 'Minecraft Pocket Edition with unlocked premium features, infinite resources, and skins.',
    longDescription: 'This modded version of Minecraft Pocket Edition offers the complete premium experience with all features unlocked. Enjoy unlimited resources, the full catalog of skins and texture packs, all premium items, and custom servers access. The mod also includes performance improvements, additional game modes, and exclusive features not available in the official version.',
    version: '1.20.51',
    size: '185 MB',
    developer: 'ModdedStore Team',
    category: 'Games',
    features: [
      'All premium features unlocked',
      'Unlimited resources and items',
      'Full skin and texture pack catalog',
      'Custom server access',
      'Performance improvements',
      'Additional game modes',
      'Exclusive mod features'
    ],
    screenshots: [
      '/images/minecraft/minecraft1.jpg',
      '/images/minecraft/minecraft2.jpg',
      '/images/minecraft/minecraft3.jpg'
    ],
    downloads: 1539204,
    rating: 4.9,
    reviews: [
      {
        id: 'mc-r1',
        name: 'Builder Pro',
        rating: 5,
        comment: 'Amazing mod! Having access to all the premium features and skins has totally transformed my gameplay.',
        date: '2025-04-12'
      },
      {
        id: 'mc-r2',
        name: 'Gamer Kid',
        rating: 5,
        comment: 'The unlimited resources make creative mode so much more fun! No more restrictions!',
        date: '2025-04-01'
      }
    ],
    downloadLinks: [
      {
        name: 'Fast Server',
        url: 'https://spdn.poumod.com/Minecraft-PE-Ultimate-1.20.51.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Minecraft/Minecraft-PE-Ultimate-1.20.51.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      },
      {
        name: 'Mirror 2',
        url: 'https://dl.happymod.com/Games/Minecraft-PE-Ultimate-1.20.51.apk',
        server: 'HappyMod',
        speed: 'Medium'
      }
    ]
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro Unlocked',
    icon: canvaIcon,
    description: 'Full Canva Pro features unlocked: premium templates, elements, fonts, and unlimited downloads.',
    longDescription: 'This modded version of Canva unlocks all Pro features without requiring a subscription. Access the full library of premium templates, elements, photos, and fonts. Enjoy unlimited downloads, transparent background exports, and team collaboration features. The mod also removes watermarks from premium content and provides full access to all Pro design tools.',
    version: '2.207.0',
    size: '60 MB',
    developer: 'ModdedStore Team',
    category: 'Productivity',
    features: [
      'All premium templates unlocked',
      'Full access to Pro elements and photos',
      'Premium fonts library',
      'Transparent background export',
      'No watermarks',
      'Team collaboration features',
      'Unlimited downloads'
    ],
    screenshots: [
      '/images/canva/canva1.jpg',
      '/images/canva/canva2.jpg',
      '/images/canva/canva3.jpg'
    ],
    downloads: 689320,
    rating: 4.8,
    reviews: [
      {
        id: 'cv-r1',
        name: 'Graphic Designer',
        rating: 5,
        comment: 'As a freelancer, this mod has been a lifesaver. All Pro features without the subscription cost!',
        date: '2025-04-09'
      },
      {
        id: 'cv-r2',
        name: 'Small Business Owner',
        rating: 4,
        comment: 'The premium templates and elements make my marketing materials look professional!',
        date: '2025-03-27'
      }
    ],
    downloadLinks: [
      {
        name: 'Primary Server',
        url: 'https://spdn.poumod.com/Canva-Pro-2.207.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Canva/Canva-Pro-2.207.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ]
  },
  {
    id: 'snaptube-vip',
    name: 'SnapTube VIP',
    icon: snaptubeIcon,
    description: 'Download videos and music from YouTube, Facebook, Instagram and other social platforms in high quality.',
    longDescription: 'SnapTube VIP is a premium video and music downloader that allows you to save content from YouTube, Facebook, Instagram, TikTok, and over 1000 other websites. Download videos in various quality options including 4K, 1080p, 720p, and more. Convert videos to MP3 with one click and organize your downloads in a user-friendly interface. The VIP version removes all ads and enables background downloading.',
    version: '7.38.0.7385',
    size: '32 MB',
    developer: 'SnapTube Team',
    category: 'Multimedia',
    features: [
      'Download videos from 1000+ websites',
      'Multiple quality options (4K, 1080p, 720p)',
      'MP3 converter built-in',
      'Ad-free experience',
      'Background downloading',
      'Video and music organizer',
      'Fast download speeds'
    ],
    screenshots: [
      '/images/snaptube/snaptube1.jpg',
      '/images/snaptube/snaptube2.jpg',
      '/images/snaptube/snaptube3.jpg'
    ],
    downloads: 3492781,
    rating: 4.8,
    reviews: [
      {
        id: 'st-r1',
        name: 'Music Collector',
        rating: 5,
        comment: 'The MP3 converter is amazing! I\'ve built my entire music library with this app.',
        date: '2025-04-18'
      },
      {
        id: 'st-r2',
        name: 'Video Creator',
        rating: 4,
        comment: 'Great for downloading reference videos and inspiration for my own content.',
        date: '2025-04-10'
      }
    ],
    downloadLinks: [
      {
        name: 'Fast Server',
        url: 'https://s1.spiderdown.com/SnapTube/Snaptube%20v7.38.0.73850210%20%28ViP%29.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      },
      {
        name: 'Mirror 1',
        url: 'https://spdn.poumod.com/Snaptube-VIP-7.38.0.7385.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 2',
        url: 'https://dl.liteapks.com/app/Snaptube-VIP-7.38.0.7385.apk',
        server: 'LiteAPKs',
        speed: 'Medium'
      }
    ]
  },
  {
    id: 'pubg-mobile-mod',
    name: 'PUBG Mobile Hack',
    icon: pubgIcon,
    description: 'PUBG Mobile with anti-ban protection, wallhack, aimbot, and premium features unlocked.',
    longDescription: 'This modded version of PUBG Mobile includes advanced features to enhance your gameplay. Experience the game with wallhack to see enemies through walls, aimbot for precise shooting, unlimited UC (Unknown Cash), and anti-ban protection to keep your account safe. The mod also provides no-recoil, increased movement speed, and premium cosmetics unlocked without spending money.',
    version: '2.9.0',
    size: '1.2 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'Action',
    features: [
      'Wallhack (see enemies through walls)',
      'Aimbot for accurate shooting',
      'Anti-ban protection',
      'Unlimited UC (in-game currency)',
      'No recoil and increased accuracy',
      'Speed boost for faster movement',
      'Premium skins and cosmetics unlocked'
    ],
    screenshots: [
      '/images/pubg/pubg1.jpg',
      '/images/pubg/pubg2.jpg',
      '/images/pubg/pubg3.jpg'
    ],
    downloads: 2845961,
    rating: 4.7,
    reviews: [
      {
        id: 'pm-r1',
        name: 'ProGamer123',
        rating: 5,
        comment: 'The wallhack feature is incredible! I can see all enemies and dominate every match.',
        date: '2025-04-20'
      },
      {
        id: 'pm-r2',
        name: 'BattleRoyaleKing',
        rating: 4,
        comment: 'Great mod but be careful with the aimbot in spectator mode to avoid reports.',
        date: '2025-04-15'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/PUBG-Mobile-Hack-2.9.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/PUBG/PUBG-Mobile-Hack-2.9.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      },
      {
        name: 'Mirror 2',
        url: 'https://dl.happymod.com/Games/PUBG-Mobile-Hack-2.9.0.apk',
        server: 'HappyMod',
        speed: 'Medium'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-18',
    changeLog: [
      'Updated to match latest game version',
      'Improved anti-ban features',
      'Fixed wallhack detection issues',
      'Added more premium skins',
      'Enhanced aimbot targeting'
    ],
    modType: [ModType.GOD_MODE, ModType.UNLIMITED_MONEY, ModType.PREMIUM_UNLOCKED, ModType.HIGH_DAMAGE, ModType.SPEED_HACK],
    safetyRating: 3,
    requirements: 'Android 10.0+, 4GB RAM',
    workingOn: ['High-end phones only', 'Samsung S series', 'OnePlus', 'Xiaomi Mi series']
  },
  {
    id: 'baseball9-unlimited',
    name: 'Baseball 9 Unlimited',
    icon: baseball9Icon,
    description: 'Baseball 9 with unlimited gems, stars, and all premium features unlocked.',
    longDescription: 'This modded version of Baseball 9 gives you unlimited resources and unlocks all premium features. Enjoy unlimited gems, stars, and points to build your ultimate baseball team. Buy the best players, upgrade all stats to maximum, and dominate in every tournament. The mod includes all premium stadiums, uniforms, and equipment unlocked, plus enhanced gameplay features and no ads.',
    version: '1.9.8',
    size: '98 MB',
    developer: 'ModdedStore Team',
    category: 'Games',
    features: [
      'Unlimited gems and stars',
      'All player stats can be maxed out',
      'All premium uniforms unlocked',
      'All stadiums available',
      'Premium equipment unlocked',
      'No advertising',
      'Fast game progression'
    ],
    screenshots: [
      '/images/baseball9/baseball9_1.jpg',
      '/images/baseball9/baseball9_2.jpg',
      '/images/baseball9/baseball9_3.jpg'
    ],
    downloads: 1245780,
    rating: 4.9,
    reviews: [
      {
        id: 'bb9-r1',
        name: 'Baseball Fan',
        rating: 5,
        comment: 'This mod is amazing! I can finally have all the premium players and uniforms without spending a fortune!',
        date: '2025-04-15'
      },
      {
        id: 'bb9-r2',
        name: 'Sports Gamer',
        rating: 5,
        comment: 'The unlimited gems make the game so much more enjoyable. No more grinding for resources!',
        date: '2025-04-01'
      }
    ],
    downloadLinks: [
      {
        name: 'Fast Server',
        url: 'https://spdn.poumod.com/Baseball9-Unlimited-1.9.8.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Baseball9/Baseball9-Unlimited-1.9.8.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      },
      {
        name: 'Mirror 2',
        url: 'https://dl.liteapks.com/app/Baseball9-Unlimited-1.9.8.apk',
        server: 'LiteAPKs',
        speed: 'Medium'
      }
    ]
  },
  {
    id: 'cod-mobile-mod',
    name: 'Call of Duty Mobile Mod',
    icon: codIcon,
    description: 'COD Mobile with aimbot, wallhack, unlimited CP, and anti-ban protection.',
    longDescription: 'This modded version of Call of Duty: Mobile unlocks premium features and cheats such as aimbot, wallhack, unlimited CP (COD Points), and anti-ban protection. Dominate every match, unlock all skins and weapons, and enjoy a lag-free, ad-free experience. Perfect for players who want to take their gameplay to the next level.',
    version: '1.0.41',
    size: '2.4 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    features: [
      'Aimbot for perfect accuracy',
      'Wallhack to see enemies through walls',
      'Unlimited CP (COD Points)',
      'All skins and weapons unlocked',
      'Anti-ban protection',
      'No ads',
      'Lag-free gaming experience'
    ],
    screenshots: [
      '/images/cod/cod1.jpg',
      '/images/cod/cod2.jpg',
      '/images/cod/cod3.jpg'
    ],
    downloads: 3124901,
    rating: 4.8,
    reviews: [
      {
        id: 'cod-r1',
        name: 'ShooterPro',
        rating: 5,
        comment: 'Aimbot and wallhack work flawlessly! Unlocked all legendary skins.',
        date: '2025-04-20'
      },
      {
        id: 'cod-r2',
        name: 'MobileGamer',
        rating: 4,
        comment: 'Great for fun, but use anti-ban features to avoid getting flagged.',
        date: '2025-04-12'
      }
    ],
    downloadLinks: [
      {
        name: 'Main Server',
        url: 'https://spdn.poumod.com/COD-Mobile-Mod-1.0.41.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/CODMobile/COD-Mobile-Mod-1.0.41.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ]
  },
  {
    id: 'asphalt9-legends-mod',
    name: 'Asphalt 9 Legends Mod',
    icon: asphalt9Icon,
    description: 'Asphalt 9 with unlimited money, unlocked cars, and premium features.',
    longDescription: 'This modded version of Asphalt 9: Legends gives you unlimited money, all cars unlocked, and access to premium features. Upgrade your cars to the max, race with exclusive vehicles, and enjoy an ad-free, enhanced racing experience. Compete in multiplayer without restrictions and climb the leaderboards with ease.',
    version: '4.2.0',
    size: '2.1 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    features: [
      'Unlimited money and tokens',
      'All cars unlocked',
      'Max upgrades for all vehicles',
      'Ad-free racing experience',
      'Premium events unlocked',
      'Multiplayer without restrictions',
      'Enhanced graphics and performance'
    ],
    screenshots: [
      '/images/asphalt9/asphalt1.jpg',
      '/images/asphalt9/asphalt2.jpg',
      '/images/asphalt9/asphalt3.jpg'
    ],
    downloads: 2150493,
    rating: 4.9,
    reviews: [
      {
        id: 'a9-r1',
        name: 'SpeedRacer',
        rating: 5,
        comment: 'Unlocked all cars and max upgrades instantly! Best racing mod out there.',
        date: '2025-04-19'
      },
      {
        id: 'a9-r2',
        name: 'Car Collector',
        rating: 5,
        comment: 'Unlimited money lets me try every car in the game. Love the graphics!',
        date: '2025-04-10'
      }
    ],
    downloadLinks: [
      {
        name: 'Primary Server',
        url: 'https://spdn.poumod.com/Asphalt9-Legends-Mod-4.2.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/Asphalt9/Asphalt9-Legends-Mod-4.2.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ]
  },
  {
    id: 'subway-surfers-mod',
    name: 'Subway Surfers Unlimited',
    icon: subwaySurfersIcon,
    description: 'Subway Surfers with unlimited coins, keys, and all characters unlocked.',
    longDescription: 'This modded version of Subway Surfers gives you unlimited coins, keys, and unlocks all characters and hoverboards from the start. Enjoy the endless runner game without restrictions, customize your character with any outfit, and use any hoverboard. The mod also includes no ads, unlimited revives, and the ability to play in any map without waiting for weekly updates.',
    version: '3.12.0',
    size: '156 MB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'Casual',
    features: [
      'Unlimited coins and keys',
      'All characters unlocked',
      'All hoverboards available',
      'No advertisements',
      'Unlimited revives',
      'All maps unlocked',
      'High score multiplier'
    ],
    screenshots: [
      '/images/subwaysurfers/subwaysurfers1.jpg',
      '/images/subwaysurfers/subwaysurfers2.jpg',
      '/images/subwaysurfers/subwaysurfers3.jpg',
      '/images/subwaysurfers/subwaysurfers_new1.jpg',
      '/images/subwaysurfers/subwaysurfers_new2.jpg'
    ],
    downloads: 5820461,
    rating: 4.9,
    reviews: [
      {
        id: 'ss-r1',
        name: 'RunnerPro',
        rating: 5,
        comment: 'Finally I can use any character I want! The unlimited keys make the game so much more enjoyable.',
        date: '2025-04-21'
      },
      {
        id: 'ss-r2',
        name: 'CasualGamer',
        rating: 5,
        comment: 'The no ads feature is amazing, and having all the maps available is fantastic!',
        date: '2025-04-15'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/SubwaySurfers-Unlimited-3.12.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/SubwaySurfers/SubwaySurfers-Unlimited-3.12.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-20',
    changeLog: [
      'Updated to the latest Subway Surfers version',
      'Added all new characters and hoverboards',
      'Improved anti-detection system',
      'Enhanced performance on low-end devices',
      'Added all new maps including the latest seasonal themes'
    ],
    modType: [ModType.UNLIMITED_MONEY, ModType.PREMIUM_UNLOCKED, ModType.AD_FREE],
    safetyRating: 5,
    requirements: 'Android 7.0+',
    workingOn: ['All Android devices', 'iOS 14.0+']
  },
  {
    id: 'brawl-stars-mod',
    name: 'Brawl Stars Unlimited',
    icon: brawlStarsIcon,
    description: 'Brawl Stars with unlimited gems, coins, and all brawlers unlocked.',
    longDescription: 'This modded version of Brawl Stars provides you with unlimited gems, coins, and star points. All brawlers are unlocked from the start, including legendary ones, and all skins are available for customization. Enjoy a competitive advantage with maxed-out brawlers, instant matchmaking, and private servers for practicing your skills without risk. The mod includes all game modes and maps available without restrictions.',
    version: '47.190',
    size: '224 MB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'Action',
    features: [
      'Unlimited gems and coins',
      'All brawlers unlocked from the start',
      'All skins and pins available',
      'Maxed out brawlers with star powers',
      'Private servers available',
      'No advertisements',
      'Fast matchmaking'
    ],
    screenshots: [
      '/images/brawlstars/brawlstars1.jpg',
      '/images/brawlstars/brawlstars2.jpg',
      '/images/brawlstars/brawlstars3.jpg',
      '/images/brawlstars/brawlstars_new1.jpg',
      '/images/brawlstars/brawlstars_new2.jpg'
    ],
    downloads: 3892415,
    rating: 4.8,
    reviews: [
      {
        id: 'bs-r1',
        name: 'BrawlMaster',
        rating: 5,
        comment: 'Getting all brawlers maxed from the start is awesome! I can focus on strategy instead of grinding.',
        date: '2025-04-19'
      },
      {
        id: 'bs-r2',
        name: 'StarPlayer',
        rating: 4,
        comment: 'The private servers feature is super helpful for practicing. Best mod for Brawl Stars hands down!',
        date: '2025-04-10'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/BrawlStars-Unlimited-47.190.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/BrawlStars/BrawlStars-Unlimited-47.190.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-15',
    changeLog: [
      'Updated to match the latest game version',
      'Added all new brawlers and skins from latest update',
      'Fixed matchmaking issues',
      'Improved private server stability',
      'Added new map rotation system'
    ],
    modType: [ModType.UNLIMITED_GEMS, ModType.PREMIUM_UNLOCKED, ModType.AD_FREE],
    safetyRating: 4,
    requirements: 'Android 6.0+',
    workingOn: ['All Android devices', 'iOS 13.0+']
  },
  {
    id: 'genshin-impact-mod',
    name: 'Genshin Impact Ultimate',
    icon: genshinImpactIcon,
    description: 'Genshin Impact with unlimited primogems, all characters unlocked, and max levels.',
    longDescription: 'This modded version of Genshin Impact gives you unlimited primogems, mora, and other resources. All characters, including 5-star heroes, are unlocked from the start with maximum constellation levels. Weapons are maxed out with refinement rank 5, and all artifacts have perfect substats. The mod features unlimited resin, instant adventure completion, and the ability to unlock all regions and storylines immediately.',
    version: '4.5.0',
    size: '15.8 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'RPG',
    features: [
      'Unlimited primogems and mora',
      'All characters unlocked with max constellations',
      'All weapons maxed out with refinement rank 5',
      'Perfect artifacts with ideal substats',
      'Unlimited resin for domains and bosses',
      'Instant adventure completion',
      'All regions and storylines unlocked'
    ],
    screenshots: [
      '/images/genshinimpact/genshinimpact1.jpg',
      '/images/genshinimpact/genshinimpact2.jpg',
      '/images/genshinimpact/genshinimpact3.jpg',
      '/images/genshinimpact/genshinimpact_new1.jpg'
    ],
    downloads: 2735812,
    rating: 4.9,
    reviews: [
      {
        id: 'gi-r1',
        name: 'TravelerMain',
        rating: 5,
        comment: 'Being able to try every character with max constellations is a dream come true! The weapon selection is amazing too.',
        date: '2025-04-18'
      },
      {
        id: 'gi-r2',
        name: 'TeyvstExplorer',
        rating: 5,
        comment: 'No more waiting for resin to recharge! I can finally farm artifacts and boss materials without limits.',
        date: '2025-04-08'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/GenshinImpact-Ultimate-4.5.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/GenshinImpact/GenshinImpact-Ultimate-4.5.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-12',
    changeLog: [
      'Updated to match version 4.5.0',
      'Added all new characters from Fontaine region',
      'Improved server stability for co-op play',
      'Added new weapons and artifacts',
      'Enhanced graphics optimization for better performance'
    ],
    modType: [ModType.UNLIMITED_GEMS, ModType.PREMIUM_UNLOCKED, ModType.UNLOCKED_LEVELS],
    safetyRating: 4,
    requirements: 'Android 9.0+, 8GB RAM, 16GB free storage',
    workingOn: ['High-end Android devices', 'iOS not supported yet']
  },
  {
    id: 'honkai-star-rail-mod',
    name: 'Honkai Star Rail Infinity',
    icon: honkaiStarRailIcon,
    description: 'Honkai Star Rail with unlimited Stellar Jade, all characters unlocked, and max Eidolons.',
    longDescription: 'This modded version of Honkai Star Rail provides unlimited Stellar Jade, Credits, and all premium resources. All characters are unlocked with maximum Eidolon levels, and all Light Cones are available at superimposition level 5. The mod features maxed out character levels, traces, and relics with perfect substats. Enjoy unlimited Trailblaze Power, instant mission completion, and all story content unlocked from the start.',
    version: '2.1.0',
    size: '12.3 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'RPG',
    features: [
      'Unlimited Stellar Jade and Credits',
      'All characters unlocked with max Eidolons',
      'All Light Cones available at max superimposition',
      'Perfect relics with ideal substats',
      'Unlimited Trailblaze Power',
      'Instant mission completion',
      'All planets and story content unlocked'
    ],
    screenshots: [
      '/images/honkaistarrail/honkaistarrail1.jpg',
      '/images/honkaistarrail/honkaistarrail2.jpg',
      '/images/honkaistarrail/honkaistarrail3.jpg',
      '/images/honkaistarrail/honkaistarrail_new1.jpg',
      '/images/honkaistarrail/honkaistarrail_new2.jpg'
    ],
    downloads: 1986532,
    rating: 4.9,
    reviews: [
      {
        id: 'hsr-r1',
        name: 'TrailblazerElite',
        rating: 5,
        comment: 'All characters with max Eidolons is incredible! I can create any team comp I want and experiment freely.',
        date: '2025-04-17'
      },
      {
        id: 'hsr-r2',
        name: 'CosmicExplorer',
        rating: 5,
        comment: 'The perfect relics save so much grinding time. This mod completely transforms the game experience!',
        date: '2025-04-05'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/HonkaiStarRail-Infinity-2.1.0.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/HonkaiStarRail/HonkaiStarRail-Infinity-2.1.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-10',
    changeLog: [
      'Updated to match version 2.1.0',
      'Added all new characters from Penacony',
      'Fixed stability issues in Simulated Universe',
      'Added new Light Cones and relics',
      'Improved performance optimization for mid-range devices'
    ],
    modType: [ModType.UNLIMITED_GEMS, ModType.PREMIUM_UNLOCKED, ModType.UNLOCKED_LEVELS],
    safetyRating: 4,
    requirements: 'Android 8.0+, 6GB RAM, 13GB free storage',
    workingOn: ['High-end and mid-range Android devices', 'iOS not supported']
  },
  {
    id: 'brawl-stars-mod-plus',
    name: 'Brawl Stars Ultra',
    icon: brawlStarsIcon,
    description: 'Brawl Stars with unlimited gems, all brawlers unlocked, and auto-aim assistance.',
    longDescription: 'This modded version of Brawl Stars gives you unlimited gems, unlocks all brawlers with their star powers and gadgets, and provides auto-aim assistance for perfect shots. Dominate every match with maxed-out brawlers, customize your gameplay with all available skins, and enjoy a private server experience without the risk of being banned from official servers.',
    version: '51.257',
    size: '175 MB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'Action',
    features: [
      'Unlimited gems and coins',
      'All brawlers unlocked with max level',
      'All star powers and gadgets available',
      'Auto-aim assistance',
      'All skins unlocked',
      'Private server for safe play',
      'Instant rewards from all boxes'
    ],
    screenshots: [
      '/images/brawlstars/brawlstars1.jpg',
      '/images/brawlstars/brawlstars2.jpg',
      '/images/brawlstars/brawlstars3.jpg',
      '/images/brawlstars/brawlstars_new1.jpg',
      '/images/brawlstars/brawlstars_new2.jpg'
    ],
    downloads: 4125790,
    rating: 4.8,
    reviews: [
      {
        id: 'bs-r1',
        name: 'StarPlayer',
        rating: 5,
        comment: 'Having all brawlers maxed out is amazing! The private server means I can play without worrying about bans!',
        date: '2025-04-19'
      },
      {
        id: 'bs-r2',
        name: 'GemsCollector',
        rating: 4,
        comment: 'Great mod, but sometimes the auto-aim is too good and makes the game too easy!',
        date: '2025-04-10'
      }
    ],
    downloadLinks: [
      {
        name: 'Main Server',
        url: 'https://spdn.poumod.com/BrawlStars-Unlimited-51.257.apk',
        server: 'PouMod Server',
        speed: 'Fast'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/BrawlStars/BrawlStars-Unlimited-51.257.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-18',
    changeLog: [
      'Updated to match latest official version',
      'Added all new brawlers and skins',
      'Improved private server stability',
      'Enhanced auto-aim for better gameplay',
      'Fixed visibility of player pins in matches'
    ],
    modType: [ModType.UNLIMITED_GEMS, ModType.PREMIUM_UNLOCKED, ModType.GOD_MODE],
    safetyRating: 4,
    requirements: 'Android 8.0+, 4GB RAM',
    workingOn: ['Most Android devices', 'iOS through AltStore']
  },
  {
    id: 'genshin-impact-mod',
    name: 'Genshin Impact Ultimate',
    icon: genshinImpactIcon,
    description: 'Genshin Impact with unlimited primogems, instant resin refill, and character unlock.',
    longDescription: 'This modded version of Genshin Impact provides unlimited primogems for wishing, instant resin refill for unlimited domain runs, and the ability to unlock any character or weapon. Experience the full adventure with maxed constellations, weapon refinements, and artifacts. The private server ensures your account remains safe while enjoying premium features.',
    version: '4.7.0',
    size: '20 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'RPG',
    features: [
      'Unlimited primogems and mora',
      'Instant resin refill',
      'All characters unlocked with max constellations',
      'All weapons with R5 refinement',
      'Perfect artifacts with ideal stats',
      'Unlimited resources for leveling',
      'Enhanced damage multipliers'
    ],
    screenshots: [
      '/images/genshinimpact/genshinimpact1.jpg',
      '/images/genshinimpact/genshinimpact2.jpg',
      '/images/genshinimpact/genshinimpact3.jpg',
      '/images/genshinimpact/genshinimpact_new1.jpg'
    ],
    downloads: 3245678,
    rating: 4.9,
    reviews: [
      {
        id: 'gi-r1',
        name: 'TravelerMain',
        rating: 5,
        comment: 'Finally I can have all the characters I want without spending thousands on wishes!',
        date: '2025-04-22'
      },
      {
        id: 'gi-r2',
        name: 'ArtifactHunter',
        rating: 5,
        comment: 'The perfect artifacts alone make this worth it. No more grinding the same domain for months!',
        date: '2025-04-15'
      }
    ],
    downloadLinks: [
      {
        name: 'Premium Server',
        url: 'https://spdn.poumod.com/GenshinImpact-Ultimate-4.7.0.apk',
        server: 'PouMod Server',
        speed: 'Moderate (large file)'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/GenshinImpact/GenshinImpact-Ultimate-4.7.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-22',
    changeLog: [
      'Updated to version 4.7.0 with all new areas',
      'Added all new characters and weapons',
      'Improved private server stability',
      'Enhanced damage calculations',
      'Fixed co-op functionality between modded accounts'
    ],
    modType: [ModType.UNLIMITED_GEMS, ModType.PREMIUM_UNLOCKED, ModType.GOD_MODE, ModType.NO_VERIFICATION],
    safetyRating: 4,
    requirements: 'Android 9.0+, 8GB RAM, 25GB storage',
    workingOn: ['High-end Android devices only']
  },
  {
    id: 'honkai-star-rail-mod',
    name: 'Honkai: Star Rail Infinity',
    icon: honkaiStarRailIcon,
    description: 'Honkai: Star Rail with unlimited Stellar Jade, max level characters, and auto-battle.',
    longDescription: 'This modded version of Honkai: Star Rail gives you infinite Stellar Jade for unlimited warps, all characters with max Eidolons, and enhanced auto-battle with optimized ability usage. Experience the strategic turn-based combat with any team composition you desire, and enjoy the story with fully upgraded Light Cones and Relics.',
    version: '2.3.0',
    size: '16 GB',
    developer: 'ModdedStore Team',
    category: 'Games',
    subcategory: 'RPG',
    features: [
      'Unlimited Stellar Jade',
      'All characters unlocked with max Eidolons',
      'All Light Cones available and fully superimposed',
      'Perfect Relics with ideal substats',
      'Enhanced auto-battle AI',
      'Unlimited Fuel and Stamina',
      'Instant character and equipment leveling'
    ],
    screenshots: [
      '/images/honkaistarrail/honkaistarrail1.jpg',
      '/images/honkaistarrail/honkaistarrail2.jpg',
      '/images/honkaistarrail/honkaistarrail3.jpg',
      '/images/honkaistarrail/honkaistarrail_new1.jpg',
      '/images/honkaistarrail/honkaistarrail_new2.jpg'
    ],
    downloads: 2756432,
    rating: 4.9,
    reviews: [
      {
        id: 'hsr-r1',
        name: 'TrailblazerPro',
        rating: 5,
        comment: 'The unlimited warp system is phenomenal! I can try any character and Light Cone combination!',
        date: '2025-04-23'
      },
      {
        id: 'hsr-r2',
        name: 'RelicCollector',
        rating: 5,
        comment: 'Perfect relics make team building so much more enjoyable. The auto-battle is actually smart too!',
        date: '2025-04-17'
      }
    ],
    downloadLinks: [
      {
        name: 'Main Server',
        url: 'https://spdn.poumod.com/HonkaiStarRail-Infinity-2.3.0.apk',
        server: 'PouMod Server',
        speed: 'Moderate (large file)'
      },
      {
        name: 'Mirror 1',
        url: 'https://s1.spiderdown.com/HonkaiStarRail/HonkaiStarRail-Infinity-2.3.0.apk',
        server: 'SpiderDown CDN',
        speed: 'High Speed'
      }
    ],
    verified: true,
    lastUpdated: '2025-04-23',
    changeLog: [
      'Updated to match official version 2.3.0',
      'Added new Penacony area characters',
      'Improved damage calculations for enhanced gameplay',
      'Fixed memory leaks for better performance',
      'Enhanced auto-battle strategy for different enemy types'
    ],
    modType: [ModType.UNLIMITED_GEMS, ModType.PREMIUM_UNLOCKED, ModType.GOD_MODE],
    safetyRating: 4,
    requirements: 'Android 9.0+, 8GB RAM, 20GB storage',
    workingOn: ['High-end Android devices only']
  }
];

export const getAppById = (id: string): App | undefined => {
  return MODDED_APPS.find(app => app.id === id);
};

export const getVerifiedApps = (): App[] => {
  return MODDED_APPS.filter(app => app.verified === true);
};

export const getRecentlyUpdatedApps = (limit = 6): App[] => {
  return [...MODDED_APPS]
    .filter(app => app.lastUpdated)
    .sort((a, b) => {
      const dateA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
      const dateB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
};

export const getAppsByCategory = (category: string, limit?: number): App[] => {
  const filteredApps = MODDED_APPS.filter(app =>
    app.category.toLowerCase() === category.toLowerCase() ||
    (app.subcategory && app.subcategory.toLowerCase() === category.toLowerCase())
  );

  return limit ? filteredApps.slice(0, limit) : filteredApps;
};

export const getAppsByModType = (modType: ModType, limit?: number): App[] => {
  const filteredApps = MODDED_APPS.filter(app =>
    Array.isArray(app.modType) && app.modType.includes(modType)
  );

  return limit ? filteredApps.slice(0, limit) : filteredApps;
};
