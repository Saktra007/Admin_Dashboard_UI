import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../hooks/useTheme";
const ActivityHeatmap = ({ users = [] }) => {
  const { isDarkMode } = useTheme();

  const chartData = useMemo(() => {
    if (!users?.length) return [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const timeSlots = [
      { name: "Night (0-6h)", hourRange: [0, 6], data: new Array(7).fill(0) },
      {
        name: "Morning (6-12h)",
        hourRange: [6, 12],
        data: new Array(7).fill(0),
      },
      {
        name: "Afternoon (12-18h)",
        hourRange: [12, 18],
        data: new Array(7).fill(0),
      },
      {
        name: "Evening (18-24h)",
        hourRange: [18, 24],
        data: new Array(7).fill(0),
      },
    ];
    users.forEach((user) => {
      if (!user.created_at) return;
      const date = new Date(user.created_at);
      const dayIndex = date.getDay();
      const hour = date.getHours();
      const slot = timeSlots.find(
        (s) => hour >= s.hourRange[0] && hour < s.hourRange[1],
      );
      if (slot) slot.data[dayIndex]++;
    });
    return [...timeSlots].reverse().map((slot) => ({
      name: slot.name,
      data: slot.data.map((count, i) => ({ x: days[i], y: count })),
    }));
  }, [users]);

  const options = useMemo(
    () => ({
      chart: {
        type: "heatmap",
        toolbar: { show: false },
        animations: { enabled: true, speed: 800 },
        background: "transparent",
        foreColor: isDarkMode ? "#94a3b8" : "#64748b",
        fontFamily: "Inter, sans-serif",
      },
      dataLabels: { enabled: false },
      stroke: { width: 4, colors: [isDarkMode ? "#0f172a" : "#ffffff"] },
      plotOptions: {
        heatmap: {
          enableShades: false,
          radius: 8,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: isDarkMode ? "#1e293b" : "#f8fafc",
                name: "None",
              },
              { from: 1, to: 5, color: "#7dd3fc", name: "Low" },
              { from: 6, to: 15, color: "#a855f7", name: "Medium" },
              { from: 16, to: 1000, color: "#7c3aed", name: "High" },
            ],
          },
        },
      },
      xaxis: {
        position: "top",
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: isDarkMode ? "#64748b" : "#94a3b8",
            fontWeight: 800,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: isDarkMode ? "#64748b" : "#94a3b8",
            fontWeight: 800,
          },
        },
      },
      grid: {
        show: false,
        padding: { right: 20, left: 20, bottom: 0, top: 0 },
      },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
        y: {
          formatter: (val) => `${val} New Users`,
        },
      },
    }),
    [isDarkMode],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="group relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 h-auto transition-all duration-500"
    >
      {/* Ambient Glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 mb-6 flex justify-between items-end">
        <div>
          <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-800 dark:text-white">
            Activity{" "}
            <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent pr-1.5">
              Density
            </span>
          </h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-widest mt-1 uppercase">
            Registration Peak Hours
          </p>
        </div>

        {/* Legend Indicator */}
        <div className="flex gap-1.5 mb-1">
          <div className="h-2 w-2 rounded-sm bg-sky-100 dark:bg-slate-800" />
          <div className="h-2 w-2 rounded-sm bg-sky-300" />
          <div className="h-2 w-2 rounded-sm bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
        </div>
      </div>

      <div className="relative z-10 min-h-[250px]">
        {chartData && chartData.length > 0 ? (
          <ReactApexChart
            options={options}
            series={chartData}
            type="heatmap"
            height={280}
          />
        ) : (
          <div className="flex items-center justify-center h-[280px] text-slate-400 text-xs tracking-widest uppercase font-black">
            Gathering Data..
          </div>
        )}
      </div>
      {/* Bottom Label */}
      <div className="flex items-center gap-2 opacity-50 relative z-10">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-sky-200 dark:via-purple-900/30 to-transparent" />
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          Timezone: Local System
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-sky-200 dark:via-purple-900/20 to-transparent" />
      </div>
    </motion.div>
  );
};

export default ActivityHeatmap;
