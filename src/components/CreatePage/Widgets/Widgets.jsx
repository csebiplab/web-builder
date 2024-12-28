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

  const handleAddElement = (type, position) => {
    const newElement = {
      id: elements.length + 1,
      type,
      width: "100%",
      height: "auto",
      x: position?.x || 0,
      y: position?.y || 0,
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
    <div className="flex h-screen w-full">
      <>
        <WidgetsSidebar widgets={widgets} />
      </>
      <div className="flex-1 relative bg-gray-50 w-full">
        {/* Editor Area */}
        <div
          className="w-[90%] h-auto min-h-[50%] border border-red-500 mx-10 relative"
          // onDragOver={(e) => e.preventDefault()}
          // onDrop={(e) => {
          //   const widgetType = e.dataTransfer.getData("widgetType");
          //   handleAddElement(widgetType);
          // }}
        >
          {/* Flexbox Layout Style Container */}
          <LayoutStylePreview layoutStyle={layoutStyle} />

          {elements.map((el) => (
            <Rnd
              id={`element-${el.id}`}
              // style={{
              //   position: "absolute",
              //   top: el.y,
              //   left: el.x,
              // }}
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
              position={{
                x: el.x || 0,
                y: el.y || 0,
              }}
              onDragStop={(e, d) => {
                const newY = d.y;

                setElements((prev) =>
                  prev.map((element) =>
                    element.id === el.id
                      ? { ...element, x: d.x, y: newY }
                      : element
                  )
                );

                // setElements((prev) =>
                //   prev.map((element) => {
                //     if (
                //       element.id !== el.id &&
                //       Math.abs(element.y - newY) < 20
                //     ) {
                //       return { ...element, y: newY + 200 };
                //     }
                //     return element;
                //   })
                // );
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
        </div>
        <div className="ml-10">
          {elements?.length > 0 && (
            <button
              onClick={handleSave}
              className="w-32 h-full py-2 px-1 bg-blue-500 text-white font-bold rounded"
            >
              Save Layout
            </button>
          )}
        </div>

        <div className="p-8">
          {/* Layout Modal */}
          {isLayoutModalOpen && (
            <LayoutModal
              isOpen={isLayoutModalOpen}
              handleSelectLayout={handleSelectLayout}
              setIsLayoutModalOpen={setIsLayoutModalOpen}
            />
          )}
          {/* Primary Widgets */}
          <div className="flex justify-center items-center">
            {!selectedLayout && (
              <div
                onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
                onDrop={(e) => {
                  const widgetType = e.dataTransfer.getData("widgetType"); // Get dragged widget type
                  const position = {
                    x: 0, // Fixed to 0 for horizontal alignment
                    y: 0, // Initialize y to 0
                  };

                  if (elements?.length > 0) {
                    // Calculate the next available y position dynamically
                    const lastElement = elements[elements.length - 1]; // Get the last element
                    const lastElementRef = document.getElementById(
                      `element-${lastElement.id}`
                    ); // Get its DOM node
                    const lastElementHeight =
                      lastElementRef?.offsetHeight || 50; // Get its rendered height or default to 50px
                    position.y = (lastElement.y || 0) + lastElementHeight + 10; // Add spacing of 10px
                  }

                  handleAddElement(widgetType, position); // Pass widget type and calculated position
                }}
                className="w-full border border-dashed border-gray-500 h-32 flex justify-center items-center"
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
          {/* Layout Options For Flexbox */}
          {selectedLayout === "Flexbox" && (
            <LayoutOptions
              selectedLayout={selectedLayout}
              onSelectStyle={handleSelectLayoutStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
