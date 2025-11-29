import { Bookmark, Heart, MessageCircle, Share, X } from "lucide-react";
import React from "react";
import type { PostDetailProps } from "./PostDetail";

const SearchUserPostDetails: React.FC<PostDetailProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-80 z-50">
      <div className=" rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Post Media */}
        <div className="lg:w-3/5 bg-black flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
          {post.mediaType === "video" ? (
            <video
              src={post.imageUrl}
              controls
              className="w-full h-full object-contain max-h-[80vh]"
            />
          ) : (
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-contain max-h-[80vh]"
            />
          )}
        </div>

        {/* Right side - Post Details */}
        <div className="lg:w-2/5 flex flex-col h-full">
          {/* Header - Author Info */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              {post.author?.profileImage ? (
                <img
                  src={post.author.profileImage}
                  alt={post.author?.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                  {post.author?.username?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-semibold text-sm">
                {post.author?.username}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-900 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Caption Section */}

            {/* Comments Section */}
            <div className="p-4 lg:my-28 space-y-6">
              {post.comments && post.comments.length > 0 ? (
                <div className="space-y-4">
                  {post.comments.map((comment: any) => (
                    <div
                      key={comment._id}
                      className="flex items-start space-x-3"
                    >
                      {comment.author?.avatar ? (
                        <img
                          src={comment.author.avatar}
                          alt={comment.author?.username}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {comment.author?.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">
                            {comment.author?.username}
                          </span>
                          <span className="text-sm text-gray-800 wrap-break">
                            {comment.text}
                          </span>
                        </div>
                        <div className="flex space-x-4">
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm py-8">
                  No comments yet.
                </div>
              )}
            </div>
          </div>

          {/* Fixed Bottom Section */}
          <div className="border-t">
            {/* Action Buttons */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-4">
                  <button className="p-1 hover:opacity-70 transition-opacity">
                    <Heart size={24} />
                  </button>
                  <button className="p-1 hover:opacity-70 transition-opacity">
                    <MessageCircle size={24} />
                  </button>
                  <button className="p-1 hover:opacity-70 transition-opacity">
                    <Share size={24} />
                  </button>
                </div>
                <button className="p-1 hover:opacity-70 transition-opacity">
                  <Bookmark size={24} />
                </button>
              </div>

              {/* Likes Count */}
              <div className="text-sm font-semibold mb-2">
                {post.likes?.length || 0} likes
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-500 uppercase">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Add Comment Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 border-none focus:ring-0 text-sm py-2 px-0 placeholder-gray-500 outline-none bg-transparent"
                />
                <button className="text-blue-500 font-semibold text-sm hover:text-blue-700 disabled:text-blue-300 disabled:cursor-not-allowed transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserPostDetails;
