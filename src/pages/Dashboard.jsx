import { useNavigate } from "react-router-dom";
import { Clock, UserCheck, UserPlus, Users } from "lucide-react";
import {
  ActivityHeatmap,
  DashboardHeader,
  MainChart,
  TipCard,
  RecentUsers,
  StatCard,
  StatusDonut,
} from "../components/dashboard";
import { motion } from "framer-motion";
import { useUsers } from "../hooks/useUsers";
import { EmptyState } from "../components/ui";
import { useMemo } from "react";
const Dashboard = () => {
  const { allUsers, stats, loading } = useUsers();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="p-6 lg:p-10 space-y-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] " />

        {/* Dashboard Header Skeleton */}
        <div className="h-32 w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-purple-100/20 dark:border-purple-900/20 rounded-2xl animate-pulse relative overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute w-1/2 inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-purple-500/5 to-transparent"
          />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-purple-100/20 rounded-2xl  relative overflow-hidden"
            >
              {/* Shimmer Animattion  */}
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
                className="absolute w-1/2 inset-0 bg-gradient-to-r from-transparent via-purple-100/10 dark:via-sky-400/5 skew-x-[30deg] to-transparent"
              />

              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-slate-800/50" />
              <div className="mt-12 ml-4 space-y-2">
                <div className="h-3 w-20 bg-slate-200/50 dark:bg-slate-800/50 rounded-full " />
                <div className="h-6 w-12 bg-slate-200/50 dark:bg-slate-800/50 rounded-full " />
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-[450px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-purple-100/20 dark:border-purple-900/20 rounded-2xl animate-pulse" />
          <div className="lg:col-span-4 h-[450px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-purple-100/20 dark:border-purple-900/20 rounded-2xl animate-pulse" />
        </div>
      </div>
    );

  // ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardConfigs = useMemo(
    () => [
      {
        title: "Total Users",
        value: stats?.total?.value ?? 0,
        icon: Users,
        trend: stats?.total?.trend,
        trendValue: stats?.total?.trendValue,
        color: "bg-gradient-to-br from-blue-600 to-blue-400",
        status: "All",
      },
      {
        title: "Active Users",
        value: stats?.active?.value ?? 0,
        icon: UserCheck,
        trend: stats?.active?.trend,
        trendValue: stats?.active?.trendValue,
        color: "bg-gradient-to-br from-emerald-600 to-emerald-400",
        status: "Active",
      },
      {
        title: "New Users (Month)",
        value: stats?.newUsers?.value ?? 0,
        icon: UserPlus,
        trend: stats?.newUsers?.trend,
        trendValue: stats?.newUsers?.trendValue,
        color: "bg-gradient-to-br from-purple-600 to-purple-400",
        status: "All",
      },
      {
        title: "Pending Approval",
        value: stats?.pending?.value ?? 0,
        icon: Clock,
        trend: stats?.pending?.trend,
        trendValue: "0",
        color: "bg-gradient-to-br from-amber-600 to-amber-400",
        status: "Pending",
      },
    ],
    [stats],
  );

  return (
    <motion.div
      variants={containerVariants}
      id="dashboard-content"
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-10 bg-[#f8fafc] dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-x-hidden relative z-10"
    >  
      {/* Background Decorative Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <DashboardHeader users={allUsers} stats={stats} navigate={navigate} />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {cardConfigs.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              onClick={() => navigate("/users")}
            />
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10"
        >
          <div className="lg:col-span-8 min-h-[450px]">
            <MainChart users={allUsers} />
          </div>
          <div className="lg:col-span-4 min-h-[450px]">
            <StatusDonut stats={stats} />
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column:Heatmap + Tip */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <ActivityHeatmap users={allUsers} />
            <TipCard users={allUsers} />
          </div>

          {/* Right Column: Recent Users */}
          <div className="lg:col-span-5 h-full">
            {allUsers?.length > 0 ? (
              <RecentUsers users={allUsers} navigate={navigate} />
            ) : (
              <EmptyState
                title="No Users Registered"
                subtitle="It looks like your community is quiet today. Let's add some users!"
              />
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Dashboard;
