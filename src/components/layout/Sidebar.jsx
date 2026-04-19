import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Logo } from "../ui";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const menuItem = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-950 transition-all duration-500 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:bg-transparent lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="h-full w-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-r border-purple-100 dark:border-purple-900/20 flex flex-col shadow-xl lg:shadow-none relative overflow-hidden">
        {/* Header Area */}
        <div className="h-20 flex items-center justify-between px-6 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Logo className="w-9 h-9" />
            <span className="text-sm font-black uppercase tracking-tighter text-slate-800 dark:text-white">
              Zenith{" "}
              <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent font-black italic">
                Dash
              </span>
            </span>
          </motion.div>

          {/* Close Button Mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-purple-500 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-200/50 dark:bg-white/5">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
            />{" "}
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
                delay: 1.5,
              }}
              className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-8 px-3 space-y-1.5 overflow-y-auto no-scrollbar">
          {menuItem.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                className={({ isActive }) =>
                  `relative group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${isActive ? "bg-gradient-to-r from-sky-500/10 to-purple-500/10 text-purple-600 dark:text-sky-400 shadow-sm shadow-purple-500/5" : "text-slate-500 hover:bg-purple-50 dark:hover:bg-purple-900/10"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeSideBar"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-0 w-1 h-6 bg-gradient-to-b from-sky-500 to-purple-600 rounded-r-full"
                        />
                      )}
                    </AnimatePresence>
                    <item.icon
                      size={19}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`${isActive ? "text-purple-500 scale-110" : "group-hover:text-sky-500 group-hover:scale-110"} transition-all duration-300`}
                    />
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? "font-black" : "group-hover:text-purple-600"}`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                      >
                        <ChevronRight size={14} className="text-purple-400" />
                      </motion.div>
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-purple-100 dark:border-purple-900/20">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="relative w-full group flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-900 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 border border-slate-200 dark:border-purple-900/20 rounded-xl" />
            <div className="absolute inset-[-1000%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_60deg,#0ea5e9_90deg,transparent_120deg,transparent_240deg,#9333ea_270deg,transparent_300deg)]"
              />
            </div>
            <div className="absolute inset-[1.5px] bg-white dark:bg-slate-900 rounded-[11px] z-0" />
            <div className="relative z-10 flex items-center gap-3 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-sky-400 transition-colors duration-300">
              <LogOut
                size={18}
                strokeWidth={3}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Sign Out
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
