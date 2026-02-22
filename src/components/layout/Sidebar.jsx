import { LayoutDashboard, Users, Settings, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const activeClass = "bg-blue-600 text-white shadow-lg";
  const inactiveClass = "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <>
      {/* Overlay សម្រាប់ Mobile (ចុចលើផ្ទៃខាងក្រៅដើម្បីបិទ Sidebar) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Main Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold text-blue-600">MY ADMIN</span>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path ? activeClass : inactiveClass
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-800">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;