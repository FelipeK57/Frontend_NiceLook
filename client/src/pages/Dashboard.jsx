import { Outlet } from "react-router-dom";
import Sidebar from "../components/global/Sidebar";

function Dashboard() {
  return (
    <main className="lg:grid lg:grid-cols-[25%_75%] h-screen">
      <Sidebar />
      <section className="w-full">
        <Outlet />
      </section>
    </main>
  );
}

export default Dashboard;
