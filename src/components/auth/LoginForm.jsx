import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import { Button, Input } from "../ui";
import { ArrowRight, Lock, LogIn, Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRemeberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errorType = searchParams.get("error");
    if (errorType) {
      if (errorType === "auth_failed") {
        setErrors({
          general: "Google Authentication failed. Please try again.",
        });
      } else if (errorType === "no_user") {
        setErrors({ general: "No user information found from Google." });
      } else {
        setErrors({ general: "An unexpected error occureed during login." });
      }
      showToast("Login process interrupted", "error");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = () => {
    setErrors({});
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/users/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await login(formData.email, formData.password, rememberMe);
      if (res.success) {
        showToast("Welcome back to Dashboard!", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      const serverMsg = error.response?.data?.message || "Login  Failed";

      const msgLower = serverMsg.toLowerCase();
      if (msgLower.includes("email") || msgLower.includes("user")) {
        setErrors((prev) => ({ ...prev, email: serverMsg }));
      } else if (msgLower.includes("password")) {
        setErrors((prev) => ({ ...prev, password: serverMsg }));
      } else {
        setErrors((prev) => ({ ...prev, general: serverMsg }));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {errors.general && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase text-center">
            {errors.general}
          </div>
        )}
        <Input
          label="Email Address"
          type="email"
          name="email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="owner@company.com"
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between mt-2 mb-4">
          <label
            htmlFor="remember"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRemeberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
            />
            <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
              Remember Me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-[10px] font-black uppercase text-sky-500 hover:text-purple-500 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 mt-2"
            isLoading={loading}
            icon={LogIn}
          >
            Sign In to System
          </Button>
          <div className="relative flex items-center justify-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            <span className="flex-shrink mx-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full py-4 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
        <p className=" pt-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          New Owner?{" "}
          <Link
            to="/register"
            className="text-sky-500 hover:text-purple-500 transition-colors inline-flex items-center gap-1 group"
          >
            Create Account{" "}
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm;
