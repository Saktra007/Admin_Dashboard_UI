import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../hooks/useTheme";

const StatusDonut = ({ stats }) => {
  const { isDarkMode } = useTheme();

  const series = [
    stats?.active?.value || 0,
    stats?.pending?.value || 0,
    stats?.inactive?.value || 0,
  ];

  const legend = [
    {
      label: "Active",
      val: series[0],
      color: "bg-sky-500",
      glow: "shadow-sky-500/50",
    },
    {
      label: "Pending",
      val: series[1],
      color: "bg-purple-500",
      glow: "shadow-purple-500/50",
    },
    {
      label: "Inactive",
      val: series[2],
      color: "bg-slate-400",
      glow: "shadow-slate-400/50",
    },
  ];

  const options = {
    labels: ["Active Users", "Pending", "Inactive"],
    colors: ["#0ea5e9", "#a855f7", "#94a3b8"],
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
      },
      background: "transparent",
      dropShadow: {
        enabled: true,
        blur: 8,
        left: 0,
        top: 4,
        opacity: isDarkMode ? 0.3 : 0.1,
        color: "#000",
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "80%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "TOTAL USERS",
              fontSize: "12px",
              fontWeight: 900,
              color: isDarkMode ? "#64748b" : "#94a3b8",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
            value: {
              fontSize: "20px",
              fontWeight: 900,
              color: isDarkMode ? "#ffffff" : "#1e293b",
              offsetY: 5,
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 },
    tooltip: { theme: isDarkMode ? "dark" : "light" },
    states: {
      hover: { filter: { type: "darken", value: 0.9 } },
      active: { filter: { type: "none" } },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 h-full flex flex-col transition-all duration-500"
    >
      {/* Ambient Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-sky-500/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-800 dark:text-white">
          User <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent">Status</span>
        </h3>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-widest mt-1 uppercase">
          Composition Breakdown
        </p>
      </div>
      <div className="relative flex-1 flex items-center justify-center z-10 py-6">
        <div className="absolute w-44 h-44 bg-sky-500/5 dark:bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-3 gap-4 z-10 mt-auto">
        {legend.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{y:-5}}
            className="group/item flex flex-col items-center p-3 rounded-xl bg-white/50 dark:bg-slate-950/40 border border-purple-100 dark:border-purple-900/20 shadow-sm shadow-sky-500/5 dark:shadow-purple-500/10"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${item.color} ${item.glow} shadow-[0_0_10px] mb-2`}
            />
            <span className="text-[9px] font-black text-slate-400 uppercase dark:text-slate-500 tracking-widest mb-1 group-hover/item:text-slate-600 transition-colors">
              {item.label}
            </span>
            <span className="text-base font-black text-slate-800 dark:text-white leading-none tracking-tighter">
              {item.val}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatusDonut;
