import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  label,
  icon: Icon,
  error,
  type,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${error ? "text-rose-400" : "text-slate-400 group-focus-within:text-sky-500 dark:group-focus-within:text-purple-500 group-focus-within:scale-110"}`}
          >
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full py-4 rounded-xl outline-none transition-all duration-300 bg-white/40 dark:bg-slate-900/40 border border-sky-100 dark:border-purple-900/30 placeholder:text-slate-400 dark:text-white ${Icon ? "pl-12" : "pl-5"} ${isPassword ? "pr-12" : "pr-5"} ${error ? "border-rose-500/50 focus:ring-rose-500/10" : "focus:border-sky-500/50 dark:focus:border-purple-500/50 focus:ring-4 focus:ring-sky-500/5 dark:focus:ring-purple-500/10"} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 dark:hover:text-purple-500 transition-colors z-20 p-1"
          >
            {showPassword ? (
              <Eye size={18} strokeWidth={2.5} />
            ) : (
              <EyeOff size={18} strokeWidth={2.5} />
            )}
          </button>
        )}
        {/* Border Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-purple-500 transition-all duration-500 group-focus-within:w-[80%] opacity-50 rounded-full " />
      </div>
      <div className="h-4 ml-2">
        {error && (
          <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider ml-2 animate-pulse">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
