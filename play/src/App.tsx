import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { ResourceLibrary } from './components/resources/ResourceLibrary';
import { Testimonials } from './components/home/Testimonials';
import { HowItWorks } from './components/home/HowItWorks';
import { Faq } from './components/home/Faq';
import { ProtectionCheck } from './components/shared/ProtectionCheck';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load page components for better code splitting
const AdminPage = lazy(() => import('./pages/AdminPage'));
const GameDetailPage = lazy(() => import('./pages/GameDetailPage'));
const GameCategoriesPage = lazy(() => import('./pages/GameCategoriesPage').then(module => ({ default: module.GameCategoriesPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(module => ({ default: module.WishlistPage })));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage').then(module => ({ default: module.RecommendationsPage })));
const DownloadHandlerPage = lazy(() => import('./pages/DownloadHandlerPage').then(module => ({ default: module.DownloadHandlerPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FaqPage = lazy(() => import('./pages/FaqPage').then(module => ({ default: module.FaqPage })));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// HomePage component that includes all the current sections
const HomePage = () => (
  <>
    <Hero />
    <ResourceLibrary />
    <HowItWorks />
    <Testimonials />
    <Faq />
  </>
);

// Scroll restoration for smooth navigation
function ScrollToTopOnNavigation() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    if (pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname]); // Re-run effect when pathname changes

  return null;
}

// Main App component
function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <BrowserRouter>
          <ScrollToTopOnNavigation />
          <ProtectionCheck />
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games/:gameId" element={<GameDetailPage />} />
                <Route path="/game/:gameId" element={<GameDetailPage />} />
                <Route path="/categories" element={<GameCategoriesPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/download/:gameId" element={<DownloadHandlerPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
