// components/PostDetail.tsx
import React from "react";
import { X, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import type { getPost } from "../../../types/type";

export interface PostDetailProps {
  post: getPost;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 overflow-hidden z-50">
      <div className="grid grid-cols-1 bg-black lg:grid-cols-[1fr_400px] w-full max-w-6xl max-h-[90vh] rounded-lg overflow-hidden">
        {/* Left side - Post Media */}
        <div className="bg-black flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
          {post.mediaType === "image" ? (
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-contain max-h-[80vh] bg-black"
            />
          ) : (
            <video
              src={post.imageUrl}
              className="w-full h-full object-cover"
              muted
              controls
            />
          )}
        </div>

        {/* Right side - Post Details */}
        <div className="flex flex-col h-full">
          {/* Header - Author Info */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={post.author.profileImage || "/default-avatar.png"}
                alt={post.author?.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-sm">
                {post.author?.username}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-600 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Comments Section - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            <div className="flex items-start space-x-3">
              <img
                src={post.author?.profileImage || "/default-avatar.png"}
                alt={post.author?.username}
                className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-sm mr-2">
                  {post.author?.username}
                </span>
                <span className="text-sm break-words text-[var(--color-light-gray)]">
                  {post.caption}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Comments List */}
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-4">
                {post.comments.map((comment: any) => (
                  <div key={comment._id} className="flex items-start space-x-3">
                    <img
                      src={comment.author?.avatar || "/default-avatar.png"}
                      alt={comment.author?.username}
                      className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm mr-2">
                        {comment.author?.username}
                      </span>
                      <span className="text-sm break-words">
                        {comment.text}
                      </span>
                      <div className="flex space-x-3 mt-1">
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

          {/* Actions Section */}
          <div className="border-t p-4 space-y-3">
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
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
            <div className="text-sm font-semibold">
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

            {/* Add Comment Input */}
            <div className="flex items-center space-x-2 pt-2 border-t">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border-none focus:ring-0 text-sm py-2 px-0 placeholder-gray-500 outline-none "
              />
              <button className="text-blue-500 font-semibold text-sm hover:text-blue-700 disabled:text-blue-300 disabled:cursor-not-allowed transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

// https://docs.google.com/document/d/1emp1V0AfwyWvW1vCz7RnqjjanaExveExYqiL_RsD_pM/edit?tab=t.0#heading=h.sbddtxshgj7h
// neetcode.io
