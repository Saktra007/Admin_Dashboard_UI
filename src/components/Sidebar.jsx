import Logo from "../assets/Logo.png";
const Sidebar = () => {
  const menu = ["Dashboard", "Users", "Products", "Settings"];
  return (
    <div className="w-64 bg-white shadow-md text-black dark:bg-slate-600 dark:text-white flex-col hidden md:flex">
      <div className="p-6 flex justify-center">
        <img src={Logo} alt="Logo" className="h-28 object-contain" />
      </div>
      <ul className="mx-auto my-8 space-y-6">
        {menu.map((item) => (
          <li
            key={item}
            className={`w-32 p-3 text-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-700 cursor-pointer transition hover:shadow-md duration-300 ${
              item === "Dashboard" ? "border-2 bg-slate-300 " : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
