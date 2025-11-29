const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`flex gap-3 max-w-xs ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
          >
            {/* Profile Picture Skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse flex-shrink-0"></div>

            {/* Message Bubble Skeleton */}
            <div className="flex flex-col gap-2">
              <div
                className={`rounded-2xl px-4 py-3 bg-gray-700 animate-pulse ${
                  index % 2 === 0
                    ? "rounded-bl-none w-48"
                    : "rounded-br-none w-40 ml-auto"
                }`}
              ></div>
              {index % 3 === 0 && (
                <div
                  className={`rounded-2xl px-4 py-2 bg-gray-700 animate-pulse ${
                    index % 2 === 0
                      ? "rounded-bl-none w-32"
                      : "rounded-br-none w-28 ml-auto"
                  }`}
                ></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
