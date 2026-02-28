import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../services/axios";

export default function useProfile() {
  const dispatch = useDispatch();

  const getProfile = async () => {
    const res = await api.get("/auth/profile");
    return res;
  };

  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isSuccess) dispatch(setUser(data.data.user));
  if (isError) console.log(error);

  return { data, isPending, isError, isSuccess };
}
