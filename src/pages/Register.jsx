import { motion } from "framer-motion";
import React from "react";
import { Logo } from "../components/ui";
import { RegisterForm } from "../components/auth";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden py-6">
      {/* Background Decorative Elements (Gradients) */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md lg:max-w-5xl z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
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
            className="lg:text-xl text-2xl font-black uppercase text-slate-800 dark:text-white"
          >
            Create{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-sky-500 to-purple-500">
              Account
            </span>
          </motion.h1>

          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">
            Start managing your team today
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-4 rounded-2xl shadow-2xl shadow-sky-500/5 relative"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500/5 to-purple-500/5 pointer-events-none" />

          <div className="relative z-10">
            <RegisterForm />
          </div>
        </motion.div>

        {/* Quick Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-10 leading-relaxed"
        >
          By creating an account, you agree to our <br />
          <Link to="/terms" className="text-slate-800 dark:text-slate-200 underline hover:text-sky-500 cursor-pointer">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-slate-800 dark:text-slate-200 hover:text-sky-500 underline cursor-pointer">
            Privacy Policy
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default Register;
