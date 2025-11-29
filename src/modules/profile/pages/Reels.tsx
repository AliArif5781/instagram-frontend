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
  // sajid.rasheed
  // thank
  // sajid rasheed khan

  /*
  git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/AliArif5781/instagram-clone-backend.git
git push -u origin main
   */
  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
      ref={reelContainerRef}
    >
      {/* Pull-to-refresh indicator */}
      {isRefreshing && (
        <div className="text-white text-center py-2 z-50">Refreshing...</div>
      )}
      {posts.length === 0 && loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white">
          {posts.map((post, index) => (
            <div key={index} className="h-screen grid grid-cols-12">
              <div className="col-span-6 flex items-end justify-start p-8">
                <div className="w-full max-w-2xl">
                  {/* Author Info with Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={post.author.profileImage}
                      alt={post.author.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {post.author.username}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {post.author.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Caption */}
                  {post.caption && (
                    <p className="text-white text-lg leading-relaxed font-medium">
                      {post.caption}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-6 flex justify-center items-center">
                <div className="m-auto">
                  {post.mediaType === "video" ? (
                    <video
                      src={post.imageUrl}
                      className="reel-video h-[90vh] rounded-lg"
                      controls
                      muted
                    />
                  ) : (
                    <img
                      src={post.imageUrl}
                      alt={post.caption || "Post image"}
                      className="reel-video h-[90vh] rounded-lg object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load more indicator */}
      {loading && posts.length > 0 && (
        <div className="flex justify-center items-center py-4 text-white">
          <div className="border-4 border-white border-t-blue-500 rounded-full w-6 h-6 animate-spin mr-2" />
        </div>
      )}
    </div>
  );
};

export default Reels;
