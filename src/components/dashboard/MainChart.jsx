import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../hooks/useTheme";

const MainChart = ({ users = [] }) => {
  const { isDarkMode } = useTheme();
  const [view, setView] = useState("weekly");

  const chartData = useMemo(() => {
    const now = new Date();

    if (view === "weekly") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(now.getDate() - (6 - i));
        d.setHours(0, 0, 0, 0);
        return {
          label: days[d.getDay()],
          timestamp: d.getTime(),
          count: 0,
        };
      });

      users.forEach((user) => {
        if (!user.created_at) return;

        const userDate = new Date(user.created_at);
        userDate.setHours(0, 0, 0, 0);
        const userTimestamp = userDate.getTime();

        const dayMatch = last7Days.find((d) => d.timestamp === userTimestamp);

        if (dayMatch) dayMatch.count++;
      });
      return {
        categories: last7Days.map((d) => d.label),
        series: last7Days.map((d) => d.count),
      };
    } else {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const currentYear = now.getFullYear();
      const monthlyStats = months.map((m, i) => ({
        label: m,
        monthIndex: i,
        count: 0,
      }));

      users.forEach((user) => {
        if (!user.created_at) return;

        const date = new Date(user.created_at);

        if (date.getFullYear() === currentYear) {
          monthlyStats[date.getMonth()].count++;
        }
      });
      return {
        categories: monthlyStats.map((m) => m.label),
        series: monthlyStats.map((m) => m.count),
      };
    }
  }, [users, view]);

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
      foreColor: isDarkMode ? "#94a3b8" : "#64748b",
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: {
          enabled: true,
          speed: 450,
        },
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        blur: 10,
        opacity: isDarkMode ? 0.3 : 0.1,
        color: isDarkMode ? "#8b5cf6" : "#0ea5e9",
      },
    },
    colors: isDarkMode ? ["#8b5cf6"] : ["#0ea5e9"],
    stroke: { curve: "smooth", width: 3, lineCap: "round" },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        gradientToColors: isDarkMode ? ["#d946ef"] : ["#0ea5e9"],
        opacityFrom: isDarkMode ? 0.3 : 0.25,
        opacityTo: 0,
        stops: [20, 100],
      },
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: isDarkMode ? "#64748b" : "#94a3b8",
          fontWeight: 700,
          fontSize: "11px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? "#64748b" : "#94a3b8",
          fontWeight: 700,
          fontSize: "11px",
        },
      },
      forceNiceScale: true,
      min: 0,
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: isDarkMode
        ? "rgba(168,85,247,0.1)"
        : "rgba(168,85,247,0.05)",
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      padding: { top: 0, right: 10, bottom: 0, left: 10 },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      x: { show: true },
      y: { title: { formatter: () => "New Users: " } },
      style: { fontSize: "12px", fontFamily: "inherit" },
    },
    markers: {
      size: 3,
      colors: isDarkMode ? ["#8b5cf6"] : ["#0ea5e9"],
      strokeColors: isDarkMode ? "#0f172a" : "#fff",
      strokeWidth: 3,
      hover: { size: 5 },
    },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 h-full transition-all duration-500 group"
    >
      {/* Ambient Glow Background */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-500/10 dark:bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
        <div>
          <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-800 dark:text-white">
            User{" "}
            <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent pr-0.5">
              Growth
            </span>{" "}
            Trend
          </h3>
          <motion.p
            key={view}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] text-slate-400 font-black tracking-widest mt-1 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            {view === "weekly"
              ? "LAST 7 DAYS ACTIVITY"
              : `YEARLY REGISTRATION ${new Date().getFullYear()}`}
          </motion.p>
        </div>

        {/* Toggle Buttons */}
        <div className="relative flex bg-sky-50 dark:bg-purple-950/40 p-1 rounded-xl border border-sky-100 dark:border-purple-900/30 w-full md:w-auto">
          <motion.div
            className="absolute top-1 bottom-1 bg-white dark:bg-slate-800 rounded-lg shadow-md shadow-sky-500/10 dark:shadow-purple-500/20"
            initial={false}
            animate={{ x: view === "weekly" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              left: 4,
              width: "calc(50% - 4px)",
            }}
          />
          <button
            onClick={() => setView("weekly")}
            className={`relative z-10 px-6 py-2 text-[10px] font-black rounded-lg transition-colors duration-500 flex-1 md:w-28 ${view === "weekly" ? "text-sky-500 dark:text-purple-500" : "text-slate-500  hover:text-slate-700 dark:hover:text-slate-200"}`}
          >
            WEEKLY
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`relative z-10 px-6 py-2 text-[10px] font-black rounded-lg transition-colors duration-500 flex-1 md:w-28 ${view === "monthly" ? "text-sky-500 dark:text-purple-500" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"}`}
          >
            MONTHLY
          </button>
        </div>
      </div>
      <div className="relative min-h-[320px] z-10">
        <ReactApexChart
          options={options}
          series={[{ name: "New Users", data: chartData.series }]}
          type="area"
          height={320}
        />
      </div>
    </motion.div>
  );
};

export default MainChart;
