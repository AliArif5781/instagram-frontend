import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import io, { Socket } from "socket.io-client";

interface SocketState {
  onlineUsers: string[];
  isConnected: boolean;
}

const initialState: SocketState = {
  onlineUsers: [],
  isConnected: false,
};

// Store socket instance OUTSIDE Redux (critical!)
let socketInstance: Socket | null = null;

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

// Helper functions to manage socket outside Redux
export const initializeSocket = (userId: string) => {
  // Only disconnect if it's a different user
  if (socketInstance?.connected) {
    console.log("Socket already connected, reusing connection");
    return socketInstance;
  }

  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }

  console.log("Creating new socket connection for user:", userId);

  // Get server URL from environment variable
  const serverUrl = "http://localhost:3000";

  if (!serverUrl) {
    console.error("❌ VITE_SERVER_URI is not defined in .env file!");
    console.error(
      "Add this to your .env file: VITE_SERVER_URI=http://localhost:3000"
    );
    // Fallback to default
    const fallbackUrl = "http://localhost:3000";
    console.log("Using fallback URL:", fallbackUrl);
  }

  const finalUrl = serverUrl;
  console.log("Connecting to server:", finalUrl);

  socketInstance = io(finalUrl, {
    query: {
      userId: userId,
    },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 10000,
  });

  // Add connection error logging
  socketInstance.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error.message);
    console.error("Make sure backend is running on:", finalUrl);
  });

  return socketInstance;
};

export const getSocket = (): Socket | null => {
  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    console.log("Disconnecting socket");
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export const { setOnlineUsers, setConnected } = socketSlice.actions;
export default socketSlice.reducer;
