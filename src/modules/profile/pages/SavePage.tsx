// components/SavedTab.tsx
import { Save, Image } from "lucide-react";

const SavedPage = () => {
  // Sample saved posts data
  const savedPosts = [
    { id: 1, type: "image", savedBy: "user1" },
    { id: 2, type: "image", savedBy: "user2" },
    { id: 3, type: "image", savedBy: "user3" },
    { id: 4, type: "image", savedBy: "user4" },
    { id: 5, type: "image", savedBy: "user5" },
    { id: 6, type: "image", savedBy: "user6" },
  ];

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {savedPosts.map((post) => (
        <div
          key={post.id}
          className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-all duration-300"
        >
          {/* Saved Post Content */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
            <Image className="w-8 h-8 text-gray-400" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
            <Save className="w-6 h-6 fill-current" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPage;
