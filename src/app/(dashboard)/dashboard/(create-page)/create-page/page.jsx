"use client";
import { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltRight } from "react-icons/fa";
import { styleType } from "./../../../../../constants/styleType";
import { FaPlus } from "react-icons/fa6";
import Widgets from "../../../../../components/CreatePage/Widgets/Widgets";
import "./CreatePage.css";

export default function PageEditor() {
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [layoutStyle, setLayoutStyle] = useState(null);

  const handleAddSection = () => {
    setIsLayoutModalOpen(true);
  };

  const handleSelectLayout = (layout) => {
    setSelectedLayout(layout);
    setIsLayoutModalOpen(false);
  };

  const handleSelectLayoutStyle = (style) => {
    setLayoutStyle(style);
    setSelectedLayout(null);
  };

  return (
    <div className="grid grid-cols-12 gap-x-6">
      <div className="col-span-2">
        <Widgets />
      </div>
      <div className="p-8 col-span-10">
        {/* Layout Modal */}
        {isLayoutModalOpen && (
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
                    className="border border-dashed border-gray-300
                 cursor-pointer w-40 h-40 grid grid-cols-2 gap-[1px] hover__min_flexbox"
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
        )}
        {layoutStyle === styleType.COLS_1_v ? (
          <div className="my-16 mx-20 w-10/12 border border-dashed border-white hover__layoutStyle p-4">
            <div className="flex gap-x-6 w-full">
              {/* <div
                className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex 
            justify-center items-center"
              >
                <button>
                  <FaPlus />
                </button>
              </div> */}
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
              {/* <div
                className="w-full min-h-32 h-auto border border-dashed border-gray-600 flex 
        justify-center items-center"
              >
                <button>
                  <FaPlus />
                </button>
              </div> */}
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

        <div className="flex justify-center">
          {!selectedLayout && (
            <div className="w-1/2 border border-dashed border-gray-500 h-32 flex justify-center items-center">
              <button
                onClick={handleAddSection}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-full"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Layout Options */}
        {selectedLayout === "Flexbox" && (
          <div className="border mt-4 p-4">
            <h2 className="text-lg font-bold mb-4">Select Your Structure</h2>
            <div className="grid grid-cols-5 gap-4">
              <button
                onClick={() => handleSelectLayoutStyle(styleType.COLS_1_v)}
                className="w-32 h-16 bg-gray-300 hover:bg-gray-500 
               cursor-pointer flex justify-center items-center"
              >
                <FaLongArrowAltDown className="fill-white" />
              </button>
              <button
                onClick={() => handleSelectLayoutStyle(styleType.row_1_h)}
                className="w-32 h-16 bg-gray-300 hover:bg-gray-500 
               cursor-pointer flex justify-center items-center"
              >
                <FaLongArrowAltRight className="fill-white" />
              </button>
              <button
                onClick={() => handleSelectLayoutStyle(styleType.EQUAL_2_COLS)}
                className="w-32 h-16 hover__min_flexbox
               cursor-pointer flex justify-center items-center gap-x-[1px] border border-dashed"
              >
                <span className="w-full h-full bg-gray-300 childs"></span>
                <span className="w-full h-full bg-gray-300 childs"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
