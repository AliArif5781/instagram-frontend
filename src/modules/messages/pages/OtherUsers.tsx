import type { otherUsers } from "../../../types/type";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { setSelectedUser } from "../../../store/slice/user.slice";

interface otherUserProps {
  otherUserDetails: otherUsers;
}
const OtherUsers = ({ otherUserDetails }: otherUserProps) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.user);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  const isUserOnline =
    Array.isArray(onlineUsers) &&
    selectedUser?._id &&
    onlineUsers.includes(selectedUser._id);

  // Debug logs
  console.log("🔍 MessageChat Debug:");
  console.log("  Selected User:", selectedUser?.username, selectedUser?._id);
  console.log("  Online Users Array:", onlineUsers);
  console.log("  Is Array?", Array.isArray(onlineUsers));
  console.log("  Is User Online?", isUserOnline);

  const handleUserClick = () => {
    dispatch(setSelectedUser(otherUserDetails));
  };

  return (
    <div onClick={handleUserClick}>
      <li
        key={otherUserDetails._id}
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-[var(--color-hover-gray)] transition ${
          selectedUser?._id === otherUserDetails._id &&
          "bg-[var(--color-active-gray)]"
        }`}
      >
        <div className="relative">
          <img
            src={otherUserDetails.profileImage}
            alt={otherUserDetails.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          {/* {isUserOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
          )} */}
        </div>
        {/* {isUserOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
        )} */}
        <div>
          <p className="text-sm font-medium">{otherUserDetails?.username}</p>
          <p className="text-xs text-gray-400">{otherUserDetails?.fullName}</p>
        </div>
      </li>
    </div>
  );
};

export default OtherUsers;
