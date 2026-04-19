import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-[#05070a] transition-colors duration-500 relative font-sans overflow-hidden">
      {/* Dynamic Background Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/5 blur-[150px] rounded-full" />

      </div>
      {/* Sidebar Components  */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative min-w-0 z-10 overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Page Content Holder */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative px-4 lg:px-6 pb-6">
          {/* Floating Content Wrapper */}
          <div className="max-w-[1600px] mx-auto mt-4 min-h-[calc(100vh-140px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Footer Label */}
          <footer className="max-w-[1600px] mx-auto mt-auto pt-12 pb-6 border-t border-slate-200/50 dark:border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 opacity-60">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-gradient-to-r from-sky-500 to-transparent" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 text-center md:text-left">
                  © 2026{" "}
                  <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent font-black">
                    ZENITH
                  </span>{" "}
                  SYSTEM
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 ">
                  Stable Version 2.0.4
                </span>
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <div className="h-1.5 w-[30px] rounded-full bg-slate-200 dark:bg-white/10" />
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
