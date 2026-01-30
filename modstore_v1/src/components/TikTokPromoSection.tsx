import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiVideo } from 'react-icons/fi';

const TikTokPromoSection = () => {
  // These would be replaced with real videos from the folders once they're available
  const previewGames = [
    {
      id: 'pubg-mobile-mod',
      name: 'PUBG Mobile Hack',
      thumbnail: '/images/pubg/pubg1.jpg',
      videoCount: 3
    },
    {
      id: 'cod-mobile-mod',
      name: 'Call of Duty Mobile Mod',
      thumbnail: '/images/cod/cod1.jpg',
      videoCount: 3
    },
    {
      id: 'minecraft-pe-mod',
      name: 'Minecraft PE Ultimate',
      thumbnail: '/images/minecraft/minecraft1.jpg',
      videoCount: 3
    }
  ];

  return (
    <section className="py-12 bg-dark-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 flex items-center justify-center bg-dark-400 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                  <path className="text-white" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">
                Gameplay Videos <span className="text-primary-400">@ModStore</span>
              </h2>
            </div>
            <p className="text-gray-300 ml-11">
              Watch exclusive gameplay videos showcasing our mods in action
            </p>
          </div>
          <Link to="/gameplay-videos" className="mt-4 lg:mt-0 text-primary-400 flex items-center hover:text-primary-300 transition-colors">
            View All Videos <FiArrowRight className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewGames.map((game) => (
            <Link
              key={game.id}
              to={`/gameplay-videos/${game.id}`}
              className="group relative block rounded-xl overflow-hidden aspect-video bg-dark-600 hover:shadow-lg hover:shadow-dark-900/20 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
              <img
                src={game.thumbnail}
                alt={game.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-primary-500 bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <FiVideo className="mr-1" />
                  {game.videoCount} videos
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                <h3 className="text-white font-medium mb-1 group-hover:text-primary-400 transition-colors">
                  {game.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  Gameplay highlights
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-primary-500 bg-opacity-80 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-6 bg-dark-600 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/5 mb-6 md:mb-0 md:mr-8">
              <h3 className="text-white text-xl font-bold mb-3">Follow Our TikTok Channel</h3>
              <p className="text-gray-300 mb-4">
                Get daily gameplay videos and unlock tips for all our modded games.
                See the premium features in action and learn how to maximize your gaming experience!
              </p>
              <div className="flex items-center">
                <a
                  href="https://tiktok.com/@modstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-2 px-6 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                  Follow @ModStore
                </a>
                <Link
                  to="/gameplay-videos"
                  className="ml-4 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Browse All Videos
                </Link>
              </div>
            </div>
            <div className="w-full md:w-2/5 flex justify-center md:justify-end">
              <div className="relative w-36 h-64 rounded-xl overflow-hidden border-2 border-dark-400 bg-dark-700">
                <div className="absolute top-0 left-0 right-0 h-6 bg-dark-800 flex items-center justify-center">
                  <div className="w-16 h-1 bg-dark-600 rounded-full" />
                </div>
                <div className="pt-8 px-2 h-full">
                  <img
                    src="/images/pubg/pubg2.jpg"
                    alt="TikTok preview"
                    className="w-full h-3/4 object-cover rounded-lg"
                  />
                  <div className="mt-2 flex justify-between">
                    <div className="w-2/3 space-y-1">
                      <div className="h-2 bg-dark-600 rounded-full" />
                      <div className="h-2 bg-dark-600 rounded-full w-4/5" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TikTokPromoSection;
