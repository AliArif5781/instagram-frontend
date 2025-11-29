import { useState, useEffect, useCallback, useRef } from "react";
import { clearSearchResults } from "../../../store/slice/user.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { searchUsersThunk } from "../../../store/slice/user.thunk";
import { Loader2, Search, X } from "lucide-react";

const SearchComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { searchResults, searchLoading, error } = useAppSelector(
    (state) => state.user
  );
  const timeoutRef = useRef<number | null>(null);

  // Debounced search with useCallback
  const debouncedSearch = useCallback(
    (query: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        if (query.trim().length > 0) {
          dispatch(searchUsersThunk(query));
          setShowResults(true);
        } else {
          dispatch(clearSearchResults());
          setShowResults(false);
        }
      }, 500);
    },
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/user/${userId}`);
    setSearchTerm("");
    setShowResults(false);
    dispatch(clearSearchResults());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
    dispatch(clearSearchResults());
  };

  const handleInputFocus = () => {
    if (searchTerm.trim().length > 0 && searchResults.length > 0) {
      setShowResults(true);
    }
    console.log(handleInputFocus);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative mt-10  ">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowResults(true)}
          className="w-full pl-10 pr-10 py-2 bg-[#121212] border border-[#262626] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-0 transition-all text-sm"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showResults && (
        <div className="absolute top-12 left-0 right-0 bg-[#121212] border border-[#262626] rounded-xl shadow-xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {searchLoading && (
            <div className="flex justify-center items-center p-6 text-gray-400 text-sm">
              <Loader2 size={18} className="animate-spin mr-2" />
              Searching...
            </div>
          )}

          {!searchLoading && error && (
            <div className="p-4 text-center text-red-400 text-sm">{error}</div>
          )}

          {!searchLoading &&
            !error &&
            searchResults?.length === 0 &&
            searchTerm && (
              <div className="p-5 text-center text-gray-400 text-sm">
                No users found for “{searchTerm}”
              </div>
            )}

          {!searchLoading &&
            !error &&
            searchResults?.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors border-b border-[#262626] last:border-b-0"
              >
                <img
                  src={user.profileImage || "/default-avatar.png"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-white truncate">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {user.fullName}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
