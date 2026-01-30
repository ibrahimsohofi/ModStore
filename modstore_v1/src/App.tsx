import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const AppDetailsPage = lazy(() => import('./pages/AppDetailsPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const GameplayVideosPage = lazy(() => import('./pages/GameplayVideosPage'));
const VideoManagementPage = lazy(() => import('./pages/VideoManagementPage'));

// Loading fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-500">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-16 w-16 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
      <p className="mt-4 text-primary-100 text-lg">Loading amazing modded apps...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="app/:appId" element={<AppDetailsPage />} />
            <Route path="app/:appId/download" element={<DownloadPage />} />
            <Route path="categories/:category" element={<CategoriesPage />} />
            <Route path="search" element={<CategoriesPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="gameplay-videos" element={<GameplayVideosPage />} />
            <Route path="gameplay-videos/:gameId" element={<GameplayVideosPage />} />
            <Route path="manage-videos" element={<VideoManagementPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
