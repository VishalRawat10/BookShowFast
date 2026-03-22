import { GoogleLogin } from "@react-oauth/google";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { useNavigate, useSearchParams } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

export default function GoogleAuthButton() {
  const googleLogin = useGoogleLogin();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirectTo");

  return (
    <GoogleLogin
      onSuccess={(credentialRes) => {
        googleLogin.mutate(credentialRes);
        navigate(redirectUrl || "/");
      }}
      onError={(err) => addNotification(err?.response?.data?.message, true)}
    />
  );
}
