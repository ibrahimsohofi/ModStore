import type React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  count?: number;
  direction?: 'row' | 'column';
  gap?: string | number;
}

/**
 * SkeletonElement component - renders a single skeleton loader element
 */
export const SkeletonElement: React.FC<Omit<SkeletonProps, 'count' | 'direction' | 'gap'>> = ({
  className = '',
  width = '100%',
  height = '16px',
  borderRadius = '4px',
}) => {
  return (
    <div
      className={`animate-pulse bg-dark-400 dark:bg-dark-400 light:bg-light-300 ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
    />
  );
};

/**
 * SkeletonLoader component - renders multiple skeleton loader elements
 */
const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '16px',
  borderRadius = '4px',
  count = 1,
  direction = 'column',
  gap = '0.5rem',
}) => {
  return (
    <div
      className={`inline-flex ${direction === 'column' ? 'flex-col' : 'flex-row'} ${className}`}
      style={{ gap: typeof gap === 'number' ? `${gap}px` : gap }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonElement
          key={`skeleton-${i}`}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      ))}
    </div>
  );
};

/**
 * CardSkeleton - creates a standard card skeleton for app items
 */
export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-dark-600 rounded-xl p-5 overflow-hidden border border-dark-400 animate-pulse">
      <div className="flex items-start mb-4">
        <div className="w-16 h-16 rounded-xl bg-dark-400 mr-4" />
        <div className="flex-1">
          <div className="w-3/4 h-5 bg-dark-400 rounded mb-2" />
          <div className="w-1/2 h-4 bg-dark-400 rounded" />
        </div>
      </div>
      <div className="w-full h-4 bg-dark-400 rounded mb-2" />
      <div className="w-full h-4 bg-dark-400 rounded mb-2" />
      <div className="w-3/4 h-4 bg-dark-400 rounded mb-4" />
      <div className="flex justify-between">
        <div className="w-1/4 h-4 bg-dark-400 rounded" />
        <div className="w-1/4 h-4 bg-dark-400 rounded" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
