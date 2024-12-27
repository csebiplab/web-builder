"use client";

import React from "react";

export default function LayoutModal({
  isOpen,
  handleSelectLayout,
  setIsLayoutModalOpen,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-auto">
        <h2 className="text-lg font-bold mb-4 text-center">
          Which layout would you like to use?
        </h2>
        <div className="flex justify-around gap-x-8 mb-4">
          <div>
            <div
              onClick={() => handleSelectLayout("Flexbox")}
              className="cursor-pointer w-40 h-40 flex gap-x-1 hover__min_flexbox"
            >
              <div className="bg-gray-200 childs w-1/2 h-full"></div>
              <div className="w-1/2 h-full flex flex-col gap-y-1">
                <div className="h-full w-full bg-gray-200 childs"></div>
                <div className="h-full w-full bg-gray-200 childs"></div>
              </div>
            </div>
            <p className="text-center">Flexbox</p>
          </div>
          <div>
            <div
              onClick={() => handleSelectLayout("Grid")}
              className="border border-dashed border-gray-300 cursor-pointer w-40 h-40 grid grid-cols-2 gap-[1px] hover__min_flexbox"
            >
              <div className="border border-dashed border-gray-300 h-full w-full childs"></div>
              <div className="border border-dashed border-gray-300 h-full w-full childs"></div>
              <div className="border border-dashed border-gray-300 h-full w-full childs"></div>
              <div className="border border-dashed border-gray-300 h-full w-full childs"></div>
            </div>
            <p className="text-center">Grid</p>
          </div>
        </div>
        <button
          onClick={() => setIsLayoutModalOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
