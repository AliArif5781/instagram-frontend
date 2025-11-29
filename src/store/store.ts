import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import createPostReducer from "./postSlice/post.slice";
import messageReducer from "./message/message.slice";
import socketReducer from "./socket/socket.slice";
import followReducer from "./follow/follow.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: createPostReducer,
    msg: messageReducer,
    socket: socketReducer,
    follow: followReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: ["socket.socketId"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
