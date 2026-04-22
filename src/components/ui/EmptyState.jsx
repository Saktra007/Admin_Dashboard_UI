import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Ghost, UserPlus } from "lucide-react";
const EmptyState = ({
  title = "No Users Found",
  subtitle = "Start by adding your first team member to the platform.",
  onAction,
  buttonText,
}) => {
  const isSearchEmpty = !buttonText;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center bg-white/50 dark:bg-slate-950/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-purple-100 dark:border-purple-900/20 transition-all duration-300 min-h-[400px] overflow-hidden relative"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] pointer-events-none" />
      <div className="relative mb-8">
        {/* Main Icon Container */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="h-28 w-28 bg-gradient-to-tr from-sky-50 to-purple-50 dark:from-sky-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center border border-purple-100 dark:border-purple-500/20 shadow-inner"
        >
          <Ghost
            className="w-12 h-12 text-sky-500 dark:text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            strokeWidth={1.5}
          />
          {/* Rotating Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-sky-400/40 rounded-full"
          ></motion.div>
        </motion.div>

        {/* Floating Datebase Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center rotate-12 border-2 border-white dark:border-slate-900"
        >
          <Database className="w-4 h-4 text-white" />
        </motion.div>
      </div>

      <div className="max-w-xs mb-8 z-10">
        <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-800 dark:text-white">
          {title.split(" ")[0]}{" "}
          <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent">
            {title.split(" ").slice(1).join(" ")}
          </span>
        </h3>
        <p className="text-[13px] text-slate-400 font-medium mt-4 leading-relaxed px-4">
          {subtitle}
        </p>
      </div>
      {buttonText ? (
        <motion.button
          onClick={onAction}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-gradient-to-r from-sky-500 to-purple-600 text-white px-10 py-5 mb-4 rounded-2xl font-black uppercase italic text-xs tracking-[0.15em] group transition-all"
        >
          <UserPlus className="w-4 h-4 stroke-[3]" />
          {buttonText}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
        </motion.button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="text-sky-500 font-bold text-[10px] uppercase tracking-widest mb-8 hover:text-purple-500 cursor-pointer transition-colors"
        >
          [ Reset Search Filters ]
        </button>
      )}
      {!isSearchEmpty && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] opacity-60">
            Waiting for incoming data...
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
