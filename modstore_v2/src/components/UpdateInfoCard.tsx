import type React from 'react';
import { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface UpdateInfoCardProps {
  lastUpdated?: string;
  changelog?: string[];
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
}

const UpdateInfoCard: React.FC<UpdateInfoCardProps> = ({
  lastUpdated,
  changelog,
  className = '',
  showTitle = true,
  compact = false
}) => {
  if (!lastUpdated && !changelog?.length) return null;

  // Mobile state
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Check screen size
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

  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // If invalid date, return the original string
    if (Number.isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
    }).format(date);
  };

  // On mobile, show a more compact version with expand/collapse toggle
  const renderMobileContent = () => {
    if (!isMobile) return null;

    return (
      <>
        {changelog && changelog.length > 0 && (
          <div className="text-gray-300 text-sm">
            <div className="flex items-center justify-between" onClick={() => setExpanded(!expanded)}>
              <span className="font-medium">{changelog[0]}</span>
              <button className="p-1 text-primary-400">
                {expanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

            {expanded && changelog.length > 1 && (
              <ul className="mt-2 space-y-1 pl-2 border-l-2 border-primary-400/20">
                {changelog.slice(1).map((item, index) => (
                  <li key={`cl-${index}-${item.substring(0, 10)}`} className="flex items-start">
                    <FiCheckCircle className="text-primary-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </>
    );
  };

  // Regular desktop content
  const renderDesktopContent = () => {
    if (isMobile) return null;

    return (
      <>
        {changelog && changelog.length > 0 && !compact && (
          <div>
            <div className="mb-2 text-gray-300 text-sm">What's new:</div>
            <ul className="space-y-1">
              {changelog.map((item, index) => (
                <li key={`changelog-${index}-${item.substring(0, 10)}`} className="flex items-start text-gray-300 text-sm">
                  <FiCheckCircle className="text-primary-400 mr-2 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {changelog && changelog.length > 0 && compact && (
          <div className="text-gray-300 text-sm">
            {changelog[0]}
            {changelog.length > 1 && (
              <div
                className="inline-flex items-center text-primary-400 ml-2 cursor-pointer group"
                title={changelog.slice(1).join('\n')}
              >
                <FiInfo className="mr-1" />
                <span className="group-hover:underline">+{changelog.length - 1} more</span>
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`bg-dark-600 rounded-lg p-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center mb-3 text-white font-medium">
          <FiClock className="mr-2 text-primary-400" />
          <h3>Update Information</h3>
        </div>
      )}

      {lastUpdated && (
        <div className="flex items-center text-gray-300 mb-3">
          <span className={`text-xs bg-primary-500/10 text-primary-400 px-2 py-1 rounded-full mr-2 ${isMobile ? 'whitespace-nowrap' : ''}`}>
            Updated: {formatDate(lastUpdated)}
          </span>
        </div>
      )}

      {renderMobileContent()}
      {renderDesktopContent()}
    </div>
  );
};

export default UpdateInfoCard;
