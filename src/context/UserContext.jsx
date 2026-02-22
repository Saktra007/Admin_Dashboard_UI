import { createContext, useCallback, useMemo, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // កន្លែងហៅ Service (userService.getUsers())
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || user.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, filterStatus]);

  const addUser = useCallback((userData) => {
    const newUser = { id: Date.now(), ...userData };
    setUsers((prev) => [...prev, newUser]);
  }, []);

  const updateUser = useCallback((id, updateData) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updateData } : user)),
    );
  }, []);

  const deleteUser = useCallback((id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  }, []);

  const value = useMemo(
    () => ({
      users: filteredUsers,
      allUsers: users,
      loading,
      error,
      searchTerm,
      filterStatus,
      setFilterStatus,
      addUser,
      updateUser,
      deleteUser,
      setSearchTerm,
    }),
    [
      filteredUsers,
      users,
      addUser,
      loading,
      error,
      searchTerm,
      filterStatus,
      updateUser,
      deleteUser,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
