import { Link, useLocation } from "react-router-dom";
import { Home, Search, Video, MessageCircle, CircleUser } from "lucide-react";

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/homepage", icon: <Home /> },
    { name: "Search", path: "/search", icon: <Search /> },
    { name: "Reels", path: "/reel", icon: <Video /> },
    { name: "Messages", path: "/messages", icon: <MessageCircle /> },
    { name: "Profile", path: "/profile", icon: <CircleUser /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-black border-gray-800 py-2 px-4 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex flex-col items-center text-gray-400"
        >
          <div className={`w-6 h-6 ${isActive(item.path) ? "text-white" : ""}`}>
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;
