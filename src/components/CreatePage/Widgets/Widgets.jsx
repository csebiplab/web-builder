"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import "react-quill/dist/quill.snow.css";
import { FaHeading } from "react-icons/fa";
import LayoutModal from "./../LayoutModal";
import LayoutStylePreview from "./../LayoutStylePreview";
import LayoutOptions from "./../LayoutOptions";
import { useRef } from "react";
import { toast } from "react-toastify";
import WidgetsSidebar from "./Sidebar";

export default function Widgets({
  handleAddSection,
  handleSelectLayout,
  handleSelectLayoutStyle,
  isLayoutModalOpen,
  selectedLayout,
  layoutStyle,
  setIsLayoutModalOpen,
}) {
  const textareaRef = useRef(null);
  const [elements, setElements] = useState([]);

  const widgets = [
    {
      type: "heading",
      label: "Heading",
      icon: <FaHeading />,
    },
  ];

  const handleAddElement = (type) => {
    const newElement = {
      id: elements.length + 1,
      type,
      width: "100%",
      height: "auto",
      content: type === "heading" ? "Add Your Heading Text Here" : "",
      htmlTag: type === "heading" ? "h1" : "div",
      style: {
        classname: "text-4xl font-bold text-center",
        custom: { fontSize: "36px" },
      },
    };
    setElements([...elements, newElement]);
  };

  const preparePayload = (elm) => ({
    title: "My Awesome Page",
    slug: "my-awesome-page",
    designData: elm.map((el, i) => ({
      id: el.id.toString(),
      style: { width: el.width, height: el.height },
      sections: [
        {
          id: i + 1,
          type: el.type,
          content: el.content,
          htmlTag: el.htmlTag,
          style: el.style,
        },
      ],
    })),
  });

  const handleSave = async () => {
    const payload = preparePayload(elements);
    // console.log(payload, "payload");
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        toast.success("Layout saved successfully!");
      } else {
        toast.error("Failed to save layout.");
      }
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  const handleInputChange = (e, el) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === el.id ? { ...element, content: e.target.value } : element
      )
    );
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // console.log(elements, "elm");

  return (
    <>
      <div className="flex min-h-screen w-full">
        <>
          <WidgetsSidebar widgets={widgets} />
        </>
        <div className="bg-gray-50 w-full border border-green-700">
          <div className="w-10/12 border border-yellow-700 mx-auto relative">
            {/* Render DnD Elements */}
            {elements.map((el) => (
              <Rnd
                id={`element-${el.id}`}
                key={el.id}
                bounds="parent"
                enableResizing={{
                  top: false,
                  right: true,
                  bottom: false,
                  left: true,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
                size={{ width: el.width, height: el.height }}
                onDragStop={(e, d) => {
                  setElements((prev) =>
                    prev.map((element) =>
                      element.id === el.id ? { ...element } : element
                    )
                  );
                }}
                onResizeStop={(e, direction, ref, delta) => {
                  setElements((prev) =>
                    prev.map((element) =>
                      element.id === el.id
                        ? {
                            ...element,
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height),
                          }
                        : element
                    )
                  );
                }}
                style={{ position: "static", top: "auto", left: "auto" }}
                className="p-2 border border-transparent hover:border hover:border-pink-300 w-full"
              >
                {el.type === "heading" && (
                  <div className="text-center border-2 border-pink-400">
                    <textarea
                      ref={textareaRef}
                      value={el.content}
                      onChange={(e) => handleInputChange(e, el)}
                      className="bg-transparent border-none text-center outline-none w-full h-auto
             text-4xl font-bold resize-none break-words overflow-hidden"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                      rows={1}
                    />
                  </div>
                )}
              </Rnd>
            ))}

            <div className="p-8 border border-blue-500 w-full flex justify-center items-center mt-10">
              <div className="w-full">
                <div className="ml-10 mb-5">
                  {elements?.length > 0 && (
                    <button
                      onClick={handleSave}
                      className="w-32 h-full py-2 px-1 bg-blue-500 text-white font-bold rounded"
                    >
                      Save Layout
                    </button>
                  )}
                </div>

                {isLayoutModalOpen && (
                  <LayoutModal
                    isOpen={isLayoutModalOpen}
                    handleSelectLayout={handleSelectLayout}
                    setIsLayoutModalOpen={setIsLayoutModalOpen}
                  />
                )}

                <div className="flex justify-center items-center">
                  {!selectedLayout && (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const widgetType = e.dataTransfer.getData("widgetType");
                        handleAddElement(widgetType);
                      }}
                      className="w-8/12 border border-dashed border-gray-500 h-32 flex justify-center items-center"
                    >
                      <button
                        onClick={handleAddSection}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-full"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {selectedLayout === "Flexbox" && (
                  <LayoutOptions
                    selectedLayout={selectedLayout}
                    onSelectStyle={handleSelectLayoutStyle}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
