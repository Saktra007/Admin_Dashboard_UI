import { motion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export const showToast = (message, type = "success") => {
  toast.dismiss();

  const configs = {
    success: {
      label: "Action Completed",
      icon: <CheckCircle2 size={20} strokeWidth={2.5} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      bar: "bg-emerald-500",
    },
    error: {
      label: "System Exception",
      icon: <AlertCircle size={20} strokeWidth={2.5} />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      bar: "bg-rose-500",
    },
    warning: {
      label: "System Warning",
      icon: <AlertTriangle size={20} strokeWidth={2.5} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      bar: "bg-amber-500",
    },
    info: {
      label: "System Update",
      icon: <Info size={20} strokeWidth={2.5} />,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      bar: "bg-sky-500",
    },
  };

  const config = configs[type] || configs.success;

  const toastID = toast.custom(
    (t) => (
      <div
        className={`${t.visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"} max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl p-4 rounded-2xl pointer-events-auto flex items-center gap-4 relative overflow-hidden group transition-all duration-500 ease-[transition-timing-function:cubic-bezier(0.23,1,0.32,1)]`}
      >
        {/* Glow effect Hover */}
        <div className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Icon Section */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${config.bg} ${config.color}`}
        >
          {config.icon}
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">
            {config.label}
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="p-2 bg-transparent border rounded-full border-slate-500  dark:border-slate-400 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
        {/* Dynamic Progress Bar */}
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3.5, ease: "linear" }}
          className={`absolute bottom-0 left-0 h-1 ${config.bar} opacity-60 `}
        />
      </div>
    ),
    { duration: 3500 },
  );
  setTimeout(() => {
    toast.dismiss(toastID);
  }, 3500);
};
