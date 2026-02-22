const StatCard = ({ title, value, icon, trend, color = "blue" }) => {
  const colors = {
    blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    green: "text-green-600 bg-green-100 dark:bg-green-900/30",
    purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
    orange: "text-orange-600 bg-orange-100 dark:bg-orange-900/30",
  };
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h3 className=" text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </h3>
        {trend && (
          <p className="text-xs font-medium text-green-500 mt-1">
            {trend}
            <span className="text-gray-400 font-normal">from last month</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
