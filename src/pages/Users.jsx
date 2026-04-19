import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUsers } from "../hooks/useUsers";
import { Plus, Sparkles, UsersIcon } from "lucide-react";
import {
  DeleteConfirm,
  StatCards,
  UserFilter,
  UserForm,
  UserProfile,
  UserTable,
} from "../components/users";
import { Modal, Button } from "../components/ui";

const Users = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });

  const handleOpenAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (user) => {
    setDeleteModal({ isOpen: true, user });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.user) {
      const res = await deleteUser(deleteModal.user._id);
      if (res.success) {
        setDeleteModal({ isOpen: false, user: null });
      }
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleFormSubmit = async (data) => {
    let res;
    if (selectedUser) {
      res = await updateUser(selectedUser._id, data);
    } else {
      res = await addUser(data);
    }
    if (res && res.success) {
      setIsModalOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 min-h-screen relative overflow-hidden"
    >
      {/* Background Zenith Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-sky-500/10 dark:bg-purple-500/20 rounded-lg">
              <UsersIcon
                size={18}
                className="text-sky-500 dark:text-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-sky-500 dark:text-purple-500 uppercase tracking-widest">
                Database Management
              </span>
              <Sparkles size={12} className="text-amber-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">
            Team{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-600 to-indigo-500">
              Core Members
            </span>
          </h1>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button icon={Plus} onClick={handleOpenAdd} className="w-full">
            Add New Identity
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Cards Section */}
      <motion.div variants={itemVariants} className="relative z-10">
        <StatCards users={users} />
      </motion.div>
      {/* Filter & Search Section */}

      <UserFilter />

      {/* User Table Section */}
      <UserTable
        users={users}
        loading={loading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onAddClick={handleOpenAdd}
        onView={handleViewProfile}
      />

      {/* Modal Login */}
      <Modal
        isOpen={isModalOpen}
        title={selectedUser ? "Modify Identity" : "Onboard New Member"}
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <UserForm
          initialData={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
      <DeleteConfirm
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleConfirmDelete}
        loading={loading}
        userName={
          deleteModal.user
            ? `${deleteModal.user.first_name} ${deleteModal.user.last_name}`
            : ""
        }
      />
      <UserProfile
        user={selectedUser}
        onClose={() => setIsViewOpen(false)}
        isOpen={isViewOpen}
        onEdit={() => {
          setIsViewOpen(false);
          handleOpenEdit(selectedUser);
        }}
      />
    </motion.div>
  );
};

export default Users;
