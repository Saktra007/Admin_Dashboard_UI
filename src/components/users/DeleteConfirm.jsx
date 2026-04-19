import { motion } from "framer-motion";
import { Button, Modal } from "../ui";
import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteConfirm = ({ isOpen, onClose, onConfirm, loading, userName }) => {
  const displayName = userName || "this identity";
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" size="sm">
      <div className="flex flex-col items-center text-center space-y-5">
        {/* Warning Icon with pulse effect */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 border-4 border-white dark:border-slate-900 shadow-xl shadow-rose-500/10"
          >
            <AlertTriangle size={36} strokeWidth={2.5} />
          </motion.div>
          {/* Aura Icon */}
          <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full -z-10" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
            Terminate <span className="text-rose-500">Identity ?</span>
          </h4>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed px-2">
            You are about to permanently delete{" "}
            <span className="font-bold text-slate-900 dark:text-white underline decoration-rose-500/40 underline-offset-4">
              "{displayName}"
            </span>
            . This neural record will be erased from the core database.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col w-full gap-3 pt-4">
          <Button
            variant="danger"
            size="lg"
            onClick={onConfirm}
            isLoading={loading}
            className="w-full py-4 uppercase tracking-widest text-xs font-black"
            icon={Trash2}
          >
            Confirm Termination
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={loading}
            className="w-full py-4 uppercase tracking-widest text-xs font-black"
          >
            Abort Action
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
