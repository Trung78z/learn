import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <div className="h-screen w-full space-y-4 bg-gray-300">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
