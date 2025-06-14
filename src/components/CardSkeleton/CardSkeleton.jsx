const CardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse group relative overflow-hidden rounded-2xl shadow-lg bg-white"
        >
          {/* Image Placeholder */}
          <div className="relative h-64 w-full bg-gray-200" />

          {/* Content Placeholder */}
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>

            <div className="flex items-center space-x-2">
              <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-3 w-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
