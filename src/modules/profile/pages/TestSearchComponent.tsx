import { useState } from "react";
import {
  searchUsersThunk,
  getUserByIdThunk,
} from "../../../store/slice/user.thunk";
import type { otherUsers } from "../../../types/type";
import { useAppDispatch, useAppSelector } from "../../../store/hook";

const TestSearchComponent = () => {
  const dispatch = useAppDispatch();
  const { searchResults, searchedUser, searchLoading, error } = useAppSelector(
    (state) => state.user
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchUsersThunk(searchQuery));
    }
  };

  const handleGetUser = () => {
    if (userId.trim()) {
      dispatch(getUserByIdThunk(userId));
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Test Search Thunks</h2>

      {/* Test Search */}
      <div className="mb-6">
        <h3 className="text-lg mb-2">Test Search Users</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter search query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 bg-gray-700 rounded text-white"
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <div className="text-red-400 mb-2">Error: {error}</div>}

        <div>
          <h4 className="font-semibold mb-2">
            Search Results ({searchResults.length}):
          </h4>
          {searchResults.map((user: otherUsers) => (
            <div
              key={user._id}
              className="p-2 border border-gray-600 mb-2 rounded"
            >
              <p>Username: {user.username}</p>
              <p>Full Name: {user.fullName}</p>
              <p>ID: {user._id}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Test Get User by ID */}
      <div>
        <h3 className="text-lg mb-2">Test Get User by ID</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter user ID..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="px-3 py-2 bg-gray-700 rounded text-white"
          />
          <button
            onClick={handleGetUser}
            disabled={searchLoading}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {searchLoading ? "Loading..." : "Get User"}
          </button>
        </div>

        {searchedUser && (
          <div className="p-2 border border-gray-600 rounded">
            <h4 className="font-semibold">User Found:</h4>
            <p>Username: {searchedUser.username}</p>
            <p>Full Name: {searchedUser.fullName}</p>
            <p>Email: {searchedUser.email}</p>
            <p>Followers: {searchedUser.followersCount}</p>
            <p>Following: {searchedUser.followingCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSearchComponent;
