import type React from 'react';
import { useState, useEffect } from 'react';
import { FiSmartphone, FiCheck, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface AppRequirementsProps {
  requirements?: string;
  workingOn?: string[];
  className?: string;
}

const AppRequirements: React.FC<AppRequirementsProps> = ({
  requirements,
  workingOn,
  className = ''
}) => {
  if (!requirements && (!workingOn || workingOn.length === 0)) {
    return null;
  }

  // Mobile state detection
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Check if on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`bg-dark-600 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-white font-medium">
          <FiSmartphone className="mr-2 text-primary-400" />
          <h3>Compatibility</h3>
        </div>
        {isMobile && workingOn && workingOn.length > 3 && (
          <button
            className="text-primary-400 p-1"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse device list" : "Expand device list"}
            type="button"
          >
            {expanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        )}
      </div>

      {requirements && (
        <div className="mb-3">
          <div className="text-gray-400 text-sm mb-1">Requirements</div>
          <div className="text-gray-300 bg-dark-500 px-3 py-2 rounded-lg text-sm whitespace-pre-wrap">
            {requirements}
          </div>
        </div>
      )}

      {workingOn && workingOn.length > 0 && (
        <div>
          <div className="text-gray-400 text-sm mb-1">Confirmed Working On</div>
          <div className="bg-dark-500 px-3 py-2 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {/* On mobile, limit the shown devices unless expanded */}
              {workingOn.slice(0, isMobile && !expanded ? 3 : undefined).map((device) => (
                <div
                  key={`device-${device.replace(/\s+/g, '-').toLowerCase()}`}
                  className="flex items-center bg-dark-400 px-2 py-1 rounded text-sm text-gray-300"
                >
                  <FiCheck className="mr-1 text-green-400" />
                  {device}
                </div>
              ))}

              {/* Show "+X more" indicator on mobile when collapsed */}
              {isMobile && !expanded && workingOn.length > 3 && (
                <div className="flex items-center bg-dark-400/50 px-2 py-1 rounded text-sm text-primary-400 select-none">
                  +{workingOn.length - 3} more
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 text-gray-400 text-xs flex items-start">
            <FiInfo className="mr-1 mt-0.5 flex-shrink-0 text-primary-400" />
            <span>
              We test our mods on these devices, but they may work on others as well.
              {isMobile ? null : " If you have success with another device, please let us know!"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppRequirements;
