/**
 * SkeletonLoader Component
 * Provides better UX than spinners with content-aware loading states
 * Phase 4.1 - Performance Optimization
 */

const SkeletonLoader = ({
  variant = "text",
  width = "100%",
  height = "auto",
  count = 1,
  className = "",
  animation = "pulse",
}) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-700 rounded";

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  const variantClasses = {
    text: "h-4 mb-2",
    title: "h-8 mb-4",
    subtitle: "h-6 mb-3",
    avatar: "rounded-full w-12 h-12",
    "avatar-lg": "rounded-full w-16 h-16",
    rectangle: "h-48",
    card: "h-64",
    button: "h-10 w-32",
    input: "h-10",
    table: "h-12 mb-1",
  };

  const skeletonClass = `${baseClasses} ${animationClasses[animation]} ${
    variantClasses[variant] || ""
  } ${className}`;

  const style = {
    width: width,
    height: height !== "auto" ? height : undefined,
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClass} style={style} />
      ))}
    </>
  );
};

/**
 * Pre-built skeleton layouts for common use cases
 */

export const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonLoader key={`header-${i}`} variant="text" width="100%" />
        ))}
      </div>
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 mb-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonLoader
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text"
              width="100%"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow mb-4">
          <SkeletonLoader variant="title" width="60%" />
          <SkeletonLoader variant="text" count={3} />
          <div className="mt-4 flex gap-2">
            <SkeletonLoader variant="button" />
            <SkeletonLoader variant="button" />
          </div>
        </div>
      ))}
    </>
  );
};

export const ListSkeleton = ({ items = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <SkeletonLoader variant="avatar" />
          <div className="flex-1">
            <SkeletonLoader variant="text" width="40%" />
            <SkeletonLoader variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow">
            <SkeletonLoader variant="text" width="50%" />
            <SkeletonLoader variant="title" width="30%" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <SkeletonLoader variant="subtitle" width="40%" />
          <SkeletonLoader variant="rectangle" height="300px" />
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <SkeletonLoader variant="subtitle" width="40%" />
          <SkeletonLoader variant="rectangle" height="300px" />
        </div>
      </div>

      {/* Table */}
      <div className="p-6 bg-white rounded-lg shadow">
        <SkeletonLoader variant="subtitle" width="30%" className="mb-4" />
        <TableSkeleton rows={5} columns={4} />
      </div>
    </div>
  );
};

export const FormSkeleton = () => {
  return (
    <div className="space-y-4">
      <SkeletonLoader variant="title" width="50%" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <SkeletonLoader variant="text" width="30%" className="mb-2" />
          <SkeletonLoader variant="input" />
        </div>
      ))}
      <div className="flex gap-2 mt-6">
        <SkeletonLoader variant="button" />
        <SkeletonLoader variant="button" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
