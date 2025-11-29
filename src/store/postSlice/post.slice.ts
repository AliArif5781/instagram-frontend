import { createSlice } from "@reduxjs/toolkit";
import type {
  createPostData,
  createStoryData,
  getAllFollowerPost,
  getPost,
  ReelPagination,
  Story,
} from "../../types/type";
import {
  createPostThunk,
  createStoryThunk,
  fetchReelPostsThunk,
  getAllFollowerPostThunk,
  getPostsThunk,
  getStoriesThunk,
  getUserPostsThunk,
} from "./post.thunk";

export interface userProfileState {
  createPost: createPostData | null;
  posts: getPost[];
  searchUserPosts: getPost[] | [];
  searchUserPostsCount: number;
  isAuthenticated: boolean;
  otherUser: [];
  error: string;
  screenLoading: boolean;
  buttonLoading: boolean;
  count: number;
  createStory: createStoryData | [];
  getStories: Story[] | [];
  getFollowerPost: getAllFollowerPost[] | [];
  nextCursor?: string | null;
  hasMorePosts?: boolean;
  loading: {
    createStoryLoading: boolean;
    getStoriesLoadoing: boolean;
    getAllFollowerPostLoading: boolean;
  };
  reels: {
    posts: createPostData[] | [];
    pagination: ReelPagination;
    loading: boolean;
    error: string | null;
    isRefreshing: boolean;
  };
}

const initialState: userProfileState = {
  createPost: null,
  posts: [],
  searchUserPosts: [],
  searchUserPostsCount: 0,
  isAuthenticated: false,
  otherUser: [],
  error: "",
  screenLoading: true,
  buttonLoading: false,
  count: 0,
  createStory: [],
  getStories: [],
  getFollowerPost: [],
  nextCursor: null as string | null,
  hasMorePosts: true,
  loading: {
    createStoryLoading: false,
    getStoriesLoadoing: false,
    getAllFollowerPostLoading: false,
  },
  reels: {
    posts: [],
    pagination: {
      nextCursor: null,
      firstPostId: null,
      hasMore: true,
      limit: 3,
    },
    loading: false,
    error: null,
    isRefreshing: false,
  },
};

export const createPostSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  // create post
  extraReducers: (builder) => {
    builder.addCase(createPostThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = "";
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.createPost = action.payload.responseData;
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.error = "";
    });
    builder.addCase(createPostThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload as string;
    });

    // get post
    builder.addCase(getPostsThunk.pending, (state) => {
      state.screenLoading = true;
      state.error = "";
    });
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.posts = action.payload.responseData;
      // console.log(action.payload, "actionPayload post.slice.ts");
      state.count = action.payload.count;
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.error = "";
    });

    builder.addCase(getPostsThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload as string;
    });

    // get search user post
    builder.addCase(getUserPostsThunk.pending, (state) => {
      state.screenLoading = true;
      state.error = "";
    });
    builder.addCase(getUserPostsThunk.fulfilled, (state, action) => {
      state.searchUserPosts = action.payload.responseData || [];
      state.searchUserPostsCount = action.payload.count || 0;
      state.screenLoading = false;
      state.error = "";
    });
    builder.addCase(getUserPostsThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload as string;
      state.searchUserPosts = [];
      state.searchUserPostsCount = 0;
    });

    // create story
    builder.addCase(createStoryThunk.pending, (state) => {
      state.loading.createStoryLoading = true;
      state.error = "";
    });
    builder.addCase(createStoryThunk.fulfilled, (state, action) => {
      state.loading.createStoryLoading = false;
      state.isAuthenticated = true;
      state.createPost = action.payload.responseData;
      console.log(action.payload.responseData, "createPost-slice");
      state.error = "";
    });
    builder.addCase(createStoryThunk.rejected, (state, action) => {
      state.loading.createStoryLoading = false;
      state.error = action.payload as string;
    });

    // get story
    builder.addCase(getStoriesThunk.pending, (state) => {
      state.loading.getStoriesLoadoing = true;
      state.error = "";
    });
    builder.addCase(getStoriesThunk.fulfilled, (state, action) => {
      state.loading.getStoriesLoadoing = false;
      state.isAuthenticated = true;
      state.getStories = action.payload.responseData;
      state.error = "";
    });
    builder.addCase(getStoriesThunk.rejected, (state, action) => {
      state.loading.getStoriesLoadoing = false;
      state.error = action.payload as string;
    });

    // getAllFollowerPost
    // post.slice.ts
    // First load
    builder.addCase(getAllFollowerPostThunk.pending, (state, action) => {
      if (!action.meta.arg) {
        state.loading.getAllFollowerPostLoading = true; // only show loader on first load
      }
    });

    builder.addCase(getAllFollowerPostThunk.fulfilled, (state, action) => {
      state.loading.getAllFollowerPostLoading = false;

      const { posts, nextCursor, hasMore } = action.payload;

      if (!action.meta.arg) {
        // First load → replace all
        state.getFollowerPost = posts;
      } else {
        // Load more → append
        state.getFollowerPost = [...state.getFollowerPost, ...posts];
      }

      // Save next cursor
      state.nextCursor = nextCursor;
      state.hasMorePosts = hasMore;
    });

    builder.addCase(getAllFollowerPostThunk.rejected, (state) => {
      state.loading.getAllFollowerPostLoading = false;
    });
    // get reels
    builder.addCase(fetchReelPostsThunk.pending, (state) => {
      state.reels.loading = true;
      state.reels.error = null;
    });
    builder.addCase(fetchReelPostsThunk.fulfilled, (state, action) => {
      state.reels.loading = false;
      // Stop any pull-to-refresh animation because the refresh is done
      state.reels.isRefreshing = false;

      const { posts, pagination } = action.payload;
      /*
      Take apart the response from the server into two pieces:
      1- posts - The actual reel videos/data
      2- pagination - Information about "is there more data to load?"
       */

      if (pagination.nextCursor) {
        /*
        IF there is a nextCursor (meaning there are more reels to load)
        THEN this is "Loading More" (user scrolled to bottom)
         */
        state.reels.posts = [...state.reels.posts, ...posts];
        /*
        Keep all existing reels and add new reels to the end
        Example: [oldReel1, oldReel2] + [newReel3, newReel4] = [oldReel1, oldReel2, newReel3, newReel4]
         */
      } else if (action.meta.arg.sinceId) {
        /*
        ELSE IF the original request had a sinceId parameter
        THEN this is "Pull to Refresh" (user pulled down to get new reels)
         */
        state.reels.posts = [...posts, ...state.reels.posts];
        /*
        Put new reels at the beginning and keep old reels after them
        Example: [newReel1, newReel2] + [oldReel1, oldReel2] = [newReel1, newReel2, oldReel1, oldReel2]
         */
      } else {
        state.reels.posts = posts;
        /*
        Replace everything with the new reels (no old reels to keep)
        Example: Just show [reel1, reel2, reel3]
         */
      }

      // Save Pagination Info
      state.reels.pagination = pagination;
      /*
      Remember where we left off for the next batch of reels
      This enables the "Load More" functionality
       */
    });
    builder.addCase(fetchReelPostsThunk.rejected, (state, action) => {
      state.reels.loading = false;
      state.reels.isRefreshing = false;
      state.reels.error = action.payload as string;
    });
  },
});

export const {} = createPostSlice.actions;
export default createPostSlice.reducer;
