import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Camera, RefreshCcw, User } from "lucide-react";

const AvatarUpload = ({ onFileSelect, initialAvatar }) => {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (initialAvatar && initialAvatar !== "null") {
      const isExternal = /^https?:\/\//.test(initialAvatar);
      setPreview(
        isExternal
          ? initialAvatar
          : `${import.meta.env.VITE_API_BASE_URL}/upload/${initialAvatar}`,
      );
    } else {
      setPreview("");
    }

    setSelectedFile(null);

    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [initialAvatar]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLocalError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLocalError("Invalid file type. Please use PNG/JPG.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setLocalError("Image is too heavy (Max 2MB)");
      return;
    }

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);
    onFileSelect(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    e.target.value = null;
  };

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      {/* Glassmorphism Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex-1 h-full w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-sky-100 dark:border-purple-900/20 shadow-sm flex flex-col items-center justify-center gap-6 overflow-hidden"
      >
        {/* Background Decorative Blur */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 blur-[40px] pointer-events-none" />

        <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Profile Picture
        </h4>

        {/* Avatar Are with Hover Effects */}
        <div className="relative">
          {/* External Animated Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-sky-400/30 dark:border-purple-500/30 rounded-full opacity-50"
          />
          <motion.div
            onClick={handleContainerClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-28 h-28 group cursor-pointer z-10"
          >
            {/* Main Avatar Container */}
            <div
              className={`w-full h-full rounded-full p-[2px] transition-all duration-700 ${localError ? "bg-rose-500" : "bg-gradient-to-tr from-sky-400/20 to-purple-500/20 group-hover:from-sky-400 group-hover:to-purple-500"}`}
            >
              <div className="w-full h-full rounded-full border-2 border-white dark:border-slate-900 overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                ) : (
                  <User
                    size={40}
                    strokeWidth={1.5}
                    className="text-slate-400 opacity-40 dark:text-slate-500"
                  />
                )}

                {/* Hover Overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 rounded-full"
                    >
                      <Camera
                        size={20}
                        className="text-sky-400 animate-bounce"
                      />
                      <span className="text-[7px] font-black uppercase tracking-widest text-white">
                        {preview ? "Change Photo" : "Upload"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Status Icon */}
            {selectedFile && !localError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-1 right-1 w-7 h-7 bg-white dark:bg-slate-800 rounded-full border-2 border-sky-500  flex items-center justify-center shadow-lg z-20"
              >
                <RefreshCcw
                  size={12}
                  className="text-sky-500 dark:text-purple-500"
                />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Helper Text */}
        <div className="text-center min-h-[30px] flex items-center justify-center ">
          {localError ? (
            <div className="flex items-center gap-1 text-rose-500 animate-bounce">
              <AlertCircle size={12} />
              <p className="text-[10px] font-black uppercase">{localError}</p>
            </div>
          ) : (
            <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed text-center px-4">
              Allowed formats: PNG, JPG, or JPEG. <br />
              Max size:{" "}
              <span className="font-bold text-sky-500 underline underline-offset-4 decoration-sky-500/30">
                2MB
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AvatarUpload;
