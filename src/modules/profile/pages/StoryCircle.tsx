import React from "react";
import type { StoryCircleProps } from "../../../types/type";

const StoryCircle: React.FC<StoryCircleProps> = ({
  username,
  avatar,
  hasNewStory = false,
  onClick,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const gradient = hasNewStory
    ? "bg-gradient-to-tr from-yellow-400 to-purple-600 p-[3px] rounded-full"
    : "bg-gray-400 p-0.5 rounded-full";

  return (
    <div
      className="flex-shrink-0 flex flex-col items-center space-y-1 cursor-pointer px-1"
      onClick={onClick}
    >
      <div className={gradient}>
        <div
          className={`${sizeClasses[size]} rounded-full border-2  overflow-hidden `}
        >
          <img
            src={avatar}
            alt={username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs text-white truncate max-w-[70px] text-center">
        {username}
      </p>
    </div>
  );
};

export default StoryCircle;
