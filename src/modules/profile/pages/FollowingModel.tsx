// components/FollowingModal.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getFollowingThunk } from "../../../store/follow/follow.thunk";

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const FollowingModal = ({ isOpen, onClose, userId }: FollowingModalProps) => {
  const dispatch = useAppDispatch();
  const { following, loading } = useAppSelector((state) => state.follow);
  // const currentUser = useAppSelector((state) => state.user.userProfile);
  // const isOwnProfile = currentUser?._id === userId;

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(getFollowingThunk(userId));
    }
  }, [isOpen, userId, dispatch]);

  //   const handleUnfollowUser = (followingId: string) => {
  //     dispatch(unfollowUserThunk(followingId))
  //       .unwrap()
  //       .then(() => {
  //         // Refresh the following list after unfollowing
  //         dispatch(getFollowingThunk(userId));
  //       })
  //       .catch((error) => {
  //         console.error("Failed to unfollow:", error);
  //       });
  //   };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E1F22] rounded-lg w-full max-w-md max-h-96 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Following</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto max-h-80">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          ) : following.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              Not following anyone yet
            </div>
          ) : (
            following.map((followedUser: any) => (
              <div
                key={followedUser._id}
                className="flex items-center justify-between p-4 hover:bg-[#25262B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={followedUser.profileImage || "/default-avatar.png"}
                    alt={followedUser.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium text-white">
                      {followedUser.username}
                    </p>
                    <p className="text-sm text-gray-400">
                      {followedUser.fullName}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
