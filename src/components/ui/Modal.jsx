import React, { useEffect } from "react";
import { X } from "lucide-react";
const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md mx-auto animate-in zoom-in-95 duration-300">
        <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg outline-none focus:outline-none transition-all">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-100 dark:border-gray-700 rounded-t">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              className="p-1 ml-auto hover:text-gray-600 dark:hover:text-gray-200 transition-colors outline-none focus:outline-none"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative p-6 flex-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
