import React from "react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 backdrop-blur-lg">
      <div className="flex flex-col items-center">
        {/* Loading spinner */}
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading</h2>
      </div>
    </div>
  );
}
