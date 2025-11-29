import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getOtherUsersThunk } from "../../../store/slice/user.thunk";
import type { otherUsers } from "../../../types/type";
import SkeletonLoader from "../components/SkeletonLoader";
import OtherUsers from "./OtherUsers";

const MessageSidebar = () => {
  const { otherUser, userProfile, screenLoading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOtherUsersThunk());
  }, [dispatch]);

  // Show skeleton while loading
  if (screenLoading || !otherUser) {
    return <SkeletonLoader />;
  }

  return (
    <div
      className={`h-dvh border-r w-[20rem] border-gray-800 left-0 top-0 transition-all duration-300 z-50 bg-black text-white flex flex-col`}
    >
      {/* ---- Current User Profile ---- */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-3 flex-shrink-0">
        <img
          src={userProfile?.profileImage}
          alt={userProfile?.username}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold">{userProfile?.username}</h2>
          <p className="text-gray-400 text-sm">{userProfile?.fullName}</p>
        </div>
      </div>

      {/* ---- Other Users List ---- */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <h3 className="px-6 py-3 text-gray-400 text-sm font-medium uppercase flex-shrink-0">
          Messages
        </h3>
        <div className="flex-1 overflow-y-auto">
          <ul>
            {otherUser && otherUser.length > 0 ? (
              otherUser.map((user: otherUsers) => (
                <OtherUsers key={user._id} otherUserDetails={user} />
              ))
            ) : (
              <p className="px-6 py-3 text-gray-400 text-sm">No users found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageSidebar;
