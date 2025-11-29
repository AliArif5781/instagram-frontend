import { createSlice } from "@reduxjs/toolkit";
import { type otherUsers, type UserProfile } from "../../types/type";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
  searchUsersThunk,
  getUserByIdThunk,
  updateUserProfileThunk,
} from "./user.thunk";

export interface userProfileState {
  userProfile: UserProfile | null;
  currentUser: UserProfile | null; // Add current user
  isAuthenticated: boolean;
  otherUser: [];
  searchResults: otherUsers[]; // Add search results
  searchedUser: UserProfile | null; // Add searched user profile
  error: string;
  screenLoading: boolean;
  buttonLoading: boolean;
  searchLoading: boolean; // Add search loading
  selectedUser: otherUsers | null;
}

const initialState: userProfileState = {
  userProfile: null,
  currentUser: null, // Initialize currentUser
  isAuthenticated: false,
  otherUser: [],
  searchResults: [], // Initialize searchResults
  searchedUser: null, // Initialize searchedUser
  error: "",
  screenLoading: true,
  buttonLoading: false,
  searchLoading: false, // Initialize searchLoading
  selectedUser: JSON.parse(localStorage.getItem("selectedUser") || "null"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearButtonLoading: (state) => {
      state.buttonLoading = false;
    },
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
    clearUserData: (state) => {
      state.isAuthenticated = false;
      state.userProfile = null;
      state.currentUser = null;
      state.otherUser = [];
      state.selectedUser = null;
      state.searchResults = [];
      state.searchedUser = null;
    },
    // Add search-related reducers
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSearchedUser: (state) => {
      state.searchedUser = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = "";
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.userProfile = action.payload.responseData;
      state.currentUser = action.payload.responseData; // Set current user
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.error = action.payload as string;
    });

    // Signup
    builder.addCase(signupUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = "";
    });
    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.responseData;
      state.currentUser = action.payload.responseData; // Set current user
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(signupUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = "";
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.currentUser = null; // Clear current user
      state.selectedUser = null;
      state.otherUser = [];
      state.searchResults = []; // Clear search results
      state.searchedUser = null; // Clear searched user
      state.isAuthenticated = false;
      state.buttonLoading = false;
      state.error = "";
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.error = action.payload as string;
    });

    // Get User Profile
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
      state.error = "";
      // You can add loading state if needed
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.responseData;
      state.currentUser = action.payload.responseData; // Set current user
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.error = "";
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload as string;
    });

    // Get Other Users
    builder.addCase(getOtherUsersThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUser = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // Search Users - NEW
    builder.addCase(searchUsersThunk.pending, (state) => {
      state.searchLoading = true;
      state.error = "";
    });
    builder.addCase(searchUsersThunk.fulfilled, (state, { payload }) => {
      state.searchLoading = false;
      state.searchResults = payload.responseData || [];
      state.error = "";
    });
    builder.addCase(searchUsersThunk.rejected, (state, { payload }) => {
      state.searchLoading = false;
      state.error = payload as string;
      state.searchResults = [];
    });

    // Get User By ID - NEW
    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.searchLoading = true;
      state.error = "";
    });
    builder.addCase(getUserByIdThunk.fulfilled, (state, { payload }) => {
      state.searchLoading = false;
      state.searchedUser = payload.responseData;
      state.error = "";
    });
    builder.addCase(getUserByIdThunk.rejected, (state, { payload }) => {
      state.searchLoading = false;
      state.error = payload as string;
      state.searchedUser = null;
    });
    // Update User Profile
    builder.addCase(updateUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
      state.error = "";
    });
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.userProfile = action.payload.responseData;
      state.error = "";
    });
    builder.addCase(updateUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions
export const {
  setSelectedUser,
  clearButtonLoading,
  clearUserData,
  clearSearchResults,
  clearSearchedUser,
  setCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
