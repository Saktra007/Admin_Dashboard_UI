import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { DarkModeToggle } from "../ui";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";

const Topbar = ({ toggleSidebar }) => {
  const { currentUser } = useAuth();
  const { setSearchTerm } = useUsers();
  const avatarUrl = currentUser?.avatar
    ? currentUser.avatar.startsWith("http")
      ? currentUser.avatar
      : `https://zenith-backend-jdhp.onrender.com/${currentUser.avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.full_name || "Admin")}&background=6366f1&color=fff&bold=true`;

  return (
    <header className="h-20 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border-b border-purple-100 dark:border-purple-900/20 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 transition-all duration-500">
      {/* Mobile Toggle & Search  */}
      <div className="flex items-center gap-4 flex-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl lg:hidden hover:bg-purple-50 dark:hover:bg-purple-900/10 text-slate-500 transition-colors border border-transparent hover:border-purple-200 dark:hover:border-purple-900/30"
        >
          <Menu size={22} />
        </motion.button>

        {/* Search Bar */}
        <div className="hidden md:block w-80 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={18}
              className="text-slate-400 group-focus-within:text-sky-500 dark:group-focus-within:text-purple-500"
            />
          </div>
          <input
            type="text"
            placeholder="Search User..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 py-2 rounded-xl outline-none transition-all duration-300 bg-white/40 dark:bg-slate-900/40 border border-sky-100 dark:border-purple-900/30 placeholder:text-slate-400 dark:text-white focus:border-sky-500/50 dark:focus:border-purple-500/50 focus:ring-4 focus:ring-sky-500/5 dark:focus:ring-purple-500/10"
          />
        </div>
      </div>

      {/* Actions & Dynamic User Profile */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Dark Mode & Notifications */}
        <div className="flex items-center gap-2 pr-2 border-r border-purple-100 dark:border-purple-900/20">
          <DarkModeToggle />

          <button className="p-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/10 text-slate-500 relative group transition-all">
            <Bell
              size={20}
              className="group-hover:rotate-12 group-hover:text-purple-500 transition-all"
            />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-gradient-to-tr from-sky-400 to-purple-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse"></span>
          </button>
        </div>

        {/* Dynamic User Profile Area */}
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center gap-3 pl-2 cursor-pointer group"
        >
          <div className="hidden md:block text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-tighter text-slate-800 dark:text-white leading-none">
                {currentUser?.first_name
                  ? `${currentUser.first_name} ${currentUser.last_name || ""}`
                  : "Guest Admin"}
              </span>
              <Sparkles
                size={10}
                className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-[9px] font-bold bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-[0.2em] mt-1 opacity-90 italic">
              {currentUser?.role || "Administrator"}
            </p>
          </div>

          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-sky-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />

            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 group-hover:from-sky-400 group-hover:to-purple-600 transition-all duration-500">
              <img
                src={avatarUrl}
                alt="profile"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.full_name || "Admin")}&background=6366f1&color=fff&bold=true`;
                }}
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Online Status Dot */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Topbar;
