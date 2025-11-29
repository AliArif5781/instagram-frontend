import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const NoPost = () => {
  return (
    <div className="flex justify-center items-center text-[var(--color-lighter-gray)]">
      <div className="flex flex-col items-center text-center space-y-4">
        <Camera className="h-16 w-16 mb-4" />
        <h1 className="text-2xl font-extrabold">Share Photos</h1>
        <span className="text-base max-w-md">
          When you share photos, they will appear on your profile.
        </span>
        <div>
          <Link to={"/create"}>
            <span className="text-[var(--color-light-blue)] hover:text-[var(--color-blue)] hover:underline transition-all duration-300 font-semibold">
              Share your first photo
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPost;
