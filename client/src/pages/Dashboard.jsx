import Sidebar from "../components/global/Sidebar";

function Dashboard() {
  return (
    <main className="lg:grid lg:grid-cols-[25%_75%] h-screen">
      <Sidebar />
      <section>
        <h1>Dashboard</h1>
      </section>
    </main>
  );
}

export default Dashboard;
