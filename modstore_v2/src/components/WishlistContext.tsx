import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (appId: string) => void;
  removeFromWishlist: (appId: string) => void;
  isInWishlist: (appId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('modstore-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (Array.isArray(parsedWishlist)) {
          setWishlist(parsedWishlist);
        }
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('modstore-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add an app to wishlist
  const addToWishlist = (appId: string) => {
    if (!wishlist.includes(appId)) {
      setWishlist([...wishlist, appId]);
    }
  };

  // Remove an app from wishlist
  const removeFromWishlist = (appId: string) => {
    setWishlist(wishlist.filter(id => id !== appId));
  };

  // Check if an app is in wishlist
  const isInWishlist = (appId: string) => {
    return wishlist.includes(appId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook for consuming the wishlist context
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
