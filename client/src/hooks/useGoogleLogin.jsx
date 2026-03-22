import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "./useNotification";
import { setUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { api } from "../services/axios";

export default function useGoogleLogin() {
  const dispatch = useDispatch();
  const { addNotification } = useNotification();
  const queryClient = useQueryClient();

  const handleGoogleLogin = async (credentialRes) => {
    const res = await api.post("/auth/google", {
      idToken: credentialRes.credential,
    });
    return res?.data;
  };

  return useMutation({
    mutationFn: handleGoogleLogin,
    onSuccess(data) {
      dispatch(setUser(data.user));
      addNotification("Welcome to BookShowFast!");
      queryClient.setQueryData(["user"], data.user);
    },
    onError(err) {
      addNotification(err.response.data.message || "Failed to login!", true);
    },
  });
}
