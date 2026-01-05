const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex bg-gray-100 p-4 dark:bg-slate-700 text-black dark:text-white rounded-xl border shadow hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center">
        <div className="mr-4 text-2xl">{icon}</div>
        <div>
          <h3 className=" text-sm">{title}</h3>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
