import {
  Calendar,
  ExternalLink,
  Mail,
  MapPin,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const GlassInfoCard = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, type: "spring", stiffness: 100 }}
    className="p-5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-purple-500/10 rounded-2xl hover:border-sky-400 dark:hover:border-purple-500 transition-all duration-500 group"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-sm text-sky-500 dark:text-purple-500 border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform duration-500">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div className="overflow-hidden">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm font-black text-slate-800 dark:text-white truncate tracking-wide max-w-[150px]">
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const UserProfile = ({ user, onClose, isOpen ,onEdit}) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && user && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-30"
          />

          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-30 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl border border-white dark:border-purple-900/20 shadow-[0_32px_80px_-20px_rgba(14,165,233,0.25)] max-w-2xl w-full pointer-events-auto"
            >
              {/* Ambient Background Lights */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky-600/20 blur-[100px] rounded-full animate-pulse" />

              {/* Futuristic Header Section */}
              <div className="h-44 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/20 dark:via-purple-500/20 to-transparent skew-x-12"
                />
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-rose-500 transition-all group"
                >
                  <X
                    size={20}
                    strokeWidth={3}
                    className="group-hover:rotate-90 transition-transform"
                  />
                </button>
              </div>

              {/* Profile Content */}
              <div className="px-10 pb-10">
                <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-16 mb-8">
                  {/* Orbital Avatar */}
                  <div className="relative group">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-4 border border-dashed border-purple-500/30 rounded-full"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-sky-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="relative w-36 h-36 rounded-2xl p-1 bg-gradient-to-tr from-purple-500 to-sky-500 ">
                      <img
                        src={
                          user.avatar && user.avatar !== "null"
                            ? user.avatar.startsWith("http")
                              ? user.avatar
                              : `${import.meta.env.VITE_API_BASE_URL}/upload/${user.avatar}`
                            : `https://ui-avatars.com/api/?name=${user.full_name}&background=0ea5e9&color=fff`
                        }
                        alt="Core Identity"
                        onError={(e) =>
                          (e.target.src = `https://ui-avatars.com/api/?name=${user.full_name}&background=0ea5e9&color=fff`)
                        }
                        className="w-full h-full object-cover rounded-2xl border-2 border-white dark:border-slate-900"
                      />
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <motion.h2
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-3xl font-black text-slate-800 dark:text-white"
                    >
                      {user.full_name}
                    </motion.h2>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 dark:bg-white text-white dark:text-slate-900 rounded-lg shadow-lg shadow-sky-500/10 dark:shadow-purple-500/20">
                        <Zap size={12} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-sky-500/10 dark:bg-purple-500/20 border border-sky-200 dark:border-purple-500/20 text-sky-500 dark:text-purple-500 rounded-lg">
                        <MapPin size={12} strokeWidth={2.5} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Phnom Penh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassInfoCard
                    icon={Mail}
                    label="Email Address"
                    value={user.email}
                    delay={0.1}
                  />
                  <GlassInfoCard
                    icon={Calendar}
                    label="Member Since"
                    value={new Date(user.created_at).toLocaleDateString()}
                    delay={0.2}
                  />

                  {/* Security Status Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-2 p-6 bg-gradient-to-br from-sky-50/50 to-white dark:from-purple-500/5 dark:to-slate-800/40 border border-sky-100 dark:border-purple-500/10 rounded-2xl flex items-center justify-between group overflow-hidden relative"
                  >
                    <div className="relative z-10">
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                        Identity Integrity
                      </p>
                      <h4 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide">
                        {user.status === "Active"
                          ? "Core Identity verified and operational."
                          : user.status
                            ? "Security protocols pending validation."
                            : "Access restricted by administrator"}
                      </h4>
                    </div>
                    <div
                      className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 ${user.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : user.status === "Pending" ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"}`}
                    >
                      <Shield size={24} strokeWidth={2.5} />
                    </div>
                    {/* Animated background shape */}
                    <div className="absolute top-0 right-0 w-32 h-full bg-sky-500/5 skew-x-12 translate-x-10 group-hover:translate-x-0 transition-transform duration-1000" />
                  </motion.div>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-6">
                  <button onClick={onEdit} className="flex-[2] relative overflow-hidden group h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-sky-500/10 dark:shadow-purple-500/20">
                    <div className="absolute inset-0 bg-slate-900 dark:bg-white transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 text-white dark:text-slate-900 group-hover:text-white flex items-center justify-center gap-3">
                      Synchronize Identity
                    </span>
                  </button>
                  <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 dark:hover:text-purple-500 rounded-2xl flex items-center justify-center transition-all hover:shadow-lg active:scale-95 group">
                    <ExternalLink
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;
