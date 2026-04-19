import { Clock, UserCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const StatCard = ({ title, value, icon: Icon, gradient, shadowColor }) => (
  <motion.div
    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative group bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 overflow-hidden transition-all duration-500"
  >
    {/* Background Glow Effect on Hover */}
    <div
      className={`absolute -right-10 -top-10 w-32 h-32 ${gradient} rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
    />
    <div className="relative z-10 flex items-center gap-6">
      {/* Icon with Glowing Box */}
      <div
        className={`p-3 rounded-lg ${gradient} shadow-lg ${shadowColor} flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-6`}
      >
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 leading-none">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-none italic">
          {value.toLocaleString()}
        </h3>
      </div>
    </div>
    
    {/* Subtle Decorative Progress Line */}
    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-transparent via-sky-500 dark:via-purple-500 to-transparent group-hover:w-full transition-all duration-700 opacity-50" />
  </motion.div>
);

const StatCards = ({ users = [] }) => {
  const stats = useMemo(
    () => [
      {
        title: "Total Members",
        value: users.length,
        icon: Users,
        gradient: "bg-gradient-to-br from-sky-400 to-indigo-600",
        shadowColor: "shadow-sky-500/30",
      },
      {
        title: "Active Now",
        value: users.filter((u) => u.status === "Active").length,
        icon: UserCheck,
        gradient: "bg-gradient-to-br from-emerald-400 to-teal-600",
        shadowColor: "shadow-emerald-500/30",
      },
      {
        title: "Pending Sync",
        value: users.filter((u) => u.status === "Pending").length,
        icon: Clock,
        gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
        shadowColor: "shadow-amber-500/30",
      },
    ],
    [users],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 relative z-10">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatCards;
