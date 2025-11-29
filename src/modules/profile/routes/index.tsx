// ProfileRoutes.tsx - FIXED VERSION
import type { RouteObject } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import PostPage from "../pages/PostPage";
import SavedPage from "../pages/SavePage";
import CreatePost from "../pages/CreatePost";
import EditProfile from "../pages/EditProfile";
import SearchComponent from "../pages/SearchComponent";
import SearchUserProfile from "../pages/SearchUserProfile";
import SearchUserPost from "../pages/SearchUserPost";
import HomePage from "../pages/HomePage";
import CreateStory from "../pages/CreateStory";
import Reels from "../pages/Reels";

export const profileRoute: RouteObject[] = [
  {
    path: "profile",
    element: <ProfilePage />, // <--- for your own profile
    children: [
      {
        path: "posts",
        element: <PostPage />,
      },
      {
        path: "saved",
        element: <SavedPage />,
      },
    ],
  },
  {
    path: "profile/:userId",
    element: <ProfilePage />, // <--- for other users
    // children: [
    //   {
    //     path: "posts",
    //     element: <PostPage />,
    //   },
    //   {
    //     path: "saved",
    //     element: <SavedPage />,
    //   },
    // ],
  },
  {
    path: "create",
    element: <CreatePost />,
  },
  {
    path: "editProfile",
    element: <EditProfile />,
  },
  {
    path: "search",
    element: <SearchComponent />,
  },
  {
    path: "user/:userId",
    element: <SearchUserProfile />,
    children: [
      {
        path: "posts",
        element: <SearchUserPost />,
      },
    ],
  },
  {
    path: "homepage",
    element: <HomePage />,
  },
  {
    path: "createStory",
    element: <CreateStory />,
  },
  {
    path: "reel",
    element: <Reels />,
  },
];
