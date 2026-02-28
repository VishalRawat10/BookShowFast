import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import api from "../services/axios";
import { setUser } from "../store/authSlice";

export default function useSignup() {
  const dispatch = useDispatch();

  const signup = async (userData) => {
    const res = await api.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  return useMutation({
    mutationFn: signup,
    mutationKey: ["user"],
    onSuccess(res) {
      dispatch(setUser(res.data.user));
    },
    onError(err) {
      console.log(err);
    },
  });
}
