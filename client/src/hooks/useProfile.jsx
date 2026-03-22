import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import authApi from "../services/axios";

export default function useProfile() {
  const dispatch = useDispatch();

  const getProfile = async () => {
    const res = await authApi.get("/auth/profile");
    return res?.data?.user;
  };

  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data, dispatch]);

  return { data, isPending, isError, isSuccess, error };
}
