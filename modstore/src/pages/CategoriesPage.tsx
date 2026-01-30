import { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MODDED_APPS, getAppsByCategory } from '../data/apps';
import { FiDownload, FiStar, FiSearch, FiCheckCircle } from 'react-icons/fi';
import VerifiedAppBadge from '../components/VerifiedAppBadge';
import ModTypeBadge from '../components/ModTypeBadge';

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CategoriesPage = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const query = urlSearchParams.get('q') || '';
  const isSearch = location.pathname.includes('search');

  // Determine results based on category or search
  let results = isSearch
    ? MODDED_APPS.filter(app =>
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase())
      )
    : category
      ? getAppsByCategory(category)
      : MODDED_APPS;

  // Filter UI: rating, verified
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  if (verifiedOnly) {
    results = results.filter(app => app.verified);
  }
  if (ratingFilter) {
    results = results.filter(app => Math.floor(app.rating) >= ratingFilter);
  }

  return (
    <div className="min-h-screen pb-20 bg-dark-500">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <h1 className="text-3xl font-display font-bold text-white">
            {isSearch ? (
              <>
                <FiSearch className="inline text-primary-400 mb-1 mr-2" />
                Search Results
                {query && (
                  <span className="ml-2 text-gray-400 font-normal text-xl">
                    for &quot;<span className="text-primary-400">{query}</span>&quot;
                  </span>
                )}
              </>
            ) : (
              <>
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : 'All Apps'}
              </>
            )}
          </h1>
          {/* Filters */}
          <div className="flex gap-3 flex-wrap ml-auto">
            <button
              className={`px-3 py-1 text-xs rounded bg-dark-600 border border-dark-400 text-gray-300 hover:bg-dark-500 transition-colors flex items-center ${verifiedOnly ? 'border-green-500 text-green-400' : ''}`}
              onClick={() => setVerifiedOnly(v => !v)}
            >
              <FiCheckCircle className="inline mr-1 mb-0.5" /> Verified Only
            </button>
            {[5, 4, 3].map(rating => (
              <button
                key={`rating-filter-${rating}`}
                className={`px-3 py-1 text-xs rounded bg-dark-600 border border-dark-400 text-gray-300 hover:bg-dark-500 flex items-center transition-colors ${ratingFilter === rating ? 'bg-primary-500 text-white' : ''}`}
                onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
              >
                {Array(5).fill(0).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < rating ? 'text-yellow-400' : 'text-dark-300'
                    }
                  >★</span>
                ))}
                <span className="ml-1">&up;</span>
              </button>
            ))}
          </div>
        </div>

        {/* App Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length === 0 && (
            <div className="text-gray-400 text-lg col-span-full py-12 text-center font-medium">
              No apps found.
            </div>
          )}
          {results.map(app => (
            <Link
              key={app.id}
              to={`/app/${app.id}`}
              className="bg-dark-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-dark-900/20 hover:-translate-y-1 transition-all group border border-dark-400 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start mb-3">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-14 h-14 rounded-xl object-cover mr-3 shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors mb-1 mr-1">
                        {app.name}
                      </h3>
                      {app.verified && (
                        <VerifiedAppBadge
                          verified={app.verified}
                          safetyRating={app.safetyRating}
                          className="ml-1"
                          tooltipPosition="top"
                        />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {app.modType?.slice(0, 2).map(modType => (
                        <ModTypeBadge
                          key={`${app.id}-${modType}`}
                          type={modType}
                          size="sm"
                          showLabel={false}
                        />
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs">
                      {app.category} • v{app.version}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm flex-grow mb-4 line-clamp-3">
                  {app.description}
                </p>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
