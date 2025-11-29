import { useEffect, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  // Ellipsis,
  BadgeCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getAllFollowerPostThunk } from "../store/postSlice/post.thunk";
import Loader from "./Loader";

const PostFeed = () => {
  const dispatch = useAppDispatch();
  const { getFollowerPost, loading, nextCursor, hasMorePosts } = useAppSelector(
    (state) => state.post
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement>(null);

  // First load
  useEffect(() => {
    dispatch(getAllFollowerPostThunk(null));
  }, [dispatch]);

  // Infinite scroll: watch the last post
  useEffect(() => {
    if (loading.getAllFollowerPostLoading || !hasMorePosts) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          dispatch(getAllFollowerPostThunk(nextCursor));
        }
      },
      { threshold: 0.1 }
    );

    if (lastPostRef.current) observer.current.observe(lastPostRef.current);

    return () => observer.current?.disconnect();
  }, [nextCursor, loading.getAllFollowerPostLoading, hasMorePosts, dispatch]);

  const formatInstagramTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    return `${day} ${month}`;
  };

  if (loading.getAllFollowerPostLoading && getFollowerPost.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  if (getFollowerPost.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No posts from people you follow yet.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-20">
      {getFollowerPost.map((post, index) => {
        const isLastPost = index === getFollowerPost.length - 1;

        return (
          <article
            key={post._id}
            ref={isLastPost ? lastPostRef : null}
            className=" text-white border border-gray-900 rounded-sm mb-1 my-5"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.profileImage || "/default-avatar.png"}
                  alt={post.author.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-700"
                />
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      {post.author.username}
                      <BadgeCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-[12px] text-gray-500 m-2 uppercase tracking-wider font-medium">
                      {formatInstagramTime(post.createdAt)}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400">
                    {post.author.City}, {post.author.Country}
                  </div>
                </div>
              </div>
              {/* <button className="p-2 hover:bg-gray-900 rounded-full">
                <Ellipsis size={20} />
              </button> */}
            </header>

            {/* Image/Video */}
            <div className="bg-black">
              {post.mediaType === "video" ? (
                <video src={post.imageUrl} controls className="w-full" />
              ) : (
                <img src={post.imageUrl} alt="post" className="w-full" />
              )}
            </div>

            {/* Actions */}
            <div className="p-3">
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-5">
                  <button className="hover:scale-110 transition">
                    <Heart
                      size={26}
                      className="hover:fill-red-500 hover:text-red-500"
                    />
                  </button>
                  <button className="hover:scale-110 transition">
                    <MessageCircle size={26} />
                  </button>
                  <button className="hover:scale-110 transition">
                    <Share size={24} />
                  </button>
                </div>
                <button className="hover:scale-110 transition">
                  <Bookmark size={26} />
                </button>
              </div>

              {/* Likes */}
              <div className="font-semibold text-sm mb-1">
                {post.likes?.length || 0} likes
              </div>

              {/* Caption */}
              <div className="text-sm">
                <span className="font-semibold mr-2">
                  {post.author.username}
                </span>
                <span>{post.caption}</span>
              </div>

              {/* Comments */}
              {post.comments && post.comments.length > 0 && (
                <button className="text-gray-400 text-sm mt-2 hover:text-gray-300">
                  View all {post.comments.length} comments
                </button>
              )}

              {/* Timestamp */}
            </div>
          </article>
        );
      })}

      {/* Loading more */}
      {loading.getAllFollowerPostLoading && nextCursor && (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      )}

      {/* End of feed */}
      {!hasMorePosts && (
        <div className="text-center py-10 text-gray-500 text-sm">
          You're all caught up!
        </div>
      )}
    </div>
  );
};

export default PostFeed;
