import RightSection from "./RightSection";
import Feed from "./Feed";
import { useAppSelector } from "../../../store/hook";

const HomePage = () => {
  const { userProfile } = useAppSelector((state) => state.user);
  console.log(userProfile, "UP");
  return (
    <main className=" h-dvh w-full">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-9 flex justify-center text-white">
          <Feed />
        </div>
        <div className="col-span-3 px-5 lg:px-0">
          <RightSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
