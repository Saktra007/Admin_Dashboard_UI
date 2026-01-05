import React, { useState } from "react";
import { CircleX, Save } from "lucide-react";
const EditUserModal = ({ onEditUser, selectedUser, setIsEditOpen }) => {
  const [formData, setFormData] = useState({
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    role: selectedUser?.role || "User",
    status: selectedUser?.status || "Active",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.toLowerCase()]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name)
      return alert("Please fill all fields");

    onEditUser({
      ...selectedUser,
      ...formData,
    });
    setIsEditOpen(false);
  };

  return (
    <div
      onClick={() => setIsEditOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">Edit User</h2>
          <button
            onClick={() => setIsEditOpen(false)}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <CircleX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter Email"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-200">
                Role
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-200">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
