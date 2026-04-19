import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toast";
import { Button, Input } from "../ui";
import { ArrowRight, Lock, LogIn, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRemeberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
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
