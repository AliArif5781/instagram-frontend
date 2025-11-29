// store/features/follow/follow.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import toast from "react-hot-toast";

// Follow a user
export const followUserThunk = createAsyncThunk(
  "follow/followUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/user/follow/${userId}`);
      console.log(response, "followUserThunk");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput || "Failed to follow user");
      return rejectWithValue(errorOutput);
    }
  }
);

// Unfollow a user
export const unfollowUserThunk = createAsyncThunk(
  "follow/unfollowUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/user/unfollow/${userId}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error("❌ Unfollow thunk error:", error);
      console.error("❌ Error response:", error.response);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput || "Failed to unfollow user");
      return rejectWithValue(errorOutput);
    }
  }
);

// Get followers of a user
export const getFollowersThunk = createAsyncThunk(
  "follow/getFollowers",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/followers/${userId}`);
      console.log(response, "getFollowersThunk");
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

// Get following of a user
export const getFollowingThunk = createAsyncThunk(
  "follow/getFollowing",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/following/${userId}`);
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

// Check if current user follows a specific user
export const getFollowStatusThunk = createAsyncThunk(
  "follow/getFollowStatus",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/follow-status/${userId}`);
      console.log(response, "getFollowThunk");
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

// Get follower and following counts
export const getFollowCountsThunk = createAsyncThunk(
  "follow/getFollowCounts",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/follow-counts/${userId}`);
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

export const suggestedForYouThunk = createAsyncThunk(
  "suggested/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/follow/suggestedForyou");
      console.log(response, "suggestedForYouThunk");
      return response.data;
    } catch (error: any) {
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);
