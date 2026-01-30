import { ModType } from '../data/apps';
import {
  FiUnlock,
  FiDollarSign,
  FiXCircle,
  FiZap,
  FiShield,
  FiPackage,
  FiStar,
  FiLayers,
  FiClock,
  FiCheckSquare
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

interface ModTypeBadgeProps {
  type: ModType;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  responsive?: boolean; // Add responsive option
}

const ModTypeBadge = ({
  type,
  className = '',
  showLabel = true,
  size = 'md',
  responsive = true
}: ModTypeBadgeProps) => {
  // State to track if we're on a small screen to adjust display
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size effect
  useEffect(() => {
    if (!responsive) return;

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Check initially
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [responsive]);

  // Define badge colors and icons based on mod type
  const getBadgeConfig = (modType: ModType) => {
    switch (modType) {
      case ModType.PREMIUM_UNLOCKED:
        return {
          icon: <FiUnlock />,
          bgColor: 'bg-yellow-500/20',
          textColor: 'text-yellow-400',
          label: 'Premium',
          shortLabel: 'Premium'
        };
      case ModType.UNLIMITED_MONEY:
        return {
          icon: <FiDollarSign />,
          bgColor: 'bg-green-500/20',
          textColor: 'text-green-400',
          label: 'Unlimited Money',
          shortLabel: 'Money'
        };
      case ModType.AD_FREE:
        return {
          icon: <FiXCircle />,
          bgColor: 'bg-blue-500/20',
          textColor: 'text-blue-400',
          label: 'Ad-Free',
          shortLabel: 'No Ads'
        };
      case ModType.UNLIMITED_GEMS:
        return {
          icon: <FiPackage />,
          bgColor: 'bg-purple-500/20',
          textColor: 'text-purple-400',
          label: 'Unlimited Gems',
          shortLabel: 'Gems'
        };
      case ModType.GOD_MODE:
        return {
          icon: <FiShield />,
          bgColor: 'bg-red-500/20',
          textColor: 'text-red-400',
          label: 'God Mode',
          shortLabel: 'God'
        };
      case ModType.HIGH_DAMAGE:
        return {
          icon: <FiZap />,
          bgColor: 'bg-orange-500/20',
          textColor: 'text-orange-400',
          label: 'High Damage',
          shortLabel: 'Damage'
        };
      case ModType.UNLOCKED_LEVELS:
        return {
          icon: <FiLayers />,
          bgColor: 'bg-indigo-500/20',
          textColor: 'text-indigo-400',
          label: 'All Levels',
          shortLabel: 'Levels'
        };
      case ModType.CUSTOM_SKINS:
        return {
          icon: <FiStar />,
          bgColor: 'bg-pink-500/20',
          textColor: 'text-pink-400',
          label: 'Custom Skins',
          shortLabel: 'Skins'
        };
      case ModType.SPEED_HACK:
        return {
          icon: <FiClock />,
          bgColor: 'bg-teal-500/20',
          textColor: 'text-teal-400',
          label: 'Speed Hack',
          shortLabel: 'Speed'
        };
      case ModType.NO_VERIFICATION:
        return {
          icon: <FiCheckSquare />,
          bgColor: 'bg-cyan-500/20',
          textColor: 'text-cyan-400',
          label: 'No Verify',
          shortLabel: 'No Verify'
        };
      default:
        return {
          icon: <FiStar />,
          bgColor: 'bg-gray-500/20',
          textColor: 'text-gray-400',
          label: 'Mod',
          shortLabel: 'Mod'
        };
    }
  };

  const config = getBadgeConfig(type);

  // Determine size classes
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  // Determine which label to show
  const showShortLabel = isSmallScreen && responsive;
  const displayLabel = showShortLabel ? config.shortLabel : config.label;

  // Interactive tooltip for mobile (show full label on press/tap)
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTouch = () => {
    if (isSmallScreen && !showLabel) {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div className="relative inline-flex">
      <div
        className={`inline-flex items-center ${config.bgColor} ${config.textColor} rounded-full ${sizeClasses[size]} ${className} whitespace-nowrap`}
        onClick={handleTouch}
        onTouchStart={handleTouch}
      >
        <span className="flex-shrink-0 mr-1">{config.icon}</span>
        {showLabel && <span className="truncate max-w-[100px]">{displayLabel}</span>}
      </div>

      {/* Mobile tooltip for icon-only badges */}
      {showTooltip && !showLabel && (
        <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 z-50 bg-dark-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          {config.label}
        </div>
      )}
    </div>
  );
};

export default ModTypeBadge;
