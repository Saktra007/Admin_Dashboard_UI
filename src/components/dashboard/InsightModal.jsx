import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useMemo } from "react";
import { Activity, Clock, Sparkles, Users, X, Zap } from "lucide-react";
import { StatItem } from "../ui";
import ReactApexChart from "react-apexcharts";

const InsightModal = ({ users = [], isOpen, onClose }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const insights = useMemo(() => {
    const hours = new Array(24).fill(0);

    if (users.length > 0) {
      users.forEach((user) => {
        if (user?.created_at) {
          const date = new Date(user.created_at);
          if (!isNaN(date.getTime())) {
            hours[date.getHours()]++;
          }
        }
      });
    }

    const maxVal = Math.max(...hours);
    const peakIdx = hours.indexOf(maxVal);

    const formatHour = (h) => {
      if (h === 0) return "12 AM";
      if (h === 12) return "12 PM";

      return h > 12 ? `${h - 12} PM` : `${h} AM`;
    };

    const peakTime = maxVal > 0 ? formatHour(peakIdx) : "N/A";

    let healthStatus =
      users.length > 500
        ? "High Load"
        : users.length === 0
          ? "Idle"
          : "Optimal";

    const labels = [
      "12am",
      "3am",
      "6am",
      "9am",
      "12pm",
      "3pm",
      "6pm",
      "9pm",
      "11pm",
    ];
    const seriesData = [
      hours[0],
      hours[3],
      hours[6],
      hours[9],
      hours[12],
      hours[15],
      hours[18],
      hours[21],
      hours[23],
    ];

    return {
      total: users.length,
      peakHour: peakTime,
      health: healthStatus,
      series: seriesData,
      categories: labels,
    };
  }, [users]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
        sparkline: { enabled: false },
        fontFamily: "Inter,sans-serif",
        background: "transparent",
        animations: { enabled: true, easing: "easeinout", speed: 800 },
        dropShadow: {
          enabled: true,
          top: 8,
          blur: 4,
          opacity: 0.1,
          color: "#8b5cf6",
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: isDarkMode ? ["#8b5cf6"] : ["#0ea5e9"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          gradientToColors: isDarkMode ? ["#8b5cf6"] : ["#0ea5e9"],
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      colors: [isDarkMode ? "#8b5cf6" : "#0ea5e9"],
      xaxis: {
        categories: insights.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: isDarkMode ? "#64748b" : "#94a3b8",
            fontWeight: 700,
            fontSize: "12px",
          },
        },
      },
      yaxis: { show: false },
      grid: { show: false },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
        x: { show: true },
        y: { formatter: (val) => `${val} Users` },
      },
      dataLabels: { enabled: false },
      markers: {
        size: 4,
        colors: isDarkMode ? ["#8b5cf6"] : ["#0ea5e9"],
        strokeWidth: 2,
        strokeColors: isDarkMode ? "#0f172a" : "#fff",
        hover: { size: 6 },
      },
    }),
    [isDarkMode, insights.categories],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-[0_32px_80px_-12px_rgba(14,165,233,0.15)] dark:shadow-[0_32px_80px_-12px_rgba(139,92,246,0.15)] border border-sky-100 dark:border-purple-900/20 overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-start relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-500 dark:from-purple-500 to-indigo-600 rounded-lg text-white shadow-xl shadow-sky-500/20 dark:shadow-purple-500/30">
                  <Activity size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-800 dark:text-white leading-none">
                    Traffic{" "}
                    <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent pr-1">
                      Density
                    </span>
                  </h2>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mt-2 flex items-center gap-2">
                    <Sparkles
                      size={12}
                      className="text-sky-500 dark:text-purple-500"
                    />
                    System Intelligence Report
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-sky-50 dark:hover:bg-purple-50 rounded-full transition-all text-slate-400 dark:text-slate-500 group"
              >
                <X
                  size={24}
                  strokeWidth={3}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>
            <div className="p-6 pt-3 relative z-10">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <StatItem
                  icon={<Users className="text-sky-500" />}
                  label="Total Sample"
                  value={insights.total.toLocaleString()}
                />
                <StatItem
                  icon={<Clock className="text-purple-500" />}
                  label="Peak Activity"
                  value={insights.peakHour}
                />
                <StatItem
                  icon={<Zap className="text-amber-500" />}
                  label="System Health"
                  value={insights.health}
                />
              </div>

              {/* Dynamic Chart */}
              <div className="bg-white/50 dark:bg-slate-950/40 p-6 rounded-2xl border border-sky-100/50 dark:border-purple-900/20 shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Hourly Engagement Distribution
                    </h4>
                    <div className="h-1 w-8 bg-sky-500 dark:bg-purple-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-xl text-[9px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Live Data
                  </div>
                </div>
                <div className="h-64">
                  <ReactApexChart
                    options={chartOptions}
                    series={[{ name: "Traffic", data: insights.series }]}
                    type="area"
                    height="100%"
                  />
                </div>
              </div>
              <p className="mt-6 text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium italic opacity-60">
                * Data is processed based on user registration timestamps in
                UTC/Local.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InsightModal;
