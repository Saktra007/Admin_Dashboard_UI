import { ArrowRight, Calendar, Download, Sparkles } from "lucide-react";
import { Button } from "../ui";
import { exportToPdf } from "../../utils/exportPdf";
import { useState } from "react";
import { motion } from "framer-motion";

const DashboardHeader = ({ users, stats, navigate }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await exportToPdf(stats, users);
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6"
    >
      {/* Background Ambient Glows */}
      <div className="absolute -left-20 -top-20 w-72 h-72 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Top Badge Overlay */}
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-gradient-to-r from-sky-500/10 to-purple-500/10 dark:from-sky-500/20 dark:to-purple-500/20 border border-sky-500/20 dark:border-purple-500/30 rounded-full flex items-center gap-2">
            <div className="h-[2px] w-6 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full" />
            <span className="text-[10px] font-black bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-[0.25em]">
              Admin Control Panel
            </span>
          </div>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={14} className="text-purple-500 dark:text-sky-500 animate-bounce" />
          </motion.div>
        </div>

        {/* Title With Gradient  */}
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">
          Dashboard{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-600 to-indigo-500 pr-2 drop-shadow-sm">
            Overview
          </span>
        </h1>

        {/* Status & Date Bar */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-purple-100 dark:border-purple-900/20 shadow-sm rounded-xl transition-all duration-500 hover:border-purple-500/30 group">
            <Calendar size={14} className="text-sky-500 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 ">
              Today is{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="hidden h-5 w-[1px] bg-purple-100 dark:bg-purple-900/30 sm:block" />

          <div className="flex items-center gap-2.5 px-4 py-2 ">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 relative z-10">
        <Button
          variant="outline"
          icon={Download}
          size="md"
          onClick={handleExport}
          isLoading={isExporting}
          disabled={isExporting}
          className="rounded-2xl font-bold"
        >
          REPORT
        </Button>
        <Button
          variant="primary"
          icon={ArrowRight}
          size="md"
          className="rounded-2xl font-bold "
          onClick={() => navigate("/users")}
        >
          MANAGE USERS
        </Button>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
