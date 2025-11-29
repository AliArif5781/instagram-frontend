import { useState } from "react";
import { useAppSelector } from "../../../store/hook";
import NoPost from "../components/NoPost";
import type { getPost } from "../../../types/type";
import Loader from "../../../components/Loader";
import SearchUserPostDetails from "./SearchUserPostDetails";

const SearchUserPost = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { searchUserPosts, screenLoading } = useAppSelector(
    (state) => state.post
  );

  // Show loading state
  if (screenLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );
  }

  // Show no posts state - FIXED CONDITION
  if (!searchUserPosts || searchUserPosts.length === 0) {
    console.log("❌ No posts to display");
    return (
      <div className="text-center py-12">
        <NoPost />
        <p className="text-gray-500 mt-4">
          This user hasn't posted anything yet
        </p>
      </div>
    );
  }

  const handlePostClick = (post: getPost) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 ">
        {searchUserPosts.map((post) => (
          <div
            onClick={() => handlePostClick(post)}
            key={post._id}
            className="group relative aspect-square rounded-lg  cursor-pointer hover:opacity-80 transition-all duration-300"
          >
            {/* <img
              src={post?.imageUrl}
              alt={post?.caption || "Post image"}
              className="w-full h-full object-cover rounded-lg"
            /> */}
            {post.mediaType === "video" ? (
              <video
                src={post.imageUrl}
                className="w-full h-full object-cover rounded-lg"
                muted
              />
            ) : (
              <img
                src={post.imageUrl}
                alt={post.caption || "Post image"}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {/* Instagram-like overlay on hover */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          </div>
        ))}
      </div>
      <SearchUserPostDetails
        post={selectedPost}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default SearchUserPost;
