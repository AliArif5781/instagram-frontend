const SkeletonLoader = () => {
  return (
    <div className="h-dvh border-r w-[22rem] border-gray-800 fixed left-0 top-0 transition-all duration-300 z-50 bg-black text-white flex flex-col">
      {/* ---- Current User Profile Skeleton ---- */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-3 flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>

      {/* ---- Other Users List Skeleton ---- */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-6 py-3 flex-shrink-0">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="flex items-center gap-3 px-6 py-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-700 rounded animate-pulse mb-1 w-2/3"></div>
                  <div className="h-2 bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
