import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { useEffect } from "react";
import NoUserSelected from "./NoUserSelected";
import { getMessageThunk } from "../../../store/message/message.thunk";
import Messages from "./Messages";
import SendMessage from "../components/SendMessage";
import MessageSkeleton from "../components/MessageSkeleton";

const MessageChat = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.user);
  const { messages, screenLoading } = useAppSelector((state) => state.msg);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  console.log(selectedUser, "selectedUser");

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }));
    }
  }, [selectedUser?._id, dispatch]);

  // Early return - must be before any other hooks
  if (!selectedUser) {
    return <NoUserSelected />;
  }

  // ✅ FIX: Safe online status check
  const isUserOnline =
    Array.isArray(onlineUsers) &&
    selectedUser?._id &&
    onlineUsers.includes(selectedUser._id);

  // Debug logs
  console.log("🔍 MessageChat Debug:");
  console.log("  Selected User:", selectedUser.username, selectedUser._id);
  console.log("  Online Users Array:", onlineUsers);
  console.log("  Is User Online?", isUserOnline);

  return (
    <div className="flex-1 flex flex-col h-dvh bg-black text-white">
      {/* ---- Chat Header ---- */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800 flex-shrink-0">
        {/* ✅ Add relative container for the online dot */}
        <div className="relative">
          <img
            src={selectedUser.profileImage}
            alt={selectedUser.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          {/* Online indicator dot */}
          {isUserOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
          )}
        </div>

        <div className="flex-1">
          <p className="font-medium">{selectedUser.username}</p>
          {/* Online status text */}
          {isUserOnline ? (
            <p className="text-xs text-green-500 mt-1">Online</p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">Offline</p>
          )}
          {/* Full name */}
          <p className="text-xs text-gray-400">{selectedUser.fullName}</p>
        </div>
      </div>

      {/* ---- Messages Area ---- */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {screenLoading ? (
          <MessageSkeleton />
        ) : messages && messages.length > 0 ? (
          messages.map((messageDetails) => (
            <Messages
              key={messageDetails._id}
              messageDetails={messageDetails}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start a conversation!
          </div>
        )}
      </div>

      {/* ---- send message component ---- */}
      <SendMessage />
    </div>
  );
};

export default MessageChat;
