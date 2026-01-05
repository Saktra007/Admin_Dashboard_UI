import DarkModeToggle from "./DarkModeToggle";
import Profile from "../assets/Profile.png";
const Topbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className="bg-white border-b flex justify-between dark:border-b-gray-400 items-center shadow-md p-4 h-16  dark:bg-slate-600 dark:text-white text-black transition-colors duration-300">
      <h1>Dashboard Overview</h1>
      <img
        src={Profile}
        alt="Profile"
        className="border rounded-full size-12"
      />
      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </header>
  );
};

export default Topbar;
