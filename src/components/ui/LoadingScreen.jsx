import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm fixed inset-0 z-50">
      <div className="flex flex-col items-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-gray-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-black text-slate-600 dark:text-slate-400 tracking-[0.2em] animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
