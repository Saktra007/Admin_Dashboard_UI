import { UserPlus, CircleX } from "lucide-react";
import { useState } from "react";
const UserModal = ({ setIsModalOpen, addUser }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Admin");
  const [newStatus, setNewStatus] = useState("Active");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newEmail ) return alert("Please Input Data!")
    addUser(newName, newEmail, newRole, newStatus);
    setNewName("");
    setNewEmail("");
  };
  return (
    <div className="fixed bg-opacity-50 bg-black inset-0 m-auto flex">
      <div className="w-96 h-96 p-2 bg-gray-200 shadow-md m-auto rounded-lg dark:bg-gray-700 text-center transition-colors duration-700">
        <div className="p-4 flex border-2 m-4 rounded-md justify-between bg-black text-white dark:bg-stone-100 dark:text-black items-center">
          <h1>Add New User</h1>
          <button onClick={() => setIsModalOpen(false)}>
            <CircleX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="m-2 p-2 rounded-md w-11/12 border-2 dark:bg-slate-600 dark:text-white"
            placeholder="Enter Name"
          />
          <input
            type="email"
            id="Email"
            className="m-2 p-2 rounded-md w-11/12 border-2 dark:bg-slate-600 dark:text-white"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <div className="w-11/12 m-2 mt-1 p-2 flex rounded-md justify-between">
            <label htmlFor="Role" className="ml-2 text-base dark:text-white">
              Role:
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                id="Role"
                className="ml-2 border-2 p-2 rounded-md text-sm dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
              </select>
            </label>
            <label htmlFor="Status" className="text-base dark:text-white">
              Status:
              <select
                id="Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="ml-2 p-2 border-2 rounded-md text-sm dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div className="flex w-full justify-center">
            <button
            type="button"
              className="w-24 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
            >
              <UserPlus />
              &nbsp; Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserModal;
