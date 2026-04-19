import { Calendar, ChevronRight, Mail, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge, Button, EmptyState } from "../ui";
import { useMemo } from "react";

const RecentUsers = ({ users = [], navigate }) => {
  const recentUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [users]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const getAvatarUrl = (user) => {
    if (user.avatar && user.avatar !== "default-avatar.png") return user.avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=0ea5e9&color=fff`;
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Pending":
        return "warning";
      case "Inactive":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 h-full transition-all duration-500 group">
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">
            Recent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-sky-500 underline decoration-sky-500/20 dark:decoration-purple-500/20 underline-offset-8 pr-1">
              Users
            </span>
          </h3>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex h-1.5 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-widest mt-1 uppercase">
              {recentUsers.length} Latest Registrations
            </p>
          </div>
        </div>
        {recentUsers.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate?.("/users")}
            className="group/btn shadow-none border-slate-200 dark:border-white/10"
          >
            View All
            <ChevronRight
              className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-sky-500 dark:group-hover/btn:text-purple-500"
              strokeWidth={3}
            />
          </Button>
        )}
      </div>

      {/* List */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {recentUsers.length > 0 ? (
            <motion.div
              key="user-list"
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {recentUsers.map((user) => (
                <motion.div
                  key={user._id || user.id}
                  variants={item}
                  className="group/item flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-sky-200 dark:hover:border-purple-500/30 hover:bg-white/80 dark:hover:bg-purple-500/5 transition-all duration-300 shadow-sm hover:shadow-sky-500/10 dark:hover:shadow-purple-500/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-sky-500 rounded-xl blur-[2px] opacity-0 group-hover/item:opacity-100 transition-opacity" /> */}
                      <img
                        src={getAvatarUrl(user)}
                        alt="avatar"
                        className="relative w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-slate-800 shadow-md transition-all group-hover/item:scale-105 group-hover/item:border-sky-500 dark:group-hover/item:border-purple-500"
                        onError={e=>{e.target.onerror=null;e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=0ea5e9&color=fff`}}
                      />
                      {user.role === "admin" && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-400 to-orange-600 p-0.5 rounded-full border-2 border-white dark:border-slate-900">
                          <ShieldCheck className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-[13px] text-slate-800 dark:text-white group-hover/item:text-sky-500 dark:group-hover/item:text-purple-500 transition-colors tracking-wide">
                        {user.full_name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 opacity-70">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                          <Mail className="w-3 h-3 text-sky-500" />
                          {user.email}
                        </span>
                        <div className="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          <Calendar className="w-3 h-3 text-purple-500" />
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Badge variant={getStatusVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmptyState
                title="Database Empty"
                subtitle="No New users joined recently. Waiting for the next registration to sync."
                buttonText="Create User"
                onAction={() => navigate?.("/users")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentUsers;
