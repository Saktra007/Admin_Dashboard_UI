import { useState } from "react";
import { userService } from "../../services/user.service";
import { showToast } from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Input, AvatarUpload } from "../ui";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const { registerSuccess } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "password" || name === "confirm_password") {
      setErrors((prev) => ({ ...prev, password: "", confirm_password: "" }));
    }
  };

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return null;
    if (pass.length < 6) return { label: "Weak", color: "text-rose-500" };
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/))
      return { label: "Strong", color: "text-emerald-500" };
    return { label: "Medium", color: "text-amber-500" };
  };

  const handleAvatarSelect = (file) => {
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/users/auth/google`;
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name.trim())
      newErrors.first_name = "First name required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Must be at least 6 characters";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Password is required";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null)
          data.append(
            key,
            typeof formData[key] === "string"
              ? formData[key].trim()
              : formData[key],
          );
      });

      const res = await userService.signup(data);

      if (res && res.success) {
        const userData = res.data;

        registerSuccess(userData);
        setFormData({});
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      const serverMsg = error.response?.data?.message || "Registration Failed";
      showToast(serverMsg, "error");
      if (serverMsg.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: "Email already in use" }));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full lg:max-w-5xl mx-auto"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-8">
          <div className="w-full lg:w-1/3 flex">
            <AvatarUpload onFileSelect={handleAvatarSelect} />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="first_name"
                icon={User}
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                error={errors.first_name}
              />
              <Input
                label="Last Name"
                name="last_name"
                icon={User}
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                error={errors.last_name}
              />
            </div>
            <Input
              label="Email Address"
              name="email"
              icon={Mail}
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              {strength && !errors.password && (
                <span
                  className={`absolute right-2 top-0 text-[9px] font-black uppercase tracking-widest ${strength.color}`}
                >
                  Strength: {strength.label}
                </span>
              )}
            </div>

            <Input
              label="Confirm Password"
              name="confirm_password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={handleChange}
              error={errors.confirm_password}
            />
          </div>
        </div>
        <div className="pt-8 space-y-4 lg:space-y-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <Button
              type="submit"
              variant="primary"
              className="w-full py-4"
              isLoading={loading}
              icon={UserPlus}
            >
              Create Owner Account
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2 lg:hidden">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              <span className="flex-shrink mx-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* Goole Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full py-4 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 flex items-center justify-center"
            >
              <svg className="w-5 h-5 lg:mr-2" viewBox="0 0 24 24">
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
              Sign up with Google
            </Button>
          </div>
        </div>
        <p className="pt-6 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-500 hover:text-purple-500 transition-colors inline-flex items-center gap-1 group"
          >
            Login Here
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </p>
      </form>
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-white/20 shadow-xl text-center max-w-sm w-full"
          >
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-xl font-black uppercase text-slate-800 dark:text-white mb-2">
              Account Created!
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Your professional dashboard is ready. Redirecting you to
              dashboard...
            </p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-emerald-500"
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RegisterForm;
