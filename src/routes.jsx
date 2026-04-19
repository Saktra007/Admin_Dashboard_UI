import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { motion } from "framer-motion";
import { ProtectedRoute } from "./components/auth";
import { Login, Register, LoginSuccess, Dashboard, Users } from "./pages";

const NotFound = () => (
  <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-2xl text-center shadow-2xl relative overflow-hidden"
    >
      <motion.div
        initial={{ left: "-100%" }}
        animate={{ left: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "linear",
        }}
        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[25deg] pointer-events-none z-10"
      />
      <div className="absolute top-0 inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
      <h1 className="text-8xl font-black text-slate-200 dark:text-slate-800 mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl font-black uppercase italic text-slate-800 dark:text-white mb-4">
        Page <span className="text-sky-500">Not Found</span>
      </h2>
      <p className="text-slate-500 dark:text-slate-200 text-sm mb-8 font-bold leading-relaxed">
        The link you followed may broken, or the page may have been removed.
      </p>
      <a
        href="/dashboard"
        className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest shadow-xl hover:scale-105 transition-transform"
      >
        Back to Dashboard
      </a>
    </motion.div>
  </div>
);
const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/login-success", element: <LoginSuccess /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "users", element: <Users /> },
          {
            path: "settings",
            element: (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8"
              >
                <div className="bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border border-white/50 dark:border-white/10 p-10 rounded-2xl">
                  <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
                    Settings <span className="text-sky-500">Panel</span>
                  </h1>
                  <p className="text-slate-500 font-bold mt-4">
                    This module is Currently under development...
                  </p>
                </div>
              </motion.div>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
