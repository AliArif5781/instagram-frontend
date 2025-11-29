// components/FollowersModal.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getFollowersThunk } from "../../../store/follow/follow.thunk";

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const FollowersModal = ({ isOpen, onClose, userId }: FollowersModalProps) => {
  const dispatch = useAppDispatch();
  const { followers, loading } = useAppSelector((state) => state.follow);

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(getFollowersThunk(userId));
    }
  }, [isOpen, userId, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50 p-4 cursor-pointer">
      <div className="bg-[#1E1F22] rounded-lg w-full max-w-md max-h-96 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Followers</h3>
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
          ) : followers.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No followers yet
            </div>
          ) : (
            followers.map((follower: any) => (
              <div
                key={follower._id}
                className="flex items-center justify-between p-4 hover:bg-[#25262B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={follower.profileImage || "/default-avatar.png"}
                    alt={follower.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium text-white">
                      {follower.username}
                    </p>
                    <p className="text-sm text-gray-400">{follower.fullName}</p>
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

export default FollowersModal;
