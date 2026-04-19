import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lightbulb, Sparkles, Zap } from "lucide-react";
import InsightModal from "./InsightModal";

const TipCard = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const insights = useMemo(() => {
    if (!users.length) return { peak: "N/A", maintenance: "N/A" };

    const hoursCount = new Array(24).fill(0);

    users.forEach((user) => {
      if (user.created_at) {
        const hour = new Date(user.created_at).getHours();
        hoursCount[hour]++;
      }
    });

    const peakHour = hoursCount.indexOf(Math.max(...hoursCount));

    const quietHour = hoursCount.indexOf(Math.min(...hoursCount));

    const formatHour = (h) => {
      const ampm = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 || 12;
      return `${displayHour}${ampm}`;
    };
    return {
      peak: `${formatHour(peakHour)} - ${formatHour((peakHour + 2) % 24)}`,
      maintenance: `${formatHour(quietHour)} - ${formatHour((quietHour + 4) % 24)}`,
    };
  }, [users]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative p-8 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-sky-100 dark:border-purple-900/20  shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 transition-all duration-500 h-auto flex flex-col justify-center overflow-hidden"
      >
        {/* Background Glow Effects  */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[90px] group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-all duration-700 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Decorative Background Icon */}
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.02] group-hover:opacity-[0.08] group-hover:-rotate-12 group-hover:scale-110 transition-all duration-1000 pointer-events-none">
          <Zap
            size={280}
            strokeWidth={1.5}
            className="text-purple-600 dark:text-white"
          />
        </div>

        <div className="relative z-10">
          {/* Header With Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-sky-50 to-purple-50 dark:from-purple-500/10 dark:to-sky-500/10 rounded-xl border border-sky-100 dark:border-purple-500/20 text-sky-500 dark:text-purple-500 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] dark:group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="font-black italic uppercase tracking-[0.25em] text-sky-500 dark:text-purple-500 text-[10px] leading-none">
                System Insight
              </h4>
              <div className="h-[2px] w-10 bg-gradient-to-r from-sky-500 dark:from-purple-500 to-transparent mt-1 rounded-full" />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-md">
            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4 leading-none text-slate-800 dark:text-white">
              System{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-indigo-500">
                Intelligence
              </span>
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 tracking-wide opacity-80">
              Peak activity is detected at:{" "}
              <span className="font-bold text-sky-500 dark:text-purple-500 px-2 py-0.5 bg-sky-50 dark:bg-purple-500/10 rounded-md border border-sky-100 dark:border-purple-500/20 mx-1">
                {insights.peak}
              </span>
              <br />
              Optimization: Schedule maintenance during
              <span className="text-sky-500 font-bold underline decoration-sky-500/30 underline-offset-4 ml-1">
                {insights.maintenance}
              </span>
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="group/btn relative flex items-center gap-2 px-5 py-2.5 bg-slate-950 dark:bg-white rounded-xl transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-sky-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-950">
                Execute Analysis
              </span>
              <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500 dark:bg-purple-500 flex items-center justify-center text-white group-hover/btn:rotate-45 transition-transform">
                <ArrowUpRight size={12} strokeWidth={3} />
              </div>
            </motion.button>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-sky-500 dark:from-purple-500 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>
      {isModalOpen && (
        <InsightModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          users={users}
        />
      )}
    </>
  );
};

export default TipCard;
