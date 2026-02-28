import { useMutation } from "@tanstack/react-query";
import api from "../services/axios.js";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice.js";

export default function useLogin() {
  const dispatch = useDispatch();

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  return useMutation({
    mutationFn: login,
    mutationKey: ["user"],
    onSuccess: (res) => {
      dispatch(setUser(res.data.user));
    },
    onError: (err) => {
      console.log(err);
    },
  });
}
