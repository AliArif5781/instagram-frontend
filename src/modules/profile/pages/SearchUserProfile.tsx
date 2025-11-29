import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  followUserThunk,
  unfollowUserThunk,
  getFollowersThunk,
  getFollowingThunk,
  getFollowStatusThunk,
} from "../../../store/follow/follow.thunk";
import { getUserByIdThunk } from "../../../store/slice/user.thunk";
import Loader from "../../../components/Loader";
import { getUserPostsThunk } from "../../../store/postSlice/post.thunk";

const SearchUserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { searchedUser, currentUser } = useAppSelector((state) => state.user);
  const { followers, following, isFollowing, loading } = useAppSelector(
    (state) => state.follow
  );
  const { searchUserPostsCount } = useAppSelector((state) => state.post);

  // const { searchUserPosts, searchUserPostsCount, screenLoading } =
  //   useAppSelector((state) => state.post);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  const isOwnProfile = userId === currentUser?._id;

  // console.log("=== SEARCH USER PROFILE DEBUG ===");
  // console.log("URL UserID:", userId);
  // console.log("Current User ID:", currentUser?._id);
  // console.log("Is Own Profile:", isOwnProfile);
  // console.log("Is Following:", isFollowing); // From getFollowStatusThunk
  // console.log("Follow Loading:", loading);
  // console.log("=== END DEBUG ===");
  // console.log(searchedUser, "searchUSesr");

  useEffect(() => {
    if (userId) {
      setLocalLoading(true);

      // Fetch user data
      dispatch(getUserByIdThunk(userId));

      // Fetch follow status - THIS IS THE KEY
      dispatch(getFollowStatusThunk(userId))
        .unwrap()
        .then(() => {
          // response
          setLocalLoading(false);
        })
        .catch(() => {
          // error
          setLocalLoading(false);
        });

      // Fetch their followers and following lists
      dispatch(getFollowersThunk(userId));
      dispatch(getFollowingThunk(userId));

      dispatch(getUserPostsThunk(userId));
    }
  }, [dispatch, userId]);

  const handleFollow = () => {
    if (userId && !isFollowing) {
      dispatch(followUserThunk(userId))
        .unwrap()
        .then(() => {
          // result
          // Refresh follow status after successful follow
          dispatch(getFollowStatusThunk(userId));
        })
        .catch((error) => {
          console.error("❌ Follow failed:", error);
        });
    }
  };

  const handleUnfollow = () => {
    if (userId && isFollowing) {
      dispatch(unfollowUserThunk(userId))
        .unwrap()
        .then(() => {
          // result
          // Refresh follow status
          dispatch(getFollowStatusThunk(userId));
        })
        .catch((error) => {
          console.error("❌ Unfollow failed in component:", error);
          console.error("❌ Error details:", error.message, error.payload);
        });
    } else {
      console.log("⚠️ Cannot unfollow - invalid state:", {
        userId,
        isFollowing,
      });
    }
  };

  const handleShowFollowers = () => {
    setShowFollowers(true);
    setShowFollowing(false);
  };

  const handleShowFollowing = () => {
    setShowFollowing(true);
    setShowFollowers(false);
  };

  const closeModals = () => {
    setShowFollowers(false);
    setShowFollowing(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Show loading if no user data or still loading follow status
  if (localLoading || !searchedUser) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-dvh text-white py-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span>← Back</span>
      </button>

      {/* Profile Header */}
      <header className="w-full flex justify-center mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center">
          {/* Profile Image Section */}
          <div className="flex justify-center md:col-span-3">
            <img
              src={searchedUser.profileImage}
              alt={searchedUser.fullName || "Profile"}
              className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover shadow-lg border-2 border-gray-600"
            />
          </div>

          {/* Profile Info Section */}
          <div className="md:col-span-9 p-4 sm:p-6 space-y-4 text-center md:text-left">
            {/* Username and Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start  gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl text-[#F5F5F5] font-light">
                  {searchedUser.username}
                </h1>
                {searchedUser.fullName && (
                  <p className="text-gray-400 text-sm mt-1">
                    {searchedUser.fullName}
                  </p>
                )}
              </div>

              {/* Follow/Unfollow buttons - Uses isFollowing from getFollowStatusThunk */}
              {!isOwnProfile && (
                <div className="flex md:ml-5">
                  {isFollowing ? (
                    <button
                      onClick={handleUnfollow}
                      disabled={loading}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Loading...
                        </div>
                      ) : (
                        "Unfollow"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      disabled={loading || isFollowing}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Loading...
                        </div>
                      ) : (
                        "Follow"
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Stats - Use searchedUser's counts */}
            <div className="flex justify-center md:justify-start gap-6 sm:gap-8 pt-3 sm:pt-4">
              {/* Posts */}
              <div className="flex items-center gap-1 text-sm sm:text-base text-[#F5F5F5]">
                <span className="font-semibold">
                  {searchUserPostsCount || 0}
                </span>
                <span className="text-[#A8A8A8]">posts</span>
              </div>

              {/* Followers */}
              <button
                onClick={handleShowFollowers}
                className="flex items-center gap-1 text-sm sm:text-base text-[#F5F5F5] hover:text-blue-400 transition-colors"
              >
                <span className="font-semibold">
                  {searchedUser.followersCount || 0}
                </span>
                <span className="text-[#A8A8A8]">followers</span>
              </button>

              {/* Following */}
              <button
                onClick={handleShowFollowing}
                className="flex items-center gap-1 text-sm sm:text-base text-[#F5F5F5] hover:text-blue-400 transition-colors"
              >
                <span className="font-semibold">
                  {searchedUser.followingCount || 0}
                </span>
                <span className="text-[#A8A8A8]">following</span>
              </button>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <div>
                {searchedUser.bio ? (
                  <span className="leading-relaxed text-sm sm:text-base text-[#EFEFEF] max-w-2xl block mx-auto md:mx-0">
                    {searchedUser.bio}
                  </span>
                ) : (
                  <div className="opacity-35 text-gray-500">
                    {isOwnProfile ? "Write your bio" : "No bio yet"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E1F22] rounded-lg w-full max-w-md max-h-96 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Followers</h3>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              {followers.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  No followers yet
                </div>
              ) : (
                followers.map((follow) => (
                  <div
                    key={follow._id}
                    className="flex items-center justify-between p-4 hover:bg-[#25262B]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={follow.profileImage}
                        alt={follow.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{follow.username}</p>
                        <p className="text-sm text-gray-400">
                          {follow.fullName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E1F22] rounded-lg w-full max-w-md max-h-96 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Following</h3>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              {following.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  Not following anyone yet
                </div>
              ) : (
                following.map((following) => (
                  <div
                    key={following._id}
                    className="flex items-center justify-between p-4 hover:bg-[#25262B]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={following.profileImage}
                        alt={following.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{following.username}</p>
                        <p className="text-sm text-gray-400">
                          {following.fullName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Tabs */}
        <div className="grid grid-cols-2 border-t border-gray-800 max-w-2xl mx-auto">
          {/* Posts Tab */}
          <Link
            to={`/user/${userId}/posts`}
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
            ></div>
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
        </div>

        {/* Outlet - This will render either PostsTab or SavedTab */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SearchUserProfile;
