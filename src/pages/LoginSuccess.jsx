import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingScreen } from "../components/ui";

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      const userData = {
        token,
        first_name: searchParams.get("first_name"),
        last_name: searchParams.get("last_name"),
        avatar: searchParams.get("avatar"),
        email: searchParams.get("email"),
        role: searchParams.get("role"),
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      if (setCurrentUser) setCurrentUser(userData);

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      navigate("/login?error=no_token");
    }
  }, [searchParams, navigate, setCurrentUser]);

  return <LoadingScreen />;
};

export default LoginSuccess;
