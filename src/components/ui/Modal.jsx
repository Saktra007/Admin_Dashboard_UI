import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 sm:p-2">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20, rotateX: -5 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.35 }}
            className={`relative w-full ${sizes[size]} bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-[0_32px_64px_-16px_rgba(139,92,246,0.25),0_32px_64px_-16px_rgba(14,165,233,0.15)] overflow-hidden border border-white dark:border-slate-800`}
          >
            {/* Background Accent Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none " />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white flex items-center gap-3">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-all duration-300 hover:rotate-180"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            {/* Body */}
            <div className="relative z-10 px-8 py-6 overflow-y-auto max-h-[70vh] custom-scrollbar">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
