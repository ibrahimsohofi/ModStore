import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiHome, FiGrid, FiHeart, FiVideo, FiUpload } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useWishlist } from './WishlistContext';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { wishlist } = useWishlist();

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-500 theme-transition">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-dark-600 transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-dark-900/50' : ''
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo/modstore-advanced-logo.svg"
              alt="ModStore"
              className="h-10 w-auto"
            />
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md mx-4 relative hidden sm:flex"
          >
            <input
              type="text"
              placeholder="Search for modded apps..."
              className="w-full bg-dark-400 border border-dark-300 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              aria-label="Search"
            >
              <FiSearch />
            </button>
          </form>

          {/* Top Nav Links */}
          <nav className="hidden md:flex items-center space-x-5">
            <Link
              to="/categories/trending"
              className="text-white hover:text-primary-300 transition-colors"
            >
              Trending
            </Link>
            <Link
              to="/categories/games"
              className="text-white hover:text-primary-300 transition-colors"
            >
              Games
            </Link>
            <Link
              to="/gameplay-videos"
              className="text-white hover:text-primary-300 transition-colors flex items-center"
            >
              <FiVideo className="mr-1" />
              <span>Videos</span>
            </Link>
            <Link
              to="/manage-videos"
              className="text-white hover:text-primary-300 transition-colors flex items-center"
            >
              <FiUpload className="mr-1" />
              <span>Upload</span>
            </Link>
            <Link
              to="/categories/social"
              className="text-white hover:text-primary-300 transition-colors"
            >
              Social
            </Link>
            <Link
              to="/wishlist"
              className="text-white hover:text-primary-300 transition-colors flex items-center"
            >
              <FiHeart className={`mr-1 ${wishlist.length > 0 ? 'text-red-500 fill-current' : ''}`} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="ml-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-600 text-gray-400 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="mb-4">
                <img
                  src="/logo/modstore-advanced-logo.svg"
                  alt="ModStore"
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-sm max-w-md">
                ModStore is a curated collection of modded applications with premium features unlocked.
                Remember to use these applications responsibly and support developers when possible.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-white font-medium">Categories</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/categories/entertainment" className="hover:text-primary-300 transition-colors">
                      Entertainment
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories/social" className="hover:text-primary-300 transition-colors">
                      Social
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories/productivity" className="hover:text-primary-300 transition-colors">
                      Productivity
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories/games" className="hover:text-primary-300 transition-colors">
                      Games
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-white font-medium">Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/" className="hover:text-primary-300 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-primary-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-primary-300 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-primary-300 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-dark-400 mt-8 pt-8 text-center text-sm">
            <p>© 2025 ModStore. All rights reserved. Not affiliated with any app developers.</p>
            <p className="mt-2">This website is for educational purposes only.</p>
            <div className="mt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-600 border-t border-dark-400 py-2 px-4 z-40">
        <div className="flex justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/' ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <span className="flex items-center justify-center h-6">
              {location.pathname === '/' ? (
                <img
                  src="/logo/modstore-advanced-icon.svg"
                  alt="ModStore"
                  className="h-6 w-auto"
                />
              ) : (
                <FiHome className="text-xl" />
              )}
            </span>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/categories/all"
            className={`flex flex-col items-center p-2 ${
              location.pathname.includes('/categories') ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <span className="flex items-center justify-center h-6">
              <FiGrid className="text-xl" />
            </span>
            <span className="text-xs mt-1">Categories</span>
          </Link>
          <Link
            to="/gameplay-videos"
            className={`flex flex-col items-center p-2 ${
              location.pathname.includes('/gameplay-videos') ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <span className="flex items-center justify-center h-6">
              <FiVideo className="text-xl" />
            </span>
            <span className="text-xs mt-1">Videos</span>
          </Link>
          <Link
            to="/manage-videos"
            className={`flex flex-col items-center p-2 ${
              location.pathname.includes('/manage-videos') ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <span className="flex items-center justify-center h-6">
              <FiUpload className="text-xl" />
            </span>
            <span className="text-xs mt-1">Upload</span>
          </Link>
          <Link
            to="/wishlist"
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/wishlist' ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <span className="flex items-center justify-center h-6 relative">
              <FiHeart className={`text-xl ${wishlist.length > 0 && location.pathname !== '/wishlist' ? 'text-red-500' : ''}`} />
              {wishlist.length > 0 && location.pathname !== '/wishlist' && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </span>
            <span className="text-xs mt-1">Wishlist</span>
          </Link>
          <div className="flex flex-col items-center p-2 text-gray-400">
            <span className="flex items-center justify-center h-6">
              <ThemeToggle className="p-0" />
            </span>
            <span className="text-xs mt-1">Theme</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
