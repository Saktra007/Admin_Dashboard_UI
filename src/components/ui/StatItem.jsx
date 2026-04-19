import { motion } from "framer-motion";

const StatItem = ({ icon, label, value }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-sky-100 dark:border-purple-900/20 rounded-xl shadow-lg shadow-sky-500/5 dark:shadow-purple-500/10 overflow-hidden transition-all duration-300"
    >
      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon Container With Glow */}
      <div className="relative z-10 flex items-center mb-3">
        <div className="p-2 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-sky-50 dark:border-purple-900/30 dark:group-hover:shadow-purple-500/40 group-hover:border-sky-200 dark:group-hover:border-purple-200 transition-all">
          {icon}
        </div>
      </div>
      <div className="relative z-10 flex flex-col mb-1">
        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-2">
          {label}
        </span>
        <span className="text-xl font-black text-slate-600 dark:text-white mt-1 uppercase italic">
          {value}
        </span>
      </div>
      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-sky-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full" />
    </motion.div>
  );
};

export default StatItem;
