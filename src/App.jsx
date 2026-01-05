import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { users } from "./data/users.js";
const App = () => {
  const [userData, setUserData] = useState(() => {
    const my_user = localStorage.getItem("user");
    return my_user ? JSON.parse(my_user) : users;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode === "dark" ? true : false;
  });
  const addUser = (addname, addemail, addrole, addstatus) => {
    setUserData([
      ...userData,
      {
        id: Date.now(),
        name: addname,
        email: addemail,
        role: addrole,
        status: addstatus,
      },
    ]);
  };
  const filterusers = useMemo(() => {
    return userData.filter((user) => {
      const matchesSearch =
        user.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || user.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [userData, filterStatus, searchTerm]);
  const onDeleteUser = (userId) => {
    if (!confirm("Are you sure")) return;
    setUserData(userData.filter((user) => user.id !== userId));
  };
  const onEditUser = (EditUser) => {
    setUserData(
      userData.map((user) => (user.id === EditUser.id ? EditUser : user))
    );
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);
  return (
    <div className="w-full h-screen max-lg:h-full flex mx-auto shadow-lg bg-white text-black dark:text-white dark:bg-slate-500 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <h2 className="text-4xl text-center p-4 ">
          Welcome to the Admin Dashboard
        </h2>
        <Dashboard
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          setFilterStatus={setFilterStatus}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          addUser={addUser}
          filterStatus={filterStatus}
          filterusers={filterusers}
          userData={userData}
          onDeleteUser={onDeleteUser}
          onEditUser={onEditUser}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </div>
  );
};

export default App;
