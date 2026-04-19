import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  icon: Icon,
  className = "",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) setActiveIndex(-1);
    else {
      const currentIndex = options.findIndex((opt) => opt.value === value);
      setActiveIndex(currentIndex);
    }
  }, [isOpen, options, value]);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          onChange(options[activeIndex].value);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;

      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const selectedOption = options.find((opt) => opt.value === value) || {
    label: "Select option",
    value: "",
  };
  return (
    <div
      className={`space-y-2 w-full relative z-[60] ${className}`}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 block">
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-full flex items-center justify-between py-2.5 px-5 bg-white/40 dark:bg-slate-900/40 border rounded-xl transition-all duration-500 outline-none shadow-sm ${error ? "border-rose-500/50 ring-4 ring-rose-500/10" : isOpen ? "border-sky-500/50 ring-4 ring-sky-500/10 dark:ring-purple-500/5 shadow-[0_0_25px_rgba(14,165,233,0.15)]" : "border-sky-100 dark:border-purple-900/20 hover:border-sky-300 dark:hover:border-purple-800"} `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`p-2 rounded-2xl transition-colors duration-500 ${error ? "bg-rose-500/10 text-rose-500" : isOpen ? "bg-sky-500/10 text-sky-500 dark:bg-purple-500/10 dark:text-purple-500 scale-110" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-sky-400"}`}
          >
            {Icon && <Icon size={18} strokeWidth={3} />}
          </div>
          <span
            className={`text-[11px] font-black uppercase tracking-wider truncate transition-colors duration-500 ${error ? "text-rose-600" : isOpen ? "text-sky-600 dark:text-purple-400" : "text-slate-600 dark:text-slate-300"}
          `}
          >
            {selectedOption.label}
          </span>
        </div>
        <ChevronDown
          size={18}
          strokeWidth={3}
          className={`text-slate-400 transition-transform duration-500 ${error ? "text-rose-500" : isOpen ? "rotate-180 text-sky-500 scale-100" : "group-hover:text-sky-500 dark:group-hover:text-purple-400"}`}
        />
      </button>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] font-bold text-rose-500 ml-1 mt-1 flex items-center gap-1"
          >
            <span className="w-1 h-1 rounded-full bg-rose-500" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {/* Option Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="absolute z-[120] w-full mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-sky-100 dark:border-purple-900/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(139,92,246,0.2)] p-2"
          >
            <div className="max-h-[250px] overflow-y-auto no-scrollbar py-2 px-1">
              {options.map((option, index) => {
                const isSelected = value === option.value;
                const isHovered = index === activeIndex;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 mb-1 group/opt ${isSelected ? "text-sky-500 dark:text-purple-500" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                  >
                    {/* Animated Background Indicator */}
                    {isHovered && (
                      <motion.div
                        layoutId="selectHover"
                        className="absolute inset-0 bg-sky-500/10 dark:bg-purple-500/5 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 truncate ">
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-sky-500/20 p-1 rounded-md"
                      >
                        <Check
                          size={14}
                          strokeWidth={4}
                          className="text-sky-500 dark:text-purple-500"
                        />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
