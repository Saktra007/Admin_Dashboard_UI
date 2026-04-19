const Badge = ({ children, variant = "success", className = "" }) => {
  const variants = {
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]",
    danger:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.1)]",
    warning:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]",
    info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 shadow-[0_0_12px_rgba(14,165,233,0.1)]",
    purple:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.1)]",
    neutral:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  };

  const dotColors = {
    success: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    danger: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    info: "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]",
    purple: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
    neutral: "bg-slate-400 shadow-none",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-opacity-50 cursor-default ${variants[variant]} ${className}`}
    >
      {/* Neon Dot Indicator */}
      <span className="relative flex h-1.5 w-1.5 mr-2">
        {variant !== "neutral" && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`}
        />
      </span>
      {children}
    </span>
  );
};
export default Badge;
