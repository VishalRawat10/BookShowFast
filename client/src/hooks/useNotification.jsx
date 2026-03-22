import { useDispatch, useSelector } from "react-redux";
import { setNotification, clearNotification } from "../store/notificationSlice";

export default function useNotification() {
  const { message, isError } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const addNotification = (message, isError = false) => {
    dispatch(setNotification({ message, isError }));
  };

  const removeNotification = () => {
    dispatch(clearNotification());
  };

  return {
    message,
    isError,
    addNotification,
    removeNotification,
  };
}
