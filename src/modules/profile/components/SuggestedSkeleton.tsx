const SuggestedSkeleton = () => {
  return (
    <section className="mt-6">
      {/* Header Skeleton */}
      {/* <div className="flex items-center justify-between px-3 mb-4">
        <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 w-12 bg-gray-700 rounded animate-pulse opacity-0"></div>
      </div> */}

      {/* Suggested Users List Skeleton */}
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between md:px-14"
          >
            <div className="flex items-center gap-3">
              {/* Profile Image Skeleton */}
              <div className="h-9 w-9 rounded-full bg-gray-700 animate-pulse"></div>

              {/* User Info Skeleton */}
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-2 w-20 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedSkeleton;
