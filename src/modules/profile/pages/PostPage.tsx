import { lazy, Suspense, useState } from "react";
import { useAppSelector } from "../../../store/hook";
import type { getPost } from "../../../types/type";
import NoPost from "../components/NoPost";
import Loader from "../../../components/Loader";
import { Play } from "lucide-react";

const PostDetail = lazy(() => import("./PostDetail"));

const PostPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { count, posts } = useAppSelector((state) => state.post);

  if (!posts || count === 0) {
    return (
      <div>
        <NoPost />
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

  console.log(
    posts.map((post) => post),
    "ppp"
  );

  return (
    <>
      <div
        className={`grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 ${
          isDetailOpen && "opacity-30 blur-2xl transition-all duration-300"
        }`}
      >
        {posts.map((post) => (
          <div
            onClick={() => handlePostClick(post)}
            key={post._id}
            className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-all duration-300"
          >
            {/* Render based on mediaType */}
            {post.mediaType === "video" ? (
              <>
                <video
                  src={post.imageUrl}
                  className="w-full h-full object-cover"
                  muted
                  // loop
                  playsInline
                  // onMouseEnter={(e) => e.currentTarget.play()}
                  // onMouseLeave={(e) => {
                  //   e.currentTarget.pause();
                  //   e.currentTarget.currentTime = 0;
                  // }}
                />
                {/* Video indicator */}
                <div className="absolute top-2 right-2  bg-opacity-60 rounded-full p-1">
                  <Play size={16} className="" fill="white" />
                </div>
              </>
            ) : (
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            )}

            {/* Hover overlay for likes/comments */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-6 text-white">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {post.likes?.length || 0}
                  </span>
                  <span>likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {post.comments?.length || 0}
                  </span>
                  <span>comments</span>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      {/* Post Details */}
      <Suspense fallback={<Loader />}>
        <PostDetail
          post={selectedPost}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      </Suspense>
    </>
  );
};

export default PostPage;
