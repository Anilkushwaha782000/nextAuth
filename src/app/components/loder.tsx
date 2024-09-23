"use client"
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white bg-opacity-80 fixed inset-0 z-50">
      <div className="flex flex-col justify-center items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
        
        {/* Optional Message */}
        <p className="text-blue-600 text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
