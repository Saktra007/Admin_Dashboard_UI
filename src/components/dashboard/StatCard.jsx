import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "../ui";
import { motion } from "framer-motion";
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color,
  onClick,
}) => {
  const isPositive = trend === "up";
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      aria-label={`View details for ${title}`}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      className="group relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-white/60 dark:border-white/10 transition-all duration-500 hover:shadow-xl hover:shadow-sky-500/5 dark:hover:shadow-purple-500/10 hover:-translate-y-1.5 cursor-pointer active:scale-95"
    >
      {/* Top Hover Glow Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 dark:via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Background Glow Spot */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 ${color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}
      />

      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-bold mt-2 text-slate-800 dark:text-white tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h3>

          {trendValue && (
            <div className="flex items-center mt-3.5">
              <Badge
                variant={isPositive ? "success" : "danger"}
                className="!tracking-wider"
              >
                {isPositive ? (
                  <ArrowUpRight size={10} className="mr-0.5" strokeWidth={3} />
                ) : (
                  <ArrowDownRight
                    size={10}
                    className="mr-0.5"
                    strokeWidth={3}
                  />
                )}
                {trendValue}%
              </Badge>
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-1.5 font-medium">
                vs last month
              </span>
            </div>
          )}
        </div>

        {/* Icon Box */}
        <div
          className={`relative p-4 rounded-xl ${color} text-white shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 overflow-hidden`}
        >
          {/* Shine Effect */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-full transition-all duration-1000" />
          {Icon && <Icon size={22} strokeWidth={2.5} />}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex justify-between items-center ">
        <span className="text-xs font-semibold text-sky-500 dark:text-purple-500 tracking-wide">VIEW DETAILS</span>
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-sky-500 dark:group-hover:bg-purple-500 text-sky-500 dark:text-purple-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
          <ArrowUpRight size={12} strokeWidth={3} />
        </div>
      </div>
    </motion.div>
  );
};
export default StatCard;
