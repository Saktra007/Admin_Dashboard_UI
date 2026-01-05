import { Pencil, Trash2 } from "lucide-react";
import EditUserModal from "./EditUserModal";
const Table = ({
  filterusers,
  onDeleteUser,
  onEditUser,
  isEditOpen,
  setIsEditOpen,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 md:h-[300px] h-[300px] overflow-y-scroll">
      <table className=" w-full bg-white border dark:border-gray-700 rounded-lg shadow mt-6">
        <thead className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center bg-white dark:bg-slate-700 dark:text-white text-black">
          {filterusers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td
                className={`border px-4 py-2 ${
                  user.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                <div
                  className={`border-2 rounded-full ${
                    user.status === "Active"
                      ? "border-green-700 bg-green-100"
                      : "border-red-700 bg-red-100"
                  }`}
                >
                  {user.status}
                </div>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => {
                    setIsEditOpen(true);
                    setSelectedUser(user);
                  }}
                >
                  <Pencil size={24} />
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDeleteUser(user.id)}
                >
                  <Trash2 size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditOpen && selectedUser && (
        <EditUserModal
          key={selectedUser.id}
          onEditUser={onEditUser}
          setIsEditOpen={setIsEditOpen}
          selectedUser={selectedUser}
        />
      )}
      {filterusers.length === 0 && (
        <p className="text-center py-6">No users found</p>
      )}
    </div>
  );
};
export default Table;
