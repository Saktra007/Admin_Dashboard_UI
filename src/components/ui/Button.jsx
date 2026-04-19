const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg";

  const variants = {
    primary:
      "bg-gradient-to-r from-sky-500 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/25 hover:brightness-110  shadow-lg dark:shadow-purple-500/15",
    danger:
      "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:shadow-xl hover:shadow-rose-500/20 hover:brightness-110  border border-white/10 shadow-lg shadow-rose-500/15",
    success:
      "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl hover:shadow-emerald-500/20 hover:brightness-110 border border-white/10 shadow-lg shadow-emerald-500/15 ",
    outline:
      "border-2 border-sky-100 dark:border-purple-900/30 text-slate-600 dark:text-slate-300 hover:border-sky-500 dark:hover:border-purple-500 hover:text-sky-500 dark:hover:text-purple-500 bg-white/50 backdrop-blur-md dark:bg-slate-900/50 shadow-sm",
    ghost:
      "text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-900/10 hover:text-sky-500 dark:hover:text-purple-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] gap-2",
    md: "px-6 py-3.5 text-sm gap-2.5",
    lg: "px-8 py-4.5 text-base gap-3",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? "scale-95 brightness-90 cursor-wait" : ""}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.024 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && Icon && (
        <Icon
          size={size === "sm" ? 14 : size === "lg" ? 20 : 18}
          strokeWidth={3}
        />
      )}
      {children}
    </button>
  );
};
export default Button;
