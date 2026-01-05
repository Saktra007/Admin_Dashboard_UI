import React from "react";
import StatCard from "../components/StatCard";
import Table from "../components/Table";
import { DollarSign, ShoppingCart, Users } from "lucide-react";
import UserModal from "../components/UserModal";
import FilterBar from "../components/FilterBar";
const Dashboard = ({
  selectedUser,
  setSelectedUser,
  isEditOpen,
  setIsEditOpen,
  setFilterStatus,
  setSearchTerm,
  searchTerm,
  filterusers,
  filterStatus,
  userData,
  onDeleteUser,
  onEditUser,
  isModalOpen,
  setIsModalOpen,
  addUser,
}) => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={userData.length}
        icon={<Users size={24} />}
      />
      <StatCard
        title="Total Sales"
        value="$56,789"
        icon={<DollarSign size={24} />}
      />
      <StatCard
        title="New Orders"
        value={userData.filter((user) => user.status === "Active").length}
        icon={<ShoppingCart size={24} />}
      />
      <StatCard title="Pending Reviews" value="45" icon="📝" />
      <FilterBar
        setIsModalOpen={setIsModalOpen}
        setFilterStatus={setFilterStatus}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filterStatus={filterStatus}
      />
      {isModalOpen && (
        <UserModal setIsModalOpen={setIsModalOpen} addUser={addUser} />
      )}
      <Table
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        filterusers={filterusers}
        onDeleteUser={onDeleteUser}
        onEditUser={onEditUser}
      />
    </div>
  );
};

export default Dashboard;
