const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`cursor-pointer p-2 w-[70px] h-8 flex items-center bg-gray-200 rounded-full dark:bg-gray-700`}
    >
      <div
        className={`w-6 h-6 rounded-full transition-all duration-300 ${
          isDarkMode ? "translate-x-8 bg-gray-600" : "translate-x-0 bg-gray-300 "
        }`}
      >
        {isDarkMode ? (
          <div className="flex justify-center items-center h-full text-yellow-400">
            &#9728;
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-800">
            &#9790;
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
