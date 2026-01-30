import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MODDED_APPS } from '../data/apps';
import { FiDownload, FiStar, FiArrowRight } from 'react-icons/fi';

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const HomePage = () => {
  // Get trending apps (highest downloads)
  const trendingApps = [...MODDED_APPS].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  // Get recent apps (just use the first 6 for demo)
  const recentApps = MODDED_APPS.slice(0, 6);

  // Group apps by category
  const categories = Array.from(new Set(MODDED_APPS.map(app => app.category)));

  return (
    <div className="pb-20 md:pb-0"> {/* Add bottom padding for mobile nav */}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-600 to-dark-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-app-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              <span className="block">Unlock Premium Features with</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500">
                ModStore
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Your trusted source for modded apps with premium features unlocked.
              No subscriptions, no limitations - just pure premium experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/categories/trending"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center"
              >
                Explore Trending Apps <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/categories/all"
                className="bg-dark-400 text-white font-medium py-3 px-8 rounded-full hover:bg-dark-300 transition-all flex items-center justify-center"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Apps Section */}
      <section className="py-12 bg-dark-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-white">
              Trending Apps
            </h2>
            <Link to="/categories/trending" className="text-primary-400 flex items-center hover:text-primary-300 transition-colors">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingApps.map(app => (
              <Link
                key={app.id}
                to={`/app/${app.id}`}
                className="bg-dark-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:-translate-y-1 transition-all group border border-dark-400"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-16 h-16 rounded-xl object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {app.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {app.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-yellow-400">
                      <FiStar className="fill-current mr-1" />
                      <span>{app.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FiDownload className="mr-1" />
                      <span>{formatNumber(app.downloads)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-dark-600">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-white mb-8">
            Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link
                key={category}
                to={`/categories/${category.toLowerCase()}`}
                className="bg-dark-500 rounded-xl p-6 text-center hover:bg-dark-400 transition-all"
              >
                <h3 className="text-white font-medium">{category}</h3>
                <p className="text-gray-400 text-sm mt-2">
                  {MODDED_APPS.filter(app => app.category === category).length} Apps
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Apps Section */}
      <section className="py-12 bg-dark-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-white">
              Recent Apps
            </h2>
            <Link to="/categories/all" className="text-primary-400 flex items-center hover:text-primary-300 transition-colors">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentApps.map(app => (
              <Link
                key={app.id}
                to={`/app/${app.id}`}
                className="bg-dark-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:-translate-y-1 transition-all group border border-dark-400 flex"
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-20 h-20 object-cover m-4 rounded-xl"
                />
                <div className="p-4 flex-1">
                  <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {app.category}
                  </p>
                  <div className="flex items-center text-sm">
                    <div className="flex items-center text-yellow-400 mr-3">
                      <FiStar className="fill-current mr-1" />
                      <span>{app.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FiDownload className="mr-1" />
                      <span>{app.size}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-app-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 max-w-2xl mx-auto">
            Enhance Your Digital Experience Today
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Explore our extensive collection of modded applications and unlock premium features without subscription fees.
          </p>
          <Link
            to="/categories/all"
            className="inline-block bg-white text-primary-800 font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-900/30 transition-all"
          >
            Browse All Apps
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
