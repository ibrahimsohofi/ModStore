import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { ResourceLibrary } from './components/resources/ResourceLibrary';
import { Testimonials } from './components/home/Testimonials';
import { HowItWorks } from './components/home/HowItWorks';
import { Faq } from './components/home/Faq';

import { GameDetailPage } from './pages/GameDetailPage';
import { GameCategoriesPage } from './pages/GameCategoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPreferencesProvider } from './context/UserPreferencesContext';

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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return null;
}

// Make sure routing from game title to detail page is working
export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <UserPreferencesProvider>
        <BrowserRouter>
          <ScrollToTopOnNavigation />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/games/:gameId" element={<GameDetailPage />} />
              <Route path="/categories" element={<GameCategoriesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}

export default App;
