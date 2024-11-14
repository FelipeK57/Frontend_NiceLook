import { Button } from "@nextui-org/react";
import useAuthStore from "./stores/useAuthStore";
import AuthModal from "./components/auth/AuthModal";
function TestComponents() {
  const { isAuthenticated, triggerAuthModal } = useAuthStore();

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      triggerAuthModal();
    } else {
      console.log("Protected action executed");
    }
  };
  return (
    <main className="grid place-content-center gap-4 h-screen">
      <Button color="primary" onClick={handleProtectedAction}>Reservar cita</Button>
      <AuthModal />
    </main>
  );
}

export default TestComponents;
