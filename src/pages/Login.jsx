import { motion } from "framer-motion";
import { Logo } from "../components/ui";
import { LoginForm } from "../components/auth";
const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden py-12">
      {/* background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo className="w-24 h-24" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-black uppercase text-slate-800 dark:text-white"
          >
            System{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-sky-500 to-purple-500">
              Access
            </span>
          </motion.h1>

          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest pt-2">
            Welcome back, Administrator
          </p>
        </div>
        {/* Card Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-8 rounded-2xl shadow-2xl shadow-sky-500/5 relative"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
