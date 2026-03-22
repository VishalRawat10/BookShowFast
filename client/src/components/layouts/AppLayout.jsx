import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useProfile from "../../hooks/useProfile";
import useNotification from "../../hooks/useNotification";
import Notification from "../ui/Notification";

export default function AppLayout() {
  const { message, isError, removeNotification } = useNotification();
  useProfile();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {message && (
          <Notification
            message={message}
            type={isError ? "error" : "success"}
            onClose={() => removeNotification()}
          />
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
