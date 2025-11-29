import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import SuggestedSkeleton from "../components/SuggestedSkeleton";
import { suggestedForYouThunk } from "../../../store/follow/follow.thunk";

const SuggestedUser = () => {
  const dispatch = useAppDispatch();
  const { suggestedUser, setLoading } = useAppSelector((state) => state.follow);

  console.log(suggestedUser, "SU");
  useEffect(() => {
    dispatch(suggestedForYouThunk());
  }, []);

  if (setLoading.suggestedUsers) {
    return <SuggestedSkeleton />;
  }
  if (!suggestedUser || suggestedUser.length === 0) {
    return null;
  }
  return (
    <section className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-around px-3 mb-4">
        <span className="text-sm font-semibold text-[var(--color-gray)]">
          Suggested for you
        </span>
        <button className="text-xs text-white font-semibold hover:text-gray-300 transition-colors opacity-0">
          See All
        </button>
      </div>

      {/* Suggested Users List */}
      <div className="space-y-4">
        {suggestedUser ? (
          suggestedUser
            .filter((user) => user.following !== null)
            .map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-around px-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 hover:underline">
                  <img
                    src={user.following.profileImage || "/default-avatar.png"}
                    alt={user.following.fullName}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {user.following.username}
                    </span>
                    <span className="text-xs text-gray-400">
                      Suggested for you
                    </span>
                  </div>
                </div>

                <button className="text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors opacity-0">
                  Follow
                </button>
              </div>
            ))
        ) : (
          <div className="text-white text-7xl">No Suggested user</div>
        )}
      </div>
    </section>
  );
};

export default SuggestedUser;
