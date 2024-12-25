"use client";

import { styleType } from "@/constants/styleType";
import React from "react";
import { FaLongArrowAltDown, FaLongArrowAltRight } from "react-icons/fa";

export default function LayoutOptions({ selectedLayout, onSelectStyle }) {
  if (!selectedLayout) return null;

  return (
    <div className="border mt-4 p-4">
      <h2 className="text-lg font-bold mb-4">Select Your Structure</h2>
      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => onSelectStyle(styleType.COLS_1_v)}
          className="w-32 h-16 bg-gray-300 hover:bg-gray-500 cursor-pointer flex justify-center items-center"
        >
          <FaLongArrowAltDown className="fill-white" />
        </button>
        <button
          onClick={() => onSelectStyle(styleType.row_1_h)}
          className="w-32 h-16 bg-gray-300 hover:bg-gray-500 cursor-pointer flex justify-center items-center"
        >
          <FaLongArrowAltRight className="fill-white" />
        </button>
        <button
          onClick={() => onSelectStyle(styleType.EQUAL_2_COLS)}
          className="w-32 h-16 hover__min_flexbox cursor-pointer flex justify-center items-center gap-x-[1px] border border-dashed"
        >
          <span className="w-full h-full bg-gray-300 childs"></span>
          <span className="w-full h-full bg-gray-300 childs"></span>
        </button>
      </div>
    </div>
  );
}
