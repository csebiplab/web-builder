"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";

export default function LayoutStylePreview({ style }) {
  if (!style) return null;

  return (
    <div className="my-16 mx-20 w-10/12 border border-dashed border-white hover__layoutStyle p-4">
      <div className="flex gap-x-6 w-full">
        <div className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex justify-center items-center">
          <button>
            <FaPlus />
          </button>
        </div>
        <div className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex justify-center items-center">
          <button>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
