import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { GameResource } from "@/types/games";

interface UserPreferencesContextType {
  favoriteGames: string[];
  recentlyViewed: string[];
  addToFavorites: (gameId: string) => void;
  removeFromFavorites: (gameId: string) => void;
  isFavorite: (gameId: string) => boolean;
  addToRecentlyViewed: (gameId: string) => void;
  clearRecentlyViewed: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

interface UserPreferencesProviderProps {
  children: ReactNode;
}

export function UserPreferencesProvider({ children }: UserPreferencesProviderProps) {
  const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("user_favorites");
    if (savedFavorites) {
      setFavoriteGames(JSON.parse(savedFavorites));
    }

    const savedRecentlyViewed = localStorage.getItem("recently_viewed_games");
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("user_favorites", JSON.stringify(favoriteGames));
  }, [favoriteGames]);

  // Save recently viewed to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recently_viewed_games", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToFavorites = (gameId: string) => {
    setFavoriteGames((prev) => {
      if (!prev.includes(gameId)) {
        return [...prev, gameId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (gameId: string) => {
    setFavoriteGames((prev) => prev.filter((id) => id !== gameId));
  };

  const isFavorite = (gameId: string) => {
    return favoriteGames.includes(gameId);
  };

  const addToRecentlyViewed = (gameId: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter((id) => id !== gameId);
      // Add to beginning of array (most recent first)
      // Limit to 10 items
      return [gameId, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        favoriteGames,
        recentlyViewed,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToRecentlyViewed,
        clearRecentlyViewed
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
}
