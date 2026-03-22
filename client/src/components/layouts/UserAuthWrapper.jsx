import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";

export default function UserAuthWrapper({ children }) {
  const { isAuthenticated, user } = useAuth();
  const { addNotification } = useNotification();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    addNotification("Please login to continue.", true);
    return (
      <Navigate
        to={pathname ? `/get-started?redirectTo=${pathname}` : "/get-started"}
      />
    );
  }

  if (!user.isProfileComplete) {
    addNotification("Please complete profile to continue.", true);
    return (
      <Navigate
        to={
          pathname ? `/complete-profile?redirectTo=${pathname}` : "/get-started"
        }
      />
    );
  }

  return children;
}
