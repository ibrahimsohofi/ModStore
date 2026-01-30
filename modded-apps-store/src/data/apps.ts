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
  features: string[];
  screenshots: string[];
  downloads: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const MODDED_APPS: App[] = [
  {
    id: 'spotify-premium',
    name: 'Spotify Premium Mod',
    icon: '/src/assets/icons/spotify.png',
    description: 'Enjoy Spotify Premium features without a subscription. No ads, unlimited skips, high quality audio, and more!',
    longDescription: 'This modded version of Spotify gives you premium features without requiring a paid subscription. Enjoy ad-free music streaming, unlimited skips, on-demand playback, extreme audio quality, and offline downloads. Stay in control of your music experience with this enhanced version.',
    version: '9.0.30.242',
    size: '45 MB',
    developer: 'ModdedStore Team',
    category: 'Music',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/spotify-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/spotify-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/spotify-mod3.jpg'
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
    ]
  },
  {
    id: 'netflix-premium',
    name: 'Netflix Premium Mod',
    icon: '/src/assets/icons/netflix.png',
    description: 'Watch Netflix content in HD/UHD quality without subscription fees. Unlock all premium features!',
    longDescription: 'This modded version of Netflix allows users to access premium content without a paid subscription. Enjoy HD and UHD streaming quality, download movies and series for offline viewing, and access region-locked content. The mod removes subscription verification and provides an ad-free experience.',
    version: '8.73.0',
    size: '58 MB',
    developer: 'ModdedStore Team',
    category: 'Entertainment',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/netflix-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/netflix-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/netflix-mod3.jpg'
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
    ]
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium Mod',
    icon: '/src/assets/icons/youtube.png',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/youtube-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/youtube-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/youtube-mod3.jpg'
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
    ]
  },
  {
    id: 'instagram-pro',
    name: 'Instagram Pro',
    icon: '/src/assets/icons/instagram.png',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/instagram-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/instagram-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/instagram-mod3.jpg'
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
    ]
  },
  {
    id: 'tiktok-plus',
    name: 'TikTok Plus',
    icon: '/src/assets/icons/tiktok.png',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/tiktok-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/tiktok-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/tiktok-mod3.jpg'
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
    ]
  },
  {
    id: 'minecraft-pe-mod',
    name: 'Minecraft PE Ultimate',
    icon: '/src/assets/icons/minecraft.png',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/minecraft-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/minecraft-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/minecraft-mod3.jpg'
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
    ]
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro Unlocked',
    icon: '/src/assets/icons/canva.png',
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
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/canva-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/canva-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/canva-mod3.jpg'
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
    ]
  },
  {
    id: 'adobe-lightroom-mod',
    name: 'Adobe Lightroom Premium',
    icon: 'https://play-lh.googleusercontent.com/CQk2YGH3Jx-JKR9CZ5wU1tl2t5VyuhTZImSfQMc7M0j0vsK7G7jkQR34hMs2Ji5PpjM=w240-h480-rw',
    description: 'Professional photo editing with all premium features unlocked, presets, and selective editing.',
    longDescription: 'This modded version of Adobe Lightroom provides all premium features without requiring a subscription. Access the full range of professional editing tools, premium presets, selective editing capabilities, and cloud storage. The mod removes all restrictions, allows for unlimited exports in full resolution, and provides access to the Lightroom community.',
    version: '8.4.2',
    size: '112 MB',
    developer: 'ModdedStore Team',
    category: 'Photography',
    features: [
      'All premium features unlocked',
      'Full access to premium presets',
      'Selective editing capabilities',
      'Unlimited full-resolution exports',
      'RAW photo editing',
      'Advanced healing brush',
      'Geometry correction tools'
    ],
    screenshots: [
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/lightroom-mod1.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/lightroom-mod2.jpg',
      'https://same-assets.com/1677/20e50c27-83dd-45bb-9741-eee3e79ed96c/lightroom-mod3.jpg'
    ],
    downloads: 524678,
    rating: 4.7,
    reviews: [
      {
        id: 'lr-r1',
        name: 'Photography Enthusiast',
        rating: 5,
        comment: 'The selective editing tools are incredible! Makes my photos look professional with minimal effort.',
        date: '2025-04-11'
      },
      {
        id: 'lr-r2',
        name: 'Amateur Photographer',
        rating: 4,
        comment: 'Great for editing on the go. The premium presets save me so much time.',
        date: '2025-03-31'
      }
    ]
  }
];

export const getAppById = (id: string): App | undefined => {
  return MODDED_APPS.find(app => app.id === id);
};
