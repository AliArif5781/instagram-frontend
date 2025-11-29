import { useEffect } from "react";
import StoriesSection from "./StoriesSection";
import { useAppDispatch } from "../../../store/hook";
import { getStoriesThunk } from "../../../store/postSlice/post.thunk";
import PostFeed from "../../../components/PostFeed";

const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStoriesThunk());
  }, [dispatch]);

  return (
    <div className=" h-dvh">
      <div className="max-w-2xl overflow-x-auto">
        <StoriesSection />
      </div>

      {/* Feed Posts */}
      <div className="w-full">
        <PostFeed />
      </div>
    </div>
  );
};

export default Feed;
