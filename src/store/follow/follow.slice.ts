// store/features/follow/follow.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { Follow, suggestedUserData } from "../../types/type";
import {
  followUserThunk,
  unfollowUserThunk,
  getFollowersThunk,
  getFollowingThunk,
  getFollowStatusThunk,
  getFollowCountsThunk,
  suggestedForYouThunk,
} from "./follow.thunk";

export interface FollowState {
  followers: Follow[]; // People who follow YOU
  following: Follow[]; // People YOU follow
  isFollowing: boolean; // Whether YOU follow the current profile user
  followersCount: number; // How many people follow YOU
  followingCount: number; // How many people YOU follow
  loading: boolean;
  error: string | null;
  suggestedUser: suggestedUserData[];
  setLoading: {
    suggestedUsers: boolean;
  };
}

const initialState: FollowState = {
  followers: [],
  following: [],
  isFollowing: false,
  followersCount: 0,
  followingCount: 0,
  loading: false,
  error: null,
  suggestedUser: [],
  setLoading: {
    //   // now next time use seprate loading state for better ux.
    //   /*
    //    global: boolean;           // For overall operations
    //   followUser: boolean;       // When following someone
    //   unfollowUser: boolean;     // When unfollowing someone
    //   getFollowers: boolean;     // When loading followers list
    //   getFollowing: boolean;     // When loading following list
    //   getFollowStatus: boolean;  // When checking follow status
    //   getFollowCounts: boolean;  // When loading counts
    //    */
    suggestedUsers: false,
  },
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    clearFollowData: (state) => {
      state.followers = [];
      state.following = [];
      state.isFollowing = false;
      state.followersCount = 0;
      state.followingCount = 0;
      state.error = null;
    },
    // Optional: Manual update for immediate UI feedback
    updateFollowStatus: (state, action) => {
      state.isFollowing = action.payload;
    },
    updateFollowCounts: (state, action) => {
      state.followersCount = action.payload.followersCount;
      state.followingCount = action.payload.followingCount;
    },
  },
  extraReducers: (builder) => {
    // Follow User - YOU follow someone
    builder.addCase(followUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(followUserThunk.fulfilled, (state) => {
      state.loading = false;
      state.isFollowing = true; // You are now following this user
      state.followingCount += 1; // YOUR following count increases
      state.error = null;
    });
    builder.addCase(followUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Unfollow User - YOU unfollow someone
    builder.addCase(unfollowUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(unfollowUserThunk.fulfilled, (state) => {
      state.loading = false;
      state.isFollowing = false; // You are no longer following this user
      state.followingCount = Math.max(0, state.followingCount - 1); // YOUR following count decreases
      state.error = null;
    });
    builder.addCase(unfollowUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Followers - Get people who follow YOU
    builder.addCase(getFollowersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFollowersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.followers = action.payload.responseData || []; // People who follow YOU
      state.followersCount = action.payload.responseData?.length || 0; // YOUR followers count
      state.error = null;

      console.log("✅ Got followers:", state.followersCount);
      console.log("✅ Followers data:", state.followers);
    });
    builder.addCase(getFollowersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.error("❌ Get followers failed:", action.payload);
    });

    // Get Following - Get people YOU follow
    builder.addCase(getFollowingThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFollowingThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.following = action.payload.responseData || []; // People YOU follow
      state.followingCount = action.payload.responseData?.length || 0; // YOUR following count
      state.error = null;

      console.log("✅ Got following:", state.followingCount);
      console.log("✅ Following data:", state.following);
    });
    builder.addCase(getFollowingThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.error("❌ Get following failed:", action.payload);
    });

    // Get Follow Status - Check if YOU follow a specific user
    builder.addCase(getFollowStatusThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFollowStatusThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.isFollowing = action.payload.responseData?.isFollowing || false; // Do YOU follow them?
      state.error = null;

      console.log("✅ Follow status:", state.isFollowing);
    });
    builder.addCase(getFollowStatusThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.error("❌ Get follow status failed:", action.payload);
    });

    // Get Follow Counts - Get YOUR follower and following counts
    builder.addCase(getFollowCountsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFollowCountsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.followersCount = action.payload.responseData?.followersCount || 0; // YOUR followers
      state.followingCount = action.payload.responseData?.followingCount || 0; // YOUR following
      state.error = null;

      console.log(
        "✅ Your counts - Followers:",
        state.followersCount,
        "Following:",
        state.followingCount
      );
    });
    builder.addCase(getFollowCountsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.error("❌ Get follow counts failed:", action.payload);
    });

    // suggested for you
    builder.addCase(suggestedForYouThunk.pending, (state) => {
      state.setLoading.suggestedUsers = true;
      state.error = "";
    });
    builder.addCase(suggestedForYouThunk.fulfilled, (state, action) => {
      state.setLoading.suggestedUsers = false;
      // This transformation might not be working
      state.suggestedUser = action.payload.responseData;
      state.error = "";
    });
    builder.addCase(suggestedForYouThunk.rejected, (state, action) => {
      state.setLoading.suggestedUsers = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearFollowData, updateFollowStatus, updateFollowCounts } =
  followSlice.actions;
export default followSlice.reducer;
