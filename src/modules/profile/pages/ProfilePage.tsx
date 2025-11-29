// components/ProfilePage.tsx
import { useEffect, useState, lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import Profile from "./Profile";
import {
  followUserThunk,
  unfollowUserThunk,
  getFollowStatusThunk,
} from "../../../store/follow/follow.thunk";
import { Link, useParams } from "react-router-dom";

// Lazy load the modal components
const FollowersModal = lazy(() => import("./FollowerModel"));
const FollowingModal = lazy(() => import("./FollowingModel"));
const EditProfileDialog = lazy(() => import("./EditProfileDialog"));

// Loading component for modals
const ModalLoadingFallback = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-[#1E1F22] rounded-lg w-full max-w-md max-h-96 overflow-hidden flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  </div>
);

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const { userProfile } = useAppSelector((state) => state.user);
  const { count } = useAppSelector((state) => state.post);
  const { isFollowing, loading } = useAppSelector((state) => state.follow);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [modalsLoaded, setModalsLoaded] = useState(false);

  // Get current logged-in user
  const currentUser = useAppSelector((state) => state.user.userProfile);

  // Check if this is current user's own profile
  const isOwnProfile = currentUser?._id === userProfile?._id;

  // Handle follow action
  const handleFollow = () => {
    if (userId) {
      dispatch(followUserThunk(userId))
        .unwrap()
        .then(() => {
          dispatch(getFollowStatusThunk(userId));
        });
    }
  };

  // Handle unfollow action
  const handleUnfollow = () => {
    if (userId) {
      dispatch(unfollowUserThunk(userId))
        .unwrap()
        .then(() => {
          dispatch(getFollowStatusThunk(userId));
        });
    }
  };

  // Handle show followers modal with preloading
  const handleShowFollowers = () => {
    setShowFollowers(true);
  };

  // Handle show following modal with preloading
  const handleShowFollowing = () => {
    setShowFollowing(true);
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const closeModals = () => {
    setShowFollowers(false);
    setShowFollowing(false);
    setShowEditProfile(false);
  };

  const handlePreloadModals = () => {
    if (!modalsLoaded) {
      setModalsLoaded(true);
    }
  };

  // Fetch follow status for other users
  useEffect(() => {
    if (userId && !isOwnProfile) {
      dispatch(getFollowStatusThunk(userId));
    }
  }, [userId, isOwnProfile, dispatch]);

  const targetUserId = userProfile?._id || userId || "";

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-dvh text-white py-6">
      {/* Profile Header */}
      <header
        className={`w-full flex justify-center mb-8 transition-all duration-300 ${
          showFollowers || showFollowing || showEditProfile ? "blur-sm" : ""
        }`}
        onMouseEnter={handlePreloadModals}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center">
          {/* Profile Image Section */}
          <Link
            to={"/createStory"}
            className="flex justify-center md:col-span-3 relative group"
          >
            {/* Gradient wrapper */}
            <div className="rounded-full">
              <img
                src={userProfile?.profileImage || "/default-avatar.png"}
                alt={userProfile?.fullName || "Profile"}
                className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover shadow-lg transition-all duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Tooltip */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[var(--color-active-gray)] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Create story
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--color-active-gray)] rotate-45"></div>
            </div>
          </Link>

          {/* Profile Info Section */}
          <div className="md:col-span-9 p-4 sm:p-6 space-y-4 text-center md:text-left">
            {/* Username and Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl text-[#F5F5F5] font-light">
                {userProfile?.username}
              </h1>

              {/* Follow/Unfollow Button or Edit Profile */}
              {isOwnProfile ? (
                <button
                  onClick={handleEditProfile}
                  className="w-full sm:w-auto bg-[#18191b] hover:bg-[#25292E] text-[#F5F5F5] px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 active:scale-95 font-medium"
                >
                  Edit profile
                </button>
              ) : (
                <div className="flex gap-2">
                  {isFollowing ? (
                    <button
                      onClick={handleUnfollow}
                      disabled={loading}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 active:scale-95 font-medium disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Unfollow"}
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      disabled={loading}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 active:scale-95 font-medium disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Follow"}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 sm:gap-8 pt-3 sm:pt-4">
              {/* Posts */}
              <div className="flex items-center gap-1 text-sm sm:text-base text-[#F5F5F5]">
                <span className="font-semibold">{count || 0}</span>
                <span className="text-[#A8A8A8]">posts</span>
              </div>

              {/* Followers - Clickable */}
              <button
                onClick={handleShowFollowers}
                onMouseEnter={handlePreloadModals}
                className="flex items-center gap-1 text-sm sm:text-base text-[#F5F5F5] hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span className="font-semibold">
                  {userProfile?.followersCount || 0}
                </span>
                <span className="text-[#A8A8A8]">followers</span>
              </button>

              {/* Following - Clickable */}
              <button
                onClick={handleShowFollowing}
                onMouseEnter={handlePreloadModals}
                className="flex items-center gap-1 text-sm sm:text-base text-[#F5F5F5] hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span className="font-semibold">
                  {userProfile?.followingCount || 0}
                </span>
                <span className="text-[#A8A8A8]">following</span>
              </button>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              {userProfile?.fullName && (
                <span className="font-medium text-base sm:text-lg text-[#F5F5F5] block">
                  {userProfile.fullName}
                </span>
              )}
              <div>
                <span className="leading-relaxed text-base text-[var(--color-dark-gray)] font-medium  max-w-md block mx-auto md:mx-0">
                  {userProfile?.bio ? (
                    userProfile.bio
                  ) : (
                    <div className="opacity-35 text-gray-500">
                      Write your bio
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Post Section */}
      <div
        className={showEditProfile ? "blur-sm transition-all duration-300" : ""}
      >
        <Profile />
      </div>

      {/* Lazy Loaded Modals with Suspense */}
      {(showFollowers || showFollowing || showEditProfile || modalsLoaded) && (
        <Suspense fallback={<ModalLoadingFallback />}>
          {showFollowers && (
            <FollowersModal
              isOpen={showFollowers}
              onClose={closeModals}
              userId={targetUserId}
            />
          )}
          {showFollowing && (
            <FollowingModal
              isOpen={showFollowing}
              onClose={closeModals}
              userId={targetUserId}
            />
          )}
          {showEditProfile && (
            <EditProfileDialog isOpen={showEditProfile} onClose={closeModals} />
          )}
        </Suspense>
      )}
    </div>
  );
};

export default ProfilePage;
