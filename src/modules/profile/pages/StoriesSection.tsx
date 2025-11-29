import React, { useState } from "react";
import StoryCircle from "./StoryCircle";
import { useAppSelector } from "../../../store/hook";
import { Link } from "react-router-dom";

const StoriesSection: React.FC = () => {
  const { getStories } = useAppSelector((state) => state.post);
  const { userProfile } = useAppSelector((state) => state.user);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenStory = (story: any) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex p-4 relative">
      <div className="">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {getStories.map((story) => (
            <StoryCircle
              key={story._id}
              username={story.user.username}
              avatar={story.user.profileImage}
              hasNewStory={true}
              onClick={() => handleOpenStory(story)} // open modal
            />
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory ? (
        <div
          className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ${
            showModal ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={handleClose}
        >
          <div
            className="bg-black rounded-xl overflow-hidden shadow-lg max-w-lg w-full mx-3 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
              <img
                src={selectedStory.user.profileImage}
                alt={selectedStory.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-semibold">
                  {selectedStory.user.username}
                </p>
                <p className="text-gray-400 text-sm ">
                  {selectedStory.caption}
                </p>
              </div>
            </div>

            {/* Story Image */}
            <div className="w-full h-[70vh] bg-black">
              <img
                src={selectedStory.imageUrl}
                alt="Story"
                className="object-contain w-full h-full transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0 flex flex-col cursor-pointer px-1">
          <Link to={"/createStory"}>
            <div
              className={`w-16 h-16 rounded-full border-2 border-[var(--color-active-gray)] overflow-hidden `}
            >
              <img
                src={userProfile?.profileImage}
                alt={userProfile?.username}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="text-xs text-white truncate max-w-[70px] text-center mt-1">
            <p>{userProfile?.username}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesSection;
