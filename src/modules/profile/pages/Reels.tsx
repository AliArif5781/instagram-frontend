import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { fetchReelPostsThunk } from "../../../store/postSlice/post.thunk";
import Loader from "../../../components/Loader";

const Reels = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, pagination, isRefreshing } = useAppSelector(
    (state) => state.post.reels
  );
  // const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchReelPostsThunk({ limit: 3 }));
  }, [dispatch]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!reelContainerRef.current || loading || !pagination.hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } =
        reelContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        /*
scrollTop = how far you've scrolled from top
clientHeight = visible area height
scrollHeight = total content height
-50 = loads when 50px from bottom (gives buffer)
         */
        dispatch(
          fetchReelPostsThunk({
            limit: 3,
            cursor: pagination.nextCursor,
          })
        );
      }
    };

    const container = reelContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, pagination]);

  // Pull-to-refresh handler
  const handleRefresh = () => {
    if (!loading && posts.length > 0) {
      dispatch(
        fetchReelPostsThunk({
          limit: 3,
          sinceId: posts[0]?._id,
        })
      );
    }
  };

  // Handle video visibility for auto-play
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    // handleIntersection =  The function to call when visibility changes
    // entries=  array of elements being watched
    // IntersectionObserverEntry[] = type (objects containing visibility info)
    entries.forEach((entry) => {
      const element = entry.target as HTMLVideoElement | HTMLImageElement;
      if (entry.isIntersecting) {
        // entry.isIntersecting = is the element visible on screen? (true/false)
        if (element instanceof HTMLVideoElement) {
          element.play();
        } else {
          if (element instanceof HTMLVideoElement) {
            element.pause();
          }
        }
        // setCurrentReelIndex(Number(video.dataset.index));
      } else {
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      // IntersectionObserver  = A built-in browser tool that watches when elements enter/leave the screen
      threshold: 0.7, // Trigger when 70% visible
    });
    // 2. Find all elements with class "reel-video"
    const videos = document.querySelectorAll(".reel-video");
    // 3. Start watching each one
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [posts]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <p>{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
      ref={reelContainerRef}
    >
      {/* Pull-to-refresh indicator */}
      {isRefreshing && (
        <div className="fixed top-0 left-0 right-0 text-white text-center py-2 z-50 bg-black/50">
          Refreshing...
        </div>
      )}

      {posts.length === 0 && loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white">
          {posts.map((post, index) => (
            <div
              key={index}
              className="h-screen snap-start relative
            grid grid-cols-1 md:grid-cols-12
            bg-black"
            >
              <div
                className="
            col-span-1 md:col-span-6 
            h-full w-full
            flex justify-center items-center
            order-2 md:order-2
            absolute md:relative
            inset-0 md:inset-auto
          "
              >
                <div className="relative w-full h-full md:w-auto md:h-auto flex items-center justify-center">
                  {post.mediaType === "video" ? (
                    <video
                      src={post.imageUrl}
                      className="w-full h-full md:h-[90vh] md:w-auto object-cover md:rounded-lg"
                      controls
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={post.imageUrl}
                      alt={post.caption || "Post image"}
                      className="w-full h-full md:h-[90vh] md:w-auto object-cover md:rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Content Container - Overlay on mobile, left side on desktop */}
              <div
                className="
            col-span-1 md:col-span-6 
            flex items-end md:items-end justify-start
            p-4 sm:p-6 md:p-8
            order-1 md:order-1
            absolute md:relative
            bottom-0 left-0 right-0 md:inset-auto
            bg-linear-to-t from-black/80 via-black/40 to-transparent md:bg-none
            z-10 md:z-auto
            pointer-events-none md:pointer-events-auto
          "
              >
                <div className="w-full max-w-2xl pointer-events-auto">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                    <img
                      src={post.author.profileImage}
                      alt={post.author.username}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/30 md:border-white/20"
                    />
                    <div>
                      <h3 className="text-base md:text-xl font-semibold text-white drop-shadow-lg md:drop-shadow-none">
                        {post.author.username}
                      </h3>
                      <p className="text-gray-200 md:text-gray-300 text-xs md:text-sm drop-shadow-lg md:drop-shadow-none">
                        {post.author.fullName}
                      </p>
                    </div>
                  </div>

                  {post.caption && (
                    <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed font-medium drop-shadow-lg md:drop-shadow-none line-clamp-3 md:line-clamp-none">
                      {post.caption}
                    </p>
                  )}
                </div>
              </div>

              <div
                className="
            md:hidden
            absolute right-2 sm:right-4 bottom-20 sm:bottom-24
            flex flex-col gap-4 sm:gap-6
            z-20
          "
              >
                {/* Like Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                    {post.likes || 0}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                    {post.comments || 0}
                  </span>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </div>
                </button>

                {/* More Options */}
                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load more indicator */}
      {loading && posts.length > 0 && (
        <div className="flex justify-center items-center py-4 text-white bg-black">
          <div className="border-4 border-white border-t-blue-500 rounded-full w-6 h-6 animate-spin mr-2" />
          <span className="text-sm">Loading more...</span>
        </div>
      )}
    </div>
  );
};

export default Reels;
