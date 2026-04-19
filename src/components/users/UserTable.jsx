import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Edit2,
  Eye,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, EmptyState, Pagination } from "../ui";

const UserTable = ({
  users = [],
  loading,
  onEdit,
  onDelete,
  onAddClick,
  onView,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: "first_name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];

    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === "first_name") {
          aValue = (
            a.full_name || `${a.first_name} ${a.last_name}`
          ).toLowerCase();
          bValue = (
            b.full_name || `${b.first_name} ${b.last_name}`
          ).toLowerCase();
        } else if (sortConfig.key === "created_at") {
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
        } else {
          aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
          bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
        }
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return sortedUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedUsers]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newAmount) => {
    setItemsPerPage(newAmount);
    setCurrentPage(1);
  };
  const getSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <ChevronDown
        size={14}
        className={`transition-transform duration-300 inline-block ${isActive ? "text-sky-500 dark:text-purple-500" : "text-slate-300"} ${isActive && sortConfig.direction === "asc" ? "rotate-180" : "rotate-0"}`}
      />
    );
  };
  if (loading)
    return (
      <div className="p-10 space-y-4 bg-white/30 dark:bg-slate-900/20 backdrop-blur-md">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 w-full bg-gradient-to-r from-purple-50 to-sky-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl animate-pulse border border-sky-100/20 dark:border-purple-100/20"
          />
        ))}
      </div>
    );

  if (users.length === 0 && !loading) {
    return (
      <EmptyState
        title="No Identities Found"
        subtitle="The neural network couldn't find any matching nembers. Initialize a new record to begin."
        buttonText="Initialize New Member"
        onAction={onAddClick}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="relative z-10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 w-full overflow-x-auto custom-scrollbar">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <th
                onClick={() => requestSort("first_name")}
                className="group px-8 py-4 cursor-pointer hover:text-sky-500 dark:hover:text-purple-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Identity Profile
                  <span
                    className={`transition-all duration-300 ${sortConfig.key === "first_name" ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-50 group-hover:translate-y-0 -translate-y-1"}`}
                  >
                    {getSortIcon("first_name")}
                  </span>
                </div>
              </th>
              <th
                onClick={() => requestSort("role")}
                className="group px-6 py-4 cursor-pointer hover:text-sky-500 dark:hover:text-purple-500 transition-colors hidden md:table-cell text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  Role
                  <span
                    className={`transition-all duration-300 ${sortConfig.key === "role" ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-50 group-hover:translate-y-0 -translate-y-1"}`}
                  >
                    {getSortIcon("role")}
                  </span>
                </div>
              </th>
              <th
                onClick={() => requestSort("status")}
                className="group px-6 py-4 cursor-pointer hover:text-sky-500 dark:hover:text-purple-500 transition-colors hidden md:table-cell text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  Status
                  <span
                    className={`transition-all duration-300 ${sortConfig.key === "status" ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-50 group-hover:translate-y-0 -translate-y-1"}`}
                  >
                    {getSortIcon("status")}
                  </span>
                </div>
              </th>
              <th
                onClick={() => requestSort("created_at")}
                className="group px-6 py-4 cursor-pointer hover:text-sky-500 dark:hover:text-purple-500 transition-colors hidden lg:table-cell"
              >
                <div className="flex items-center justify-center gap-2">
                  Joined Date
                  <span
                    className={`transition-all duration-300 ${sortConfig.key === "created_at" ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-50 group-hover:translate-y-0 -translate-y-1"}`}
                  >
                    {getSortIcon("created_at")}
                  </span>
                </div>
              </th>
              <th className="px-8 py-4 text-right">Access Control</th>
            </tr>
          </thead>
          <tbody className="before:leading-[1em] before:block">
            <AnimatePresence mode="popLayout">
              {currentTableData.map((user, index) => (
                <motion.tr
                  key={user._id || index}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="group shadow-xl shadow-sky-500/5 dark:shadow-purple-500/10 border rounded-3xl border-sky-100 dark:border-purple-900/20 transition-all duration-300"
                >
                  {/* Identity Profile */}
                  <td
                    className="px-8 py-4 first:rounded-l-3xl border-y border-l border-sky-50 dark:border-purple-900/10 group-hover:border-sky-200 dark:group-hover:border-purple-500/30 transition-colors cursor-pointer"
                    onClick={() => onView(user)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          user.avatar && user.avatar!=="null"?(user.avatar.startsWith("http")
                        ?user.avatar:`${import.meta.env.VITE_API_BASE_URL}/upload/${user.avatar}`
                        ):
                          `https://ui-avatars.com/api/?name=${user.full_name}&background=0ea5e9&color=fff`
                        }
                        alt={user.full_name}
                        className="w-11 h-11 rounded-2xl shadow-sm border-2 border-white dark:border-slate-800 object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${user.full_name}&background=0ea5e9&color=fff`;
                        }}
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white leading-tight group-hover:text-sky-600 dark:group-hover:text-purple-600 transition-colors">
                          {user.full_name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 mt-1 tracking-wider">
                          <Mail size={12} className="text-sky-400" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 hidden md:table-cell border-y border-sky-50 dark:border-purple-900/10 group-hover:border-sky-200 dark:group-hover:border-purple-500/30 transition-colors text-center">
                    <div className="flex items-center justify-center mx-auto gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl w-fit border border-slate-200/50 dark:border-slate-700/50">
                      <ShieldCheck
                        size={14}
                        className="text-sky-500 dark:text-purple-500"
                      />
                      {user.role}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 border-y border-sky-50 dark:border-purple-900/10 group-hover:border-sky-200 dark:group-hover:border-purple-500/30 transition-colors text-center">
                    <Badge
                      variant={
                        user.status === "Active"
                          ? "success"
                          : user.status === "Pending"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {user.status}
                    </Badge>
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-4 hidden lg:table-cell border-y border-sky-50 dark:border-purple-900/10 group-hover:border-sky-200 dark:group-hover:border-purple-500/30 transition-colors text-center">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {new Date(user.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  {/* Actions */}
                  <td className="px-8 py-4 text-right last:rounded-r-3xl border-y border-r border-sky-50 dark:border-purple-900/10 group-hover:border-sky-200 dark:group-hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(user)}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 hover:bg-slate-400 hover:text-white transition-all shadow-sm group/btn"
                        title="View Profile"
                      >
                        <Eye
                          size={16}
                          strokeWidth={2.5}
                          className="group-hover/btn:scale-110 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2.5 rounded-xl bg-sky-50  text-sky-600 hover:bg-sky-500 dark:text-purple-600 dark:bg-purple-500/10 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all shadow-sm"
                      >
                        <Edit2 size={16} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={sortedUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default UserTable;
