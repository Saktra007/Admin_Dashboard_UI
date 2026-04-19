import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { userService } from "../services/user.service";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRole, setFilterRole] = useState("All Roles");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || loading) return;

    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        userService.getAllUsers(),
        userService.getStats(),
      ]);
      if (usersRes.success) setUsers(usersRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(userData).forEach((key) => {
          formData.append(key, userData[key]);
        });

        const res = await userService.register(formData);

        if (res.success) {
          setUsers((prev) => [res.data, ...prev]);
          await fetchUsers();
          return { success: true };
        }
      } catch (error) {
        return {
          success: false,
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers],
  );

  const updateUser = useCallback(
    async (id, userData) => {
      setLoading(true);
      try {
        const formData = new FormData();

        Object.keys(userData).forEach((key) => {
          if (key === "avatar") {
            if (userData[key] instanceof File) {
              formData.append(key, userData[key]);
            }
          } else {
            formData.append(key, userData[key]);
          }
        });
        const res = await userService.updateUser(id, formData);

        if (res.success) {
          setUsers((prev) =>
            prev.map((user) => (user._id === id ? res.data : user)),
          );
          await fetchUsers();
          return { success: true };
        }
      } catch (error) {
        return {
          success: false,
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers],
  );

  const deleteUser = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const res = await userService.deleteUser(id);
        if (res.success) {
          setUsers((prev) => prev.filter((user) => user._id !== id));
          await fetchUsers();
          return { success: true };
        }
      } catch (error) {
        return {
          success: false,
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = (
        user.full_name ||
        `${user.first_name || ""} ${user.last_name || ""}` ||
        ""
      ).toLowerCase();
      const email = (user.email || "").toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const userCreateAt = new Date(user.created_at);

      // Search Logic
      const matchesSearch =
        fullName.includes(searchLower) || email.includes(searchLower);

      // Status Logic
      const matchesStatus =
        filterStatus === "All" || user.status === filterStatus;

      const matchesRole =
        filterRole === "All Roles" || user.role === filterRole.toLowerCase();

      // Date Range Logic
      let matchesDate = true;
      if (dateRange.start) {
        matchesDate = matchesDate && userCreateAt >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        const endOfDay = new Date(dateRange.end);
        endOfDay.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && userCreateAt <= endOfDay;
      }
      return matchesSearch && matchesStatus && matchesRole && matchesDate;
    });
  }, [users, searchTerm, filterStatus, filterRole, dateRange]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const value = useMemo(
    () => ({
      users: filteredUsers,
      allUsers: users,
      fetchUsers,
      addUser,
      updateUser,
      deleteUser,
      loading,
      stats,
      searchTerm,
      setSearchTerm,
      filterStatus,
      setFilterStatus,
      filterRole,
      setFilterRole,
      dateRange,
      setDateRange,
    }),
    [
      filteredUsers,
      users,
      fetchUsers,
      addUser,
      updateUser,
      deleteUser,
      loading,
      stats,
      searchTerm,
      filterStatus,
      filterRole,
      dateRange,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
