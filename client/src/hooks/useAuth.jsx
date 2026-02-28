import { useSelector } from "react-redux";
import useLogin from "./useLogin";
import useSignup from "./useSignup";
import useProfile from "./useProfile";
import useLogout from "./useLogout";

export default function useAuth() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();
  const profileQuery = useProfile();

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    getProfile: profileQuery,
  };
}
