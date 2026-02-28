import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import api from "../services/axios.js";

export default function useLogout() {
  const dispatch = useDispatch();

  const logout = async () => {
    const res = await api.post("/auth/logout");

    return res;
  };

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      dispatch(clearUser());
    },
    onError(err) {
      console.log(err);
    },
  });
}
