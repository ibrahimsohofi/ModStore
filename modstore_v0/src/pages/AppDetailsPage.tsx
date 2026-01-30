import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MODDED_APPS, getAppById } from '../data/apps';
import { FiDownload, FiStar, FiArrowLeft, FiInfo, FiCheck, FiServer, FiClock, FiPackage, FiTag, FiCode } from 'react-icons/fi';
import VerifiedAppBadge from '../components/VerifiedAppBadge';
import ModTypeBadge from '../components/ModTypeBadge';
import UpdateInfoCard from '../components/UpdateInfoCard';
import AppRequirements from '../components/AppRequirements';
import WishlistButton from '../components/WishlistButton';

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const AppDetailsPage = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews' | 'download'>('description');
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get app details from the data
  const app = appId ? getAppById(appId) : undefined;

  useEffect(() => {
    if (!app) {
      navigate('/404');
    } else {
      // Simulate network loading delay
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [app, navigate]);

  if (!app) {
    return null; // Will redirect due to the useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 pb-10">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-dark-600 rounded-xl overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-dark-700 p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-dark-500" />
                <div className="flex-1">
                  <div className="h-7 w-3/4 bg-dark-500 rounded mb-2" />
                  <div className="h-5 w-1/2 bg-dark-500 rounded" />
                </div>
              </div>
            </div>
            {/* Tabs Skeleton */}
            <div className="p-4 border-b border-dark-500">
              <div className="flex gap-4 animate-pulse">
                <div className="h-8 w-24 bg-dark-500 rounded-full" />
                <div className="h-8 w-24 bg-dark-500 rounded-full" />
                <div className="h-8 w-24 bg-dark-500 rounded-full" />
              </div>
            </div>
            {/* Content Skeleton */}
            <div className="p-6 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="sm:w-2/3">
                  <div className="h-6 w-2/3 bg-dark-500 rounded mb-4" />
                  <div className="h-4 w-full bg-dark-500 rounded mb-2" />
                  <div className="h-4 w-full bg-dark-500 rounded mb-2" />
                  <div className="h-4 w-4/5 bg-dark-500 rounded mb-6" />

                  <div className="h-6 w-1/3 bg-dark-500 rounded mb-4" />
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={`feature-skeleton-${index}`} className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-dark-500" />
                        <div className="h-4 w-4/5 bg-dark-500 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm:w-1/3">
                  <div className="h-6 w-1/2 bg-dark-500 rounded mb-4" />
                  <div className="mb-4 rounded-lg p-4 bg-dark-500">
                    <div className="h-8 w-full bg-dark-400 rounded mb-2" />
                    <div className="h-4 w-2/3 bg-dark-400 rounded" />
                  </div>
                </div>
              </div>
              {/* Screenshots Skeleton */}
              <div className="mt-8">
                <div className="h-6 w-1/3 bg-dark-500 rounded mb-4" />
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={`screenshot-skeleton-${index}`} className="w-64 h-48 rounded-lg bg-dark-500 flex-shrink-0" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* App Header */}
      <section className="bg-gradient-to-br from-dark-600 to-dark-500 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-primary-400 mb-6 transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row">
            {/* App Icon and Basic Info */}
            <div className="flex items-start mb-6 md:mb-0 md:mr-8">
              <img
                src={app.icon}
                alt={app.name}
                className="w-24 h-24 rounded-xl object-cover shadow-lg shadow-dark-900/30"
              />
              <div className="ml-4">
                <div className="flex items-center">
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-white mr-2">
                    {app.name}
                  </h1>
                  {app.verified && (
                    <VerifiedAppBadge
                      verified={app.verified}
                      safetyRating={app.safetyRating}
                    />
                  )}
                  {/* WishlistButton near the app name */}
                  <WishlistButton appId={app.id} className="ml-2" />
                </div>
                <p className="text-gray-400">
                  {app.category} • {app.developer}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-yellow-400 mr-4">
                    <FiStar className="fill-current mr-1" />
                    <span>{app.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiDownload className="mr-1" />
                    <span>{formatNumber(app.downloads)} downloads</span>
                  </div>
                  <div className="flex items-center text-gray-400 ml-4">
                    <FiClock className="mr-1" />
                    <span>v{app.version}</span>
                  </div>
                </div>
                {app.modType && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {app.modType.map(modType => (
                      <ModTypeBadge
                        key={`${app.id}-${modType}`}
                        type={modType}
                        size="sm"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Download Button (desktop) and WishlistButton in action section */}
            <div className="md:ml-auto hidden md:flex flex-col items-end self-center gap-2">
              <Link
                to={`/app/${app.id}/download`}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center"
              >
                <FiDownload className="mr-2" /> Download APK ({app.size})
              </Link>
              <WishlistButton appId={app.id} showText size="md" className="flex items-center bg-dark-500 hover:bg-dark-400 px-4 py-2 rounded-full" />
            </div>
          </div>

          {/* Download Button (mobile) and WishlistButton */}
          <div className="mt-6 md:hidden flex flex-col gap-2">
            <Link
              to={`/app/${app.id}/download`}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full w-full flex items-center justify-center"
            >
              <FiDownload className="mr-2" /> Download APK ({app.size})
            </Link>
            <WishlistButton appId={app.id} showText size="md" className="flex items-center bg-dark-500 hover:bg-dark-400 px-4 py-2 rounded-full w-full justify-center" />
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-8 bg-dark-600 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-display font-bold text-white mb-6">
            Screenshots
          </h2>

          {/* Main screenshot display */}
          <div className="mb-4 flex justify-center">
            <img
              src={app.screenshots[activeThumbnail]}
              alt={`${app.name} screenshot`}
              className="h-60 md:h-96 rounded-xl object-cover shadow-lg shadow-dark-900/30"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 justify-center overflow-x-auto pb-4 scrollbar-hide">
            {app.screenshots.map((screenshot, index) => (
              <img
                key={`screenshot-${index}`}
                src={screenshot}
                alt={`${app.name} thumbnail ${index + 1}`}
                className={`h-16 w-24 rounded-lg object-cover cursor-pointer transition-all ${
                  activeThumbnail === index
                    ? 'border-2 border-primary-500 shadow-lg shadow-primary-500/30 scale-105'
                    : 'border border-dark-400 opacity-70 hover:opacity-100'
                }`}
                onClick={() => setActiveThumbnail(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* App Details Tabs */}
      <section className="py-8 bg-dark-500">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex border-b border-dark-400 mb-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'description'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'features'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('download')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'download'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Download
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-dark-600 p-4 rounded-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-dark-500 p-3 rounded-lg">
                        <span className="text-gray-400 block mb-1 text-sm">Version</span>
                        <span className="text-white font-medium">{app.version}</span>
                      </div>
                      <div className="bg-dark-500 p-3 rounded-lg">
                        <span className="text-gray-400 block mb-1 text-sm">Size</span>
                        <span className="text-white font-medium">{app.size}</span>
                      </div>
                      <div className="bg-dark-500 p-3 rounded-lg">
                        <span className="text-gray-400 block mb-1 text-sm">Developer</span>
                        <span className="text-white font-medium">{app.developer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Update information */}
                  <UpdateInfoCard
                    lastUpdated={app.lastUpdated}
                    changelog={app.changeLog}
                    className="h-full"
                  />
                </div>

                {/* App description */}
                <p className="mt-4 text-gray-300 whitespace-pre-line leading-relaxed">
                  {app.longDescription}
                </p>

                {/* Device compatibility */}
                <div className="mt-6">
                  <AppRequirements
                    requirements={app.requirements}
                    workingOn={app.workingOn}
                  />
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h3 className="text-white font-medium mb-4 flex items-center">
                  <span className="bg-primary-500/20 p-1 rounded-full text-primary-400 mr-3">
                    <FiCheck />
                  </span>
                  Premium Features Unlocked
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {app.features.map((feature, index) => (
                    <li key={`feature-${app.id}-${index}`} className="flex items-start bg-dark-600 p-3 rounded-lg">
                      <span className="bg-primary-500/20 p-1 rounded text-primary-400 mr-3 mt-0.5">
                        <FiCheck />
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {app.modType && app.modType.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-white font-medium mb-4">Mod Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {app.modType.map(modType => (
                        <ModTypeBadge
                          key={`mod-${app.id}-${modType}`}
                          type={modType}
                          size="lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="mb-6 bg-dark-600 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Rating</h3>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-400 mr-3">
                      <FiStar className="fill-current mr-1" />
                      <span className="text-xl font-bold">{app.rating}</span>
                    </div>
                    <span className="text-gray-400">
                      Based on {app.reviews.length} reviews
                    </span>
                  </div>
                </div>

                <h3 className="text-white font-medium mb-4">User Reviews</h3>
                <div className="space-y-4">
                  {app.reviews.map(review => (
                    <div key={review.id} className="bg-dark-600 p-4 rounded-lg hover:shadow-md hover:shadow-dark-900/10 transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{review.name}</h4>
                        <div className="text-yellow-400 flex">
                          {Array(5).fill(0).map((_, i) => (
                            <FiStar
                              key={`star-${review.id}-${i}`}
                              className={i < review.rating ? 'fill-current' : ''}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                      <p className="text-gray-500 text-sm mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download Tab */}
            {activeTab === 'download' && (
              <div>
                <div className="bg-dark-600 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-dark-900/20 transition-shadow mb-6">
                  <div className="flex items-center mb-4">
                    <FiInfo className="text-primary-400 mr-2" />
                    <h3 className="text-white font-medium">Download Information</h3>
                  </div>

                  <p className="text-gray-300 mb-4">
                    This is a modified version of the original application with premium features unlocked.
                    You can download the APK file directly from one of our secure servers below or proceed to the dedicated download page.
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <Link
                      to={`/app/${app.id}/download`}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all inline-flex items-center justify-center"
                    >
                      <FiDownload className="mr-2" /> Download Page
                    </Link>

                    {app.downloadLinks?.[0] && (
                      <a
                        href={app.downloadLinks[0].url}
                        className="bg-dark-400 text-white font-medium py-3 px-8 rounded-full hover:bg-dark-300 transition-all inline-flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiDownload className="mr-2" /> Direct Download
                      </a>
                    )}
                  </div>
                </div>

                {app.downloadLinks && app.downloadLinks.length > 0 && (
                  <div className="bg-dark-600 p-6 rounded-xl">
                    <h3 className="text-white font-medium mb-4">Download Mirrors</h3>
                    <div className="space-y-3">
                      {app.downloadLinks.map((link, i) => (
                        <div key={`mirror-${i}`} className="bg-dark-500 p-3 rounded-lg flex flex-wrap md:flex-nowrap items-center justify-between">
                          <div className="flex items-center mb-2 md:mb-0">
                            <FiServer className="text-primary-400 mr-2" />
                            <div>
                              <span className="text-white font-medium">{link.name}</span>
                              <span className="text-gray-400 text-sm block">{link.server}</span>
                            </div>
                          </div>
                          <div className="w-full md:w-auto flex items-center">
                            <span className={`text-xs px-2 py-1 rounded-full mr-3 ${
                              link.speed === 'Fast' || link.speed === 'High Speed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {link.speed}
                            </span>
                            <a
                              href={link.url}
                              className="bg-primary-600 hover:bg-primary-500 text-white py-1 px-4 rounded text-sm flex-grow md:flex-grow-0 text-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Always visible download section */}
          {activeTab !== 'download' && (
            <div className="bg-dark-600 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-dark-900/20 transition-shadow">
              <div className="flex items-center mb-4">
                <FiInfo className="text-primary-400 mr-2" />
                <h3 className="text-white font-medium">Download Information</h3>
              </div>
              <p className="text-gray-300 mb-4">
                This is a modified version of the original application with premium features unlocked.
                Download the APK file and install it on your device.
              </p>
              <Link
                to={`/app/${app.id}/download`}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all inline-flex items-center"
              >
                <FiDownload className="mr-2" /> Download APK ({app.size})
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Similar Apps Section */}
      <section className="py-8 bg-dark-600">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-display font-bold text-white mb-6">
            Similar Apps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {MODDED_APPS
              .filter(a => a.category === app.category && a.id !== app.id)
              .slice(0, 4)
              .map(similarApp => (
                <Link
                  key={similarApp.id}
                  to={`/app/${similarApp.id}`}
                  className="bg-dark-500 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:-translate-y-1 transition-all group flex items-center p-3"
                >
                  <img
                    src={similarApp.icon}
                    alt={similarApp.name}
                    className="w-12 h-12 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors text-sm">
                      {similarApp.name}
                    </h3>
                    <div className="flex items-center text-xs">
                      <div className="flex items-center text-yellow-400 mr-2">
                        <FiStar className="fill-current mr-1" />
                        <span>{similarApp.rating}</span>
                      </div>
                      <span className="text-gray-400">{similarApp.size}</span>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppDetailsPage;
