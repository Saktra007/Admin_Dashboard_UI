import React from "react";
import { CirclePlus, Search } from "lucide-react";
const FilterBar = ({
  setIsModalOpen,
  filterStatus,
  searchTerm,
  setSearchTerm,
  setFilterStatus,
}) => {
  return (
    <div className="bg-gray-200 dark:bg-slate-700 rounded-md p-4 col-span-1 md:col-span-2 lg:col-span-4">
      <h1 className="text-lg mb-3 pl-2">Recent Users</h1>
      <div className="grid gap-3 items-center grid-cols-5 max-md:grid-cols-1">
        <label htmlFor="" className="relative col-span-2 max-md:col-span-1 m-2">
          <div className="absolute inset-0 flex items-center pl-2 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-lg dark:bg-slate-500 bg-slate-100 p-2 pl-8 placeholder:text-sm"
          />
        </label>
        <div className="flex justify-around col-span-2 md:my-2 max-md:col-span-1">
          {["All", "Active", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`dark:bg-slate-600 bg-gray-100 shadow w-full mx-2 py-2 border-2 rounded-md ${
                filterStatus === status
                  ? " underline underline-offset-2 dark:bg-slate-900 bg-gray-400"
                  : "dark:hover:bg-slate-900 hover:bg-cyan-50 hover:shadow-md"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="max-md:flex w-full col-span-1 ">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full justify-center max-md:mx-2 shadow-md hover:shadow-lg bg-sky-400 p-2 rounded-md hover:bg-sky-500"
          >
            <CirclePlus />
            &nbsp; Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
