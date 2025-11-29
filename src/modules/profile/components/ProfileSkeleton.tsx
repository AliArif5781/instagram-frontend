const ProfileSkeleton = () => {
  // i use in homePage right most section load when userProfile didnot laod.
  return (
    <section className="flex items-center justify-around p-3 px-5 mt-5">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative overflow-hidden">
          <div className="h-11 w-11 rounded-full bg-gray-600"></div>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-shimmer"></div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3.5 w-28 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="h-2.5 w-20 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
