import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
const ItemsPerPageSelector = ({
  value,
  onChange,
  options = [5, 10, 20, 50],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-3 ml-2 border-l border-slate-200 dark:border-slate-800 pl-4">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Per Page
      </span>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 border border-sky-100 dark:border-purple-900/20 rounded-md text-[10px] font-black text-sky-500 dark:text-purple-400 hover:border-sky-300 transition-all"
        >
          {value}
          <ChevronDown
            size={12}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full mb-2 left-0 z-50 min-w-[70px] bg-white dark:bg-slate-900 border border-sky-100 dark:border-purple-900/30 rounded-md shadow-2xl overflow-hidden backdrop-blur-xl"
              >
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className="relative w-full px-4 py-2 text-[10px] font-black transition-colors flex items-center justify-center group"
                  >
                    {value===option&&(
                      <motion.div layoutId="activeOption" className="absolute inset-0 bg-sky-500 dark:bg-purple-500" transition={{type:"spring",bounce:0.2,duration:0.5}} />
                    )}
                    <span className={`relative z-10 ${value===option?"text-white":"text-slate-500 group-hover:text-sky-500"}`}>

                    {option}
                    </span>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems === 0) return null;
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-2 py-4 mt-4 gap-4">
      {/* Information & Selector */}
      <div className="flex items-center gap-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Showing{" "}
          <span className="text-sky-500">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="text-sky-500">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>
        </p>

        {/* Items Per Page Selector */}
        <ItemsPerPageSelector
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
        />
      </div>
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-sky-100 dark:border-purple-900/20 backdrop-blur-md">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl text-slate-400 hover:bg-sky-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${isActive ? "text-white" : "text-slate-500 hover:bg-sky-500 dark:hover:bg-slate-800"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePage"
                    className="absolute inset-0 bg-gradient-to-br from-sky-500 to-purple-500 rounded-xl shadow-lg shadow-sky-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}{" "}
                <span className="relative z-10">{page}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl text-slate-400 hover:bg-sky-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
