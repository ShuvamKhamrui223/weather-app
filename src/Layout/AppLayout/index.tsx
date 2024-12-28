import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";

const AppLayout = () => {
  return (
    <div className="py-5 px-4 md:px-8 bg-gray-900 min-h-screen flex flex-col gap-6">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
