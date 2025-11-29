import { Mail } from "lucide-react";

const NoUserSelected = () => {
  return (
    <div className="w-full h-dvh grid place-items-center  text-white">
      <div className="text-center">
        {/* Icon */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-gray-700 mb-6 mx-auto">
          <Mail className="w-12 h-12 text-gray-500" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">Your Messages</h2>

        {/* Subtitle */}
        <p className="text-[var(--color-light-gray)] max-w-md mx-auto">
          Send photos and messages to a friend
        </p>
      </div>
    </div>
  );
};

export default NoUserSelected;
