"use client";

import { useState } from "react";
import Widgets from "../../../../../components/CreatePage/Widgets/Widgets";
import LayoutModal from "./../../../../../components/CreatePage/LayoutModal";
import LayoutOptions from "./../../../../../components/CreatePage/LayoutOptions";
import LayoutStylePreview from "./../../../../../components/CreatePage/LayoutStylePreview";
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
          <LayoutModal
            isOpen={isLayoutModalOpen}
            handleSelectLayout={handleSelectLayout}
          />
        )}

        {/* Flexbox Layout Style Preview */}
        <LayoutStylePreview layoutStyle={layoutStyle} />

        {/* Primary Widgets */}
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

        {/* Layout Options For Flexbox */}
        {selectedLayout === "Flexbox" && (
          <LayoutOptions
            selectedLayout={selectedLayout}
            onSelectStyle={handleSelectLayoutStyle}
          />
        )}
      </div>
    </div>
  );
}
