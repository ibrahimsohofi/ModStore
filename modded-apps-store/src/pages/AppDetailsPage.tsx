import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import { FiDownload, FiStar, FiInfo, FiCheck, FiArrowLeft } from 'react-icons/fi';

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const AppDetailsPage = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');

  // Get app details from the data
  const app = appId ? getAppById(appId) : undefined;

  // If app not found, redirect to 404
  useEffect(() => {
    if (!app) {
      navigate('/404');
    }
  }, [app, navigate]);

  if (!app) {
    return null; // Will redirect due to the useEffect
  }

  return (
    <div className="pb-20 md:pb-0"> {/* Add bottom padding for mobile nav */}
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
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                  {app.name}
                </h1>
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
                </div>
              </div>
            </div>

            {/* Download Button (desktop) */}
            <div className="md:ml-auto hidden md:block">
              <Link
                to={`/app/${app.id}/download`}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center"
              >
                <FiDownload className="mr-2" /> Download APK ({app.size})
              </Link>
            </div>
          </div>

          {/* Download Button (mobile) */}
          <div className="mt-6 md:hidden">
            <Link
              to={`/app/${app.id}/download`}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full w-full flex items-center justify-center"
            >
              <FiDownload className="mr-2" /> Download APK ({app.size})
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-8 bg-dark-600 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-display font-bold text-white mb-6">
            Screenshots
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {app.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`${app.name} screenshot ${index + 1}`}
                className="h-60 md:h-80 rounded-xl object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* App Details Tabs */}
      <section className="py-8 bg-dark-500">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex border-b border-dark-400 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'description'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'features'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'reviews'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="text-gray-300">
                <div className="flex justify-between mb-4">
                  <div>
                    <span className="text-gray-400 block mb-1">Version</span>
                    <span className="text-white">{app.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Size</span>
                    <span className="text-white">{app.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Developer</span>
                    <span className="text-white">{app.developer}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-300 whitespace-pre-line">
                  {app.longDescription}
                </p>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h3 className="text-white font-medium mb-4">Premium Features Unlocked</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-primary-500/20 p-1 rounded text-primary-400 mr-3 mt-0.5">
                        <FiCheck />
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="mb-6">
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
                    <div key={review.id} className="bg-dark-600 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{review.name}</h4>
                        <div className="text-yellow-400 flex">
                          {Array(5).fill(0).map((_, i) => (
                            <FiStar
                              key={i}
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
          </div>

          {/* Download Section */}
          <div className="bg-dark-600 p-6 rounded-xl">
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
        </div>
      </section>

      {/* Similar Apps Section */}
      <section className="py-8 bg-dark-600">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-display font-bold text-white mb-6">
            Similar Apps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Filter similar apps by category */}
            {getAppById(appId || '')?.category &&
              Array.from(
                new Set(
                  Array.from({ length: 4 })
                    .map(() => Math.floor(Math.random() * 8))
                )
              )
              .map(index => {
                const similarApp = {
                  ...getAppById(
                    app.id !==
                      Object.values(getAppById(appId || '')?.category || {})[index] ?
                      Object.values(getAppById(appId || '')?.category || {})[index] :
                      Object.values(getAppById(appId || '')?.category || {})[index === 0 ? 1 : 0]
                  )
                };
                return (
                  <Link
                    key={similarApp?.id || index}
                    to={`/app/${similarApp?.id}`}
                    className="bg-dark-500 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:-translate-y-1 transition-all group flex items-center p-3"
                  >
                    <img
                      src={similarApp?.icon}
                      alt={similarApp?.name}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors text-sm">
                        {similarApp?.name}
                      </h3>
                      <div className="flex items-center text-xs">
                        <div className="flex items-center text-yellow-400 mr-2">
                          <FiStar className="fill-current mr-1" />
                          <span>{similarApp?.rating}</span>
                        </div>
                        <span className="text-gray-400">{similarApp?.size}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppDetailsPage;
