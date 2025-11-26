import { Suspense, lazy } from "react";
import SkeletonLoader from "../components/common/SkeletonLoader";

/**
 * LazyComponent Wrapper
 * Provides consistent loading states for lazy-loaded components
 * Phase 4.1 - Performance Optimization
 *
 * Usage:
 * const MyComponent = lazyLoad(() => import('./MyComponent'), <ComponentSkeleton />);
 */

export const lazyLoad = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const DefaultFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

/**
 * Lazy load TinyMCE editor (large library)
 */
export const LazyRichTextEditor = lazyLoad(
  () => import("../components/forms/RichTextEditor"),
  <div className="p-4 border border-gray-300 rounded-lg">
    <SkeletonLoader variant="text" count={2} />
    <SkeletonLoader variant="rectangle" height="200px" className="mt-2" />
  </div>
);

/**
 * Lazy load chart components (heavy recharts library)
 */
export const LazyLineChart = lazyLoad(
  () => import("../components/charts/LineChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

export const LazyBarChart = lazyLoad(
  () => import("../components/charts/BarChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

export const LazyPieChart = lazyLoad(
  () => import("../components/charts/PieChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

export const LazyDonutChart = lazyLoad(
  () => import("../components/charts/DonutChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

export const LazyRadarChart = lazyLoad(
  () => import("../components/charts/RadarChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

export const LazyAreaChart = lazyLoad(
  () => import("../components/charts/AreaChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

export const LazyScatterChart = lazyLoad(
  () => import("../components/charts/ScatterChart"),
  <SkeletonLoader variant="rectangle" height="300px" />
);

/**
 * Lazy load export components (jsPDF, xlsx - only loaded when needed)
 */
export const LazyExportButton = lazyLoad(
  () => import("../components/export/ExportButton"),
  <SkeletonLoader variant="button" />
);

export const LazyReportBuilder = lazyLoad(
  () => import("../components/export/ReportBuilder"),
  <div className="p-6">
    <SkeletonLoader variant="title" width="50%" className="mb-4" />
    <SkeletonLoader variant="text" count={5} />
  </div>
);

export default lazyLoad;
