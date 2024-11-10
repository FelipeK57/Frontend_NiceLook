import LoginModal from "./pages/auth/client/LoginModal";
import RegisterModal from "./pages/auth/client/RegisterModal";
function TestComponents() {
  return (
    <main className="grid place-content-center gap-4 h-screen">
      <LoginModal />
      <RegisterModal />
    </main>
  );
}

export default TestComponents;
