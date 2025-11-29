import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  initializeSocket,
  setOnlineUsers,
  disconnectSocket,
  setConnected,
  getSocket,
} from "../store/socket/socket.slice";
import { setNewMessage } from "../store/message/message.slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const socketSetupComplete = useRef(false);
  const location = useLocation();

  const { isAuthenticated, userProfile } = useAppSelector(
    (state) => state.user
  );
  // const { onlineUsers } = useAppSelector((state) => state.socket);

  // console.log(onlineUsers, "Online Users");

  const isMessagesPage = location.pathname === "/messages";

  // Initialize socket when user is authenticated
  useEffect(() => {
    if (!isAuthenticated || !userProfile?._id) {
      if (socketSetupComplete.current) {
        console.log("User logged out, disconnecting socket");
        disconnectSocket();
        dispatch(setConnected(false));
        dispatch(setOnlineUsers([]));
        socketSetupComplete.current = false;
      }
      return;
    }

    const existingSocket = getSocket();
    if (existingSocket?.connected && socketSetupComplete.current) {
      console.log("Socket already connected, reusing existing connection");
      return;
    }

    if (socketSetupComplete.current) {
      return;
    }

    socketSetupComplete.current = true;
    console.log("Initializing socket for user:", userProfile._id);

    const socket = initializeSocket(userProfile._id);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      dispatch(setConnected(true));
      // Request online users immediately after connection
      socket.emit("getOnlineUsers");
    });

    socket.on("onlineUsers", (users: string[]) => {
      console.log("Online users received:", users);
      dispatch(setOnlineUsers(users));
    });

    socket.on("newMessage", (newMessage: any) => {
      console.log("New message received:", newMessage);
      dispatch(setNewMessage(newMessage));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(setConnected(false));
      socketSetupComplete.current = false;
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      console.log("Home component cleanup (not disconnecting socket)");
    };
  }, [isAuthenticated, userProfile?._id, dispatch]);

  // Poll for online users periodically (backup mechanism)
  useEffect(() => {
    if (!isMessagesPage) return;

    const socket = getSocket();
    if (!socket?.connected) return;

    // Request immediately
    socket.emit("getOnlineUsers");

    // Then poll every 5 seconds while on messages page
    const interval = setInterval(() => {
      if (socket.connected) {
        socket.emit("getOnlineUsers");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isMessagesPage]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("Browser closing, disconnecting socket");
      disconnectSocket();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-60"
        } flex-1`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
