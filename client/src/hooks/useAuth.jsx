import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearUser, setUser } from "../store/authSlice";
import authApi, { api } from "../services/axios";
import useNotification from "./useNotification";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useAuth() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirectTo");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addNotification } = useNotification();
  const queryClient = useQueryClient();

  const getStartedMutation = useMutation({
    mutationFn: async ({ email, otp }) =>
      await api.post(
        "/auth/get-started",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess(res) {
      dispatch(setUser(res.data.user));
      addNotification("Welcome to BookShowFast.");
      queryClient.setQueryData(["user"], res.data.user);
      if (!res?.data?.user?.isProfileComplete) {
        if (redirectUrl) {
          navigate(`/complete-profile?redirectTo=${redirectUrl}`);
        } else {
          navigate("/complete-profile");
        }
      } else {
        navigate(redirectUrl || "/");
      }
    },
    onError(err) {
      addNotification(
        err?.response?.data?.message || "Failed to get started.",
        true
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => await authApi.post("/auth/logout"),
    onSuccess() {
      dispatch(clearUser());
      addNotification("User logged out successfully!");
      queryClient.setQueryData(["user"], null);
    },
    onError(err) {
      addNotification(
        err?.response?.data?.message || "Unable to logout user!",
        true
      );
    },
  });

  const profileUpdateMutation = useMutation({
    mutationFn: async ({ phone, name }) => {
      return await authApi.put(
        "/auth/profile",
        { ...user, phone, name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess(res) {
      dispatch(setUser(res.data.user));
      addNotification("Profile updated successfully.");
      queryClient.setQueryData(["user"], res.data.user);
      navigate(redirectUrl || "/");
    },
    onError(err) {
      addNotification(
        err?.response?.data?.message || "Failed to update profile!",
        true
      );
    },
  });

  return {
    user,
    isAuthenticated,
    getStarted: getStartedMutation.mutate,
    logout: logoutMutation.mutate,
    updateProfile: profileUpdateMutation.mutate,
  };
}
