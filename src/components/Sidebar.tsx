import { Instagram, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { logoutUserThunk } from "../store/slice/user.thunk";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navigationItems = [
    {
      name: "Home",
      path: "/homepage",
      icon: (
        <svg
          className="w-6 h-6"
          fill="var(--color-light-gray)"
          viewBox="0 0 24 24"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      name: "Search",
      path: "/search",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="var(--color-light-gray)"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Reels",
      path: "/reel",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="var(--color-light-gray)"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.823 1l2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 011.596 2.82l.07.295h-4.629L15.15 1zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 013.942-4.53zm9.735 12.834l-4.545-2.624a.909.909 0 00-1.356.668l-.008.120v5.248a.91.91 0 001.255.84l.109-.053 4.545-2.624a.909.909 0 00.100-1.507l-.100-.068-4.545-2.624zm-14.2-6.209h21.964l.015.360.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189z" />
        </svg>
      ),
    },
    {
      name: "Messages",
      path: "/messages",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="var(--color-light-gray)"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zM6.5 10.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      ),
    },
    {
      name: "Create",
      path: "/create",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="var(--color-light-gray)"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="var(--color-light-gray)"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a3 3 0 110 6 3 3 0 010-6zm0 13.5a7.5 7.5 0 01-6.5-3.75 5.5 5.5 0 0113 0A7.5 7.5 0 0112 18.5z" />
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  return (
    <div
      className={`h-dvh bg-black border-r border-gray-800 fixed left-0 top-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-60"
      } z-50`}
    >
      {/* Instagram Logo */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <Instagram className="w-8 h-8 text-white" />
              <span className="text-xl font-instagram font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Instagram
              </span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="flex justify-center group">
              <div className="p-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300">
                <Instagram className="w-9 h-9 text-white group-hover:text-white" />
              </div>
            </Link>
          )}

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "space-x-4"
              } p-3 rounded-lg transition-all duration-200 group ${
                active
                  ? "bg-gray-200 font-semibold text-black"
                  : "hover:bg-gray-800 text-white"
              }`}
            >
              <div className={active ? "text-black" : ""}>
                {active ? item.activeIcon : item.icon}
              </div>
              {!isCollapsed && (
                <span className={active ? "text-black" : "text-white"}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-4"
          } w-full p-3 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer text-white`}
        >
          <LogOut className="text-white" />
          {!isCollapsed && <span className="text-white">Logout</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
