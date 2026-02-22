import { Menu, Sun, Moon, Bell, Search } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const Topbar = ({toggleSidebar}) => {
  const { isDarkMode, toggleDarkMode }=useTheme();
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 transition-colors">
      
      {/* ផ្នែកខាងឆ្វេង: ប៊ូតុង Menu លើ Mobile និង Search Bar */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-transparent focus-within:border-blue-500 transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="ស្វែងរក..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 text-gray-700 dark:text-gray-200 w-64"
          />
        </div>
      </div>

      {/* ផ្នែកខាងស្តាំ: Dark Mode, Notifications, Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* ប៊ូតុងប្ដូរ Dark Mode */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* ប៊ូតុង Notification */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </button>

        {/* Profile User */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200 dark:border-gray-800">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">Admin Name</p>
            <p className="text-xs text-gray-500 mt-1">Super Admin</p>
          </div>
          <img 
            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" 
            alt="profile" 
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

      </div>
    </header>
  );
};

export default Topbar;