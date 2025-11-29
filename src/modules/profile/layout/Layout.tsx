import Sidebar from "../../../pages/Home";
import { useAppSelector } from "../../../store/hook";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { screenLoading } = useAppSelector((state) => state.user);

  if (screenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-black)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 ml-64">
        {" "}
        {/* Adjust margin based on sidebar width */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
