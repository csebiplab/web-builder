"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { styleType } from "@/constants/styleType";

export default function LayoutStylePreview({ layoutStyle }) {
  if (!layoutStyle) return null;

  return (
    <div className="w-[90%] h-auto min-h-[50%] border border-red-500 mx-10 relative">
      {" "}
      {layoutStyle === styleType.COLS_1_v ? (
        <div className="my-16 mx-20 w-10/12 border border-dashed border-white hover__layoutStyle p-4">
          <div className="flex gap-x-6 w-full">
            <div
              className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex 
      justify-center items-center"
            >
              <button>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      ) : layoutStyle === styleType.row_1_h ? (
        <div className="my-16 mx-20 w-10/12 border border-dashed border-white hover__layoutStyle p-4">
          <div className="flex gap-x-6 w-full">
            <div
              className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex 
  justify-center items-center"
            >
              <button>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      ) : layoutStyle === styleType.EQUAL_2_COLS ? (
        <div className="my-16 mx-20 w-10/12 border border-dashed border-white hover__layoutStyle p-4">
          <div className="flex gap-x-6 w-full">
            <div
              className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex 
  justify-center items-center"
            >
              <button>
                <FaPlus />
              </button>
            </div>
            <div
              className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex 
  justify-center items-center"
            >
              <button>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
