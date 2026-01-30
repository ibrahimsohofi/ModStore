import { FiHeart } from 'react-icons/fi';
import { useWishlist } from './WishlistContext';

interface WishlistButtonProps {
  appId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const WishlistButton = ({
  appId,
  className = '',
  size = 'md',
  showText = false,
}: WishlistButtonProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isFavorite = isInWishlist(appId);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromWishlist(appId);
    } else {
      addToWishlist(appId);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };

  return (
    <button
      type="button"
      onClick={handleToggleWishlist}
      aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`${
        isFavorite ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-300'
      } ${sizeClasses[size]} rounded-full transition-colors focus:outline-none ${className}`}
    >
      <FiHeart className={`${isFavorite ? 'fill-current' : ''}`} />
      {showText && (
        <span className="ml-1">{isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
      )}
    </button>
  );
};

export default WishlistButton;
