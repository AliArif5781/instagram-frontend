import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginCredentials,
  UpdateProfileData,
  UserProfile,
} from "../../types/type";
import { api } from "../../api/axios";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/login", {
        email,
        password,
      });
      // console.log(response, "RESPONSE");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "user/signup",
  async (
    { fullName, username, email, password, profileImage }: LoginCredentials,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/api/user/signup", {
        fullName,
        username,
        email,
        password,
        profileImage,
      });
      // console.log(response, "RESPONSE-Signup");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/logout");
      console.log(response, "logoutUserThunk");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/getProfile");
      // console.log(response, "RESPONSE-getUserProfileThunk");
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const editUserProfileThunk = createAsyncThunk(
  "user/editProfile",
  async (
    { fullName, username, email, location, bio }: UserProfile,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/api/user/editProfile", {
        fullName,
        username,
        email,
        location,
        bio,
      });
      console.log(response, "editUserProfileThunk");
      toast.success("User Profile Edit Successfully");
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/getOtherUsers");
      console.log(response, "getOtherUsersThunk");
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const searchUsersThunk = createAsyncThunk(
  "user/searchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/search/${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);

export const getUserByIdThunk = createAsyncThunk(
  "user/getUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user"
      );
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (profileData: UpdateProfileData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/api/user/post/editUserProfile",
        profileData
      );
      toast.success("Profile updated successfully");
      return response.data;
    } catch (error: any) {
      console.error("Update profile error:", error);
      const errorOutput =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
