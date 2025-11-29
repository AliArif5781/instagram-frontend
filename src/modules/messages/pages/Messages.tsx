import { useEffect, useRef } from "react";
import type { Message } from "../../../types/type";
import { useAppSelector } from "../../../store/hook";
import MessageSkeleton from "../components/MessageSkeleton";

const Messages = ({ messageDetails }: { messageDetails: Message }) => {
  const { userProfile } = useAppSelector((state) => state.user);
  const { screenLoading } = useAppSelector((state) => state.msg);
  const messageRef = useRef<HTMLDivElement>(null);

  const isMyMessage = messageDetails.senderId === userProfile?._id;

  // Show skeleton while userProfile is loading
  // if (!userProfile?._id) {
  //   return <MessageSkeleton />;
  // }

  if (screenLoading) {
    return <MessageSkeleton />;
  }

  useEffect(() => {
    if (messageRef.current)
      messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={messageRef}
      className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
    >
      <div className="flex flex-col max-w-xs">
        <div
          className={`px-2 py-2 rounded-2xl mx-auto break-words ${
            isMyMessage
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-[var(--color-text-white)]"
              : "bg-[var(--color-active-gray)] text-[var(--color-text-white)]"
          }`}
        >
          {messageDetails.message}
        </div>
        <div
          className={`text-xs mt-1 px-1 font-semibold ${
            isMyMessage ? "text-gray-500 text-right" : "text-gray-500 text-left"
          }`}
        >
          {new Date(messageDetails?.createdAt!).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
