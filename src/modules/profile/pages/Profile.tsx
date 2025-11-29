// components/Profile.tsx
import { Image, Save } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../store/hook";
import { getPostsThunk } from "../../../store/postSlice/post.thunk";
import Loader from "../../../components/Loader";

// Lazy load children routes (PostsTab and SavedTab)
const LazyOutlet = lazy(() =>
  import("react-router-dom").then((mod) => ({ default: mod.Outlet }))
);

const Profile = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // The location.pathname.includes("/posts") is used to determine which tab is currently active and apply different styling.

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Tabs */}
      <div className="grid grid-cols-2 border-t border-gray-800 max-w-2xl mx-auto">
        {/* Posts Tab */}
        <Link
          to="/profile/posts"
          className={`flex items-center justify-center gap-2 py-4 border-t transition-all duration-200 group ${
            location.pathname.includes("/posts")
              ? "border-white text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <div
            className={
              location.pathname.includes("/posts")
                ? "text-white"
                : "text-gray-500 group-hover:text-gray-300"
            }
          >
            {location.pathname.includes("/posts") ? (
              <Image className="w-5 h-5" />
            ) : (
              <Image className="w-5 h-5" />
            )}
          </div>
          <span
            className={`text-xs font-medium uppercase tracking-wider ${
              location.pathname.includes("/posts")
                ? "text-white"
                : "text-gray-500 group-hover:text-gray-300"
            }`}
          >
            POSTS
          </span>
        </Link>

        {/* Saved Tab */}
        <Link
          to="/profile/saved"
          className={`flex items-center justify-center gap-2 py-4 border-t transition-all duration-200 group ${
            location.pathname.includes("/saved")
              ? "border-white text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <div
            className={
              location.pathname.includes("/saved")
                ? "text-white"
                : "text-gray-500 group-hover:text-gray-300"
            }
          >
            {location.pathname.includes("/saved") ? (
              <Save className="w-5 h-5" fill="currentColor" />
            ) : (
              <Save className="w-5 h-5" />
            )}
          </div>
          <span
            className={`text-xs font-medium uppercase tracking-wider ${
              location.pathname.includes("/saved")
                ? "text-white"
                : "text-gray-500 group-hover:text-gray-300"
            }`}
          >
            SAVED
          </span>
        </Link>
      </div>

      {/* Outlet - This will render either PostsTab or SavedTab */}
      <div className="mt-6">
        <Suspense fallback={<Loader />}>
          <LazyOutlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
