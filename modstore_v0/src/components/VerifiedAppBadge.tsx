import { FiCheckCircle, FiInfo } from 'react-icons/fi';
import { useState, useEffect } from 'react';

interface VerifiedAppBadgeProps {
  verified?: boolean;
  safetyRating?: number;
  className?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const VerifiedAppBadge = ({
  verified = false,
  safetyRating = 0,
  className = '',
  tooltipPosition = 'top',
  size = 'md'
}: VerifiedAppBadgeProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device to adjust tooltip behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!verified) return null;

  // Determine tooltip position based on screen size and provided position
  let tooltipClass = '';
  // On mobile, adjust tooltip to always be bottom or top regardless of requested position
  const effectivePosition = isMobile ? 'top' : tooltipPosition;

  switch (effectivePosition) {
    case 'top':
      tooltipClass = 'bottom-full mb-2 left-1/2 transform -translate-x-1/2';
      break;
    case 'bottom':
      tooltipClass = 'top-full mt-2 left-1/2 transform -translate-x-1/2';
      break;
    case 'left':
      tooltipClass = 'right-full mr-2 top-1/2 transform -translate-y-1/2';
      break;
    case 'right':
      tooltipClass = 'left-full ml-2 top-1/2 transform -translate-y-1/2';
      break;
  }

  // Handle size variations
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5'
  };

  // On mobile, make tooltip appear on tap instead of hover
  const handleTouch = () => {
    if (isMobile) {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => !isMobile && setShowTooltip(true)}
      onMouseLeave={() => !isMobile && setShowTooltip(false)}
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      <div className={`flex items-center bg-green-500/20 rounded-full text-green-400 ${sizeClasses[size]}`}>
        <FiCheckCircle className={`${size === 'sm' ? 'mr-0.5 text-[10px]' : 'mr-1 text-xs'}`} />
        <span className={`${size === 'sm' ? 'hidden sm:inline' : ''}`}>
          {size === 'sm' ? '100%' : '100% Working'}
        </span>
      </div>

      {showTooltip && (
        <div className={`absolute z-50 bg-dark-700 text-white px-3 py-2 rounded shadow-lg ${isMobile ? 'w-56' : 'w-48'} ${tooltipClass}`}>
          <div className="font-bold text-green-400 mb-1 flex items-center">
            <FiCheckCircle className="mr-1" /> Verified Mod
          </div>
          <div className="text-gray-300 text-xs mb-1">
            This mod has been tested and verified to work properly on multiple devices.
          </div>
          {safetyRating > 0 && (
            <div className="mt-2">
              <div className="flex items-center text-xs mb-1">
                <span className="text-gray-300 mr-2">Safety:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`safety-${i}`}
                      className={`w-2 h-2 rounded-full mr-1 ${i < safetyRating ? 'bg-green-400' : 'bg-dark-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifiedAppBadge;
