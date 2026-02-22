import React from "react";
import {  Filter, Search, X } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
const UserFilter = () => {
  const { searchTerm, setSearchTerm, filterStatus, setFilterStatus } =
    useUsers();
  const handleClear = () => {
    setSearchTerm("");
    setFilterStatus("All");
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      {/* Search Input Group */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Filter Dropdown Group */}
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter className="h-4 w-4 text-gray-400" />
        </div>
        <select
          name="status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      {/* Clear Button */}
      {(searchTerm || filterStatus !== "All") && (
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors p-2 whitespace-nowrap"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default UserFilter;
