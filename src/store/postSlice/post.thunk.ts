import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import type { createpost } from "../../types/type";
import { AxiosError } from "axios";

export const createPostThunk = createAsyncThunk(
  "user/createPost",
  async ({ imageUrl, caption, mediaType }: createpost, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/post/createPost", {
        imageUrl,
        caption,
        mediaType, // ADD THIS
      });
      console.log(response, "createPostThunk");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(error);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getPostsThunk = createAsyncThunk(
  "user/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Use the new endpoint
      const response = await api.get("/api/user/post/get-all-posts");
      console.log("Posts fetched successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Get posts error:", error);
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

// In your getUserPostsThunk, log the response:
export const getUserPostsThunk = createAsyncThunk(
  "user/getUserPosts",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/post/${userId}/posts`);
      return response.data;
    } catch (error: any) {
      console.error("Get user posts error:", error);
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

// story thunks

export const createStoryThunk = createAsyncThunk(
  "users/story",
  async ({ imageUrl, caption }: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/story", {
        imageUrl,
        caption,
      });
      toast.success(response.data?.message);
      // console.log(response, "createStoryThunk");
      return response.data;
    } catch (error: any) {
      // console.error(error);
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getStoriesThunk = createAsyncThunk(
  "users/stories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/userStory/getStory");
      console.log(response, "getStoriesThunk");
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getAllFollowerPostThunk = createAsyncThunk(
  "users/followUsersPost",
  async (cursor: string | null, { rejectWithValue }) => {
    try {
      const url = cursor
        ? `/api/user/post/getFollowUserPost?cursor=${cursor}`
        : "/api/user/post/getFollowUserPost";

      const response = await api.get(url);
      console.log(response, "getAllFollowerPostThunk");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorOutput = error?.response?.data?.message || error.message;
        return rejectWithValue(errorOutput);
      }
      return rejectWithValue(
        "An unexpected error occurred , ==getAllFollowerPostThunk=="
      );
    }
  }
);

// post.thunk.ts - Add this thunk
export const fetchReelPostsThunk = createAsyncThunk(
  "posts/fetchReelPosts",
  async (
    {
      limit = 3,
      cursor = null,
      sinceId = null,
    }: {
      limit?: number;
      cursor?: string | null;
      sinceId?: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("limit", limit.toString());

      if (cursor) params.append("cursor", cursor);
      if (sinceId) params.append("sinceId", sinceId);

      // console.log(params);
      // console.log(params, "params");
      const response = await api.get(
        `/api/user/post/reels?${params.toString()}`
      );
      console.log(response, "fetchReelPostsThunk");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reels"
      );
    }
  }
);
