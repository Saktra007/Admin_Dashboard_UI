import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { Plus } from "lucide-react";
import { UserFilter, UserForm, UserTable } from "../components/users";
import { Modal } from "../components/ui";

const Users = () => {
  const { addUser, updateUser } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (selectedUser) {
      updateUser(selectedUser.id, data);
    } else {
      addUser(data);
    }
    setIsModalOpen(false);
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">User Management</h1>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-all active:scale-95 shadow-md"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
        <UserFilter />
      </div>

      {/* User Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <UserTable onEdit={handleOpenEdit} />
      </div>

      {/* Modal Login */}
      {isModalOpen && (
        <Modal
          title={selectedUser ? "Edit User" : "Add New User"}
          onClose={() => setIsModalOpen(false)}
        >
          <UserForm
            initialData={selectedUser}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Users;
