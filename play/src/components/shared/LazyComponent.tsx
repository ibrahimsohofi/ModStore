import React, { lazy, Suspense, type ComponentType } from 'react';

interface LazyComponentProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

// Enhanced loading skeleton for better UX
const DefaultFallback = () => (
  <div className="animate-pulse space-y-4 p-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-32 bg-gray-200 rounded"></div>
  </div>
);

export const LazyComponent: React.FC<LazyComponentProps> = ({
  fallback = <DefaultFallback />,
  children
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Higher-order component for lazy loading
export function withLazyLoading<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyLoadedComponent = lazy(importFunc);

  return React.forwardRef<any, React.ComponentProps<T>>((props, ref) => (
    <LazyComponent fallback={fallback}>
      <LazyLoadedComponent {...props} ref={ref} />
    </LazyComponent>
  ));
}

// Preload function for critical components
export function preloadComponent(importFunc: () => Promise<any>) {
  // Preload on interaction or when component might be needed
  const handlePreload = () => {
    importFunc().catch(err =>
      console.warn('Failed to preload component:', err)
    );
  };

  // Preload on hover, focus, or intersection
  return {
    onMouseEnter: handlePreload,
    onFocus: handlePreload,
    onTouchStart: handlePreload
  };
}

export default LazyComponent;
