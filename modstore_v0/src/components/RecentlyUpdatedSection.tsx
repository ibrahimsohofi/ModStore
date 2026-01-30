import type React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiDownload, FiStar } from 'react-icons/fi';
import { type App, getRecentlyUpdatedApps } from '../data/apps';
import VerifiedAppBadge from './VerifiedAppBadge';
import ModTypeBadge from './ModTypeBadge';
import UpdateInfoCard from './UpdateInfoCard';
import WishlistButton from './WishlistButton';

const RecentlyUpdatedSection: React.FC = () => {
  const recentApps = getRecentlyUpdatedApps(4);

  if (recentApps.length === 0) return null;

  return (
    <section className="py-10 bg-dark-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center">
            <FiClock className="mr-2 text-primary-400" /> Recently Updated
          </h2>
          <Link
            to="/categories/updated"
            className="text-primary-400 flex items-center hover:text-primary-300 transition-colors"
          >
            View All <FiArrowRight className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentApps.map((app) => (
            <RecentlyUpdatedCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface RecentlyUpdatedCardProps {
  app: App;
}

const RecentlyUpdatedCard: React.FC<RecentlyUpdatedCardProps> = ({ app }) => {
  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Mobile state detection
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add resize event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-dark-500 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:translate-y-[-4px] transition-all group border border-dark-400 flex flex-col h-full relative">
      <Link to={`/app/${app.id}`} className="block p-4 flex-grow">
        <div className="flex items-start mb-3">
          <img
            src={app.icon}
            alt={app.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover mr-3 shadow-md shadow-dark-900/20"
          />
          <div className="flex-1 min-w-0">
            {/* min-width: 0 prevents flex item from growing beyond container */}
            <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors line-clamp-1">
              {app.name}
            </h3>
            <div className="text-gray-400 text-xs flex items-center">
              {app.category}
              {app.verified && (
                <VerifiedAppBadge
                  verified={app.verified}
                  safetyRating={app.safetyRating}
                  className="ml-2"
                  tooltipPosition="bottom"
                  size="sm"
                />
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {app.modType?.slice(0, isMobile ? 1 : 2).map((type, index) => (
                <ModTypeBadge
                  key={`mod-${app.id}-${type}`}
                  type={type}
                  size="sm"
                  showLabel={index === 0}
                />
              ))}
            </div>
          </div>
        </div>

        <UpdateInfoCard
          lastUpdated={app.lastUpdated}
          changelog={app.changeLog}
          showTitle={false}
          compact={true}
          className="mb-3 text-xs"
        />

        <div className="flex items-center justify-between text-sm mt-auto">
          <div className="flex items-center text-yellow-400">
            <FiStar className="fill-current mr-1" />
            <span>{app.rating}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FiDownload className="mr-1" />
            <span>{formatNumber(app.downloads)}</span>
          </div>
        </div>
      </Link>

      <div className="absolute top-4 right-4">
        <WishlistButton appId={app.id} size="sm" />
      </div>
    </div>
  );
};

export default RecentlyUpdatedSection;
