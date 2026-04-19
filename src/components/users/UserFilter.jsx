import React, { useState } from "react";
import { Input, Select } from "../ui";
import {
  Calendar,
  ChevronDown,
  RotateCcw,
  Search,
  Shield,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import { AnimatePresence, motion } from "framer-motion";

const UserFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterRole,
    setFilterRole,
    dateRange,
    setDateRange,
  } = useUsers();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleClear = () => {
    setSearchTerm("");
    setFilterStatus("All");
    setFilterRole("All Roles");
    setDateRange({ start: "", end: "" });
  };

  const statusOptions = ["All", "Active", "Pending", "Inactive"];
  return (
    <div className="relative z-20 space-y-4">
      {/* Main Filter Bar */}
      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 grid grid-cols-1 lg:flex items-center gap-4 w-full">
        {/* Search Input Box */}
        <div className="relative flex-1 w-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-sky-500/20 rounded-[1.8rem] blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"/>
          <div className="absolute left-5 top-0 bottom-0 my-auto h-5 w-5 flex items-center justify-center text-slate-400 group-focus-within:text-sky-500 transition-colors z-10">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Filter by name, identity or status.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[52px] px-12 rounded-[1.8rem] bg-white/80 dark:bg-slate-950/50 backdrop-blur-md border border-sky-100 dark:border-purple-900/20 outline-none focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/5 dark:focus:ring-purple-500/5 text-slate-700 dark:text-slate-200 text-sm transition-all placeholder:text-slate-400 font-medium "
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-0 bottom-0 my-auto h-8 w-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full text-slate-400 hover:text-rose-500 transition-all z-10"
              >
                <X size={16} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-950/60 border border-sky-100 dark:border-purple-900/20 rounded-3xl backdrop-blur-xl relative z-10 w-full lg:w-auto overflow-hidden">
          {statusOptions.map((status) => {
            const isActive = (filterStatus || "All") === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus?.(status)}
                className={`relative flex-1 lg:flex-none px-6 py-2.5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap z-10 ${isActive ? "text-white" : "text-slate-500 hover:text-sky-500 dark:hover:text-purple-500 "}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-3xl shadow-md shadow-sky-500/30 dark:shadow-purple-600/30 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {status}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <AnimatePresence>
            {(searchTerm || filterStatus !== "All") && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleClear}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/80 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-3xl text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm shadow-rose-500/5 group"
              >
                <RotateCcw
                  size={14}
                  strokeWidth={3}
                  className="group-hover:-rotate-180 transition-transform duration-700"
                />
                <span>Flush</span>
              </motion.button>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-6 py-4 rounded-3xl font-bold text-[10px] uppercase tracking-widest transition-all overflow-hidden relative shadow-sm border ${showAdvanced ? "bg-sky-500 text-white border-sky-400" : "bg-white dark:bg-slate-950/50 text-slate-600 dark:text-slate-400 border-sky-100 dark:border-purple-900/30 hover:bg-slate-50"}`}
          >
            <SlidersHorizontal
              size={18}
              className={showAdvanced ? "animate-pulse" : "text-sky-500"}
            />
            <span>Advanced</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative z-30"
          >
            <div className="bg-white/40 dark:bg-slate-900/20 backdrop-blur-md p-6 rounded-2xl border border-sky-100/50 dark:border-purple-900/20 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Filter  */}
              <div className="relative z-40">
                <Select
                  label="Member Role"
                  icon={Shield}
                  value={filterRole}
                  onChange={setFilterRole}
                  options={[
                    { label: "All Roles", value: "All Roles" },
                    { label: "Administrator", value: "admin" },
                    { label: "Editor", value: "editor" },
                    { label: "Standard User", value: "user" },
                  ]}
                />
              </div>

              {/* Date Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-400 dark:text-slate-500 ml-2">
                  <Calendar size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Joined Period
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="w-full bg-white/40 dark:bg-slate-900/40 border border-sky-100 dark:border-purple-900/20 rounded-xl px-3 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all cursor-pointer"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="w-full bg-white/40 dark:bg-slate-900/40 border border-sky-100 dark:border-purple-900/20 rounded-xl px-3 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserFilter;
