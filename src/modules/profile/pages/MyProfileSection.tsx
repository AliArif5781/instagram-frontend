import { useAppSelector } from "../../../store/hook";
import ProfileSkeleton from "../components/ProfileSkeleton";
import SuggestedUser from "./SuggestedUser";

const MyProfileSection = () => {
  const { userProfile, screenLoading } = useAppSelector((state) => state.user);

  if (screenLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <section className="flex items-center justify-around p-3 mt-5">
        <div className="flex items-center gap-3">
          <img
            src={userProfile?.profileImage}
            alt={userProfile?.fullName}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--color-lightest-gray)]">
              {userProfile?.username}
            </span>
            <span className="text-xs font-medium text-[var(--color-lightt-gray)]">
              {userProfile?.fullName}
            </span>
          </div>
        </div>
        <button className="text-xs text-[var(--color-light-blue)] font-semibold hover:text-blue-300 transition-colors">
          Switch
        </button>
      </section>
      <SuggestedUser />
    </>
  );
};

export default MyProfileSection;
