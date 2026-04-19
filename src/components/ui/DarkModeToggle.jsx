import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative p-2 rounded-xl transition-all duration-500 outline-none group ${isDarkMode?"hover:bg-purple-500/10 text-purple-400":"hover:bg-sky-500/10 text-sky-500"}`}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 ${isDarkMode?"bg-purple-500/20":"bg-sky-500/20"}`} />

      <div className="relative w-5 h-5 z-10">
        <Sun
          size={20}
          strokeWidth={2.5}
          className={`absolute inset-0 transition-all duration-700 transform ${isDarkMode ? "rotate-[90deg] scale-0 opacity-0 blur-sm" : "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"}`}
        />
        <Moon
          size={20}
          strokeWidth={2.5}
          className={`absolute inset-0 transition-all duration-700 transform ${isDarkMode ? "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "-rotate-[90deg] scale-0 opacity-0 blur-sm"}`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
