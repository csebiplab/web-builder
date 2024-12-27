"use client";

import { useState } from "react";
import Widgets from "./../../../../../components/CreatePage/Widgets/Widgets";
import "./CreatePage.css";

export default function page() {
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
    <div>
      <Widgets
        handleAddSection={handleAddSection}
        handleSelectLayout={handleSelectLayout}
        handleSelectLayoutStyle={handleSelectLayoutStyle}
        isLayoutModalOpen={isLayoutModalOpen}
        selectedLayout={selectedLayout}
        layoutStyle={layoutStyle}
        setIsLayoutModalOpen={setIsLayoutModalOpen}
      />
    </div>
  );
}
