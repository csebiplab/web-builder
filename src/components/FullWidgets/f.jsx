"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaHeading, FaImage, FaTextHeight, FaVideo } from "react-icons/fa";
import { MdSmartButton } from "react-icons/md";
import LayoutModal from "./../LayoutModal";
import LayoutStylePreview from "./../LayoutStylePreview";
import LayoutOptions from "./../LayoutOptions";
import Link from "next/link";

export default function Widgets({
  handleAddSection,
  handleSelectLayout,
  handleSelectLayoutStyle,
  isLayoutModalOpen,
  selectedLayout,
  layoutStyle,
  setIsLayoutModalOpen,
}) {
  const [elements, setElements] = useState([]);

  const widgets = [
    { type: "heading", label: "Heading", icon: <FaHeading /> },
    { type: "textEditor", label: "Text Editor", icon: <FaTextHeight /> },
    { type: "image", label: "Image", icon: <FaImage /> },
    { type: "button", label: "Button", icon: <MdSmartButton /> },
    { type: "video", label: "Video", icon: <FaVideo /> },
    { type: "container", label: "Container", icon: "" },
  ];

  const handleAddElement = (type, position) => {
    const newElement = {
      id: elements.length + 1,
      type,
      x: position?.x || 100,
      y: position?.y || 100,
      width: 200,
      height: type === "textEditor" ? 150 : 100,
      content: type === "textEditor" ? "" : type === "heading" ? "Heading" : "",
    };
    setElements([...elements, newElement]);
  };

  // console.log(elements, "elm");

  const handleSave = async () => {
    await fetch("/api/layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Homepage", elements }),
    });
    alert("Layout saved!");
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-2/12 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Widgets</h2>
        <div className="flex flex-col gap-4">
          {widgets.map((widget) => (
            <div
              key={widget.type}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("widgetType", widget.type)
              }
              className="flex items-center gap-2 p-2 bg-white shadow hover:shadow-lg cursor-pointer border rounded"
            >
              {widget.icon}
              <span>{widget.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative bg-gray-50 w-full">
        {/* Editor Area */}
        <div
          className="w-full"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const widgetType = e.dataTransfer.getData("widgetType");
            const rect = e.currentTarget.getBoundingClientRect();
            const position = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            };
            handleAddElement(widgetType, position);
          }}
        >
          <div className="my-16">
            <Link href="/preview-pages">See Page Preview</Link>
          </div>
          {/* Flexbox Layout Style Container */}
          <LayoutStylePreview layoutStyle={layoutStyle} />

          {elements.map((el) => (
            <Rnd
              key={el.id}
              bounds="parent"
              size={{ width: el.width, height: el.height }}
              position={{ x: el.x, y: el.y }}
              onDragStop={(e, d) =>
                setElements((prev) =>
                  prev.map((element) =>
                    element.id === el.id
                      ? { ...element, x: d.x, y: d.y }
                      : element
                  )
                )
              }
              onResizeStop={(e, direction, ref, delta, position) => {
                setElements((prev) =>
                  prev.map((element) =>
                    element.id === el.id
                      ? {
                          ...element,
                          width: parseInt(ref.style.width),
                          height: parseInt(ref.style.height),
                          ...position,
                        }
                      : element
                  )
                );
              }}
              className="border border-dashed"
            >
              {el.type === "heading" && (
                <div className="p-2 bg-gray-100 text-center font-bold">
                  <input
                    type="text"
                    value={el.content}
                    onChange={(e) =>
                      setElements((prev) =>
                        prev.map((element) =>
                          element.id === el.id
                            ? { ...element, content: e.target.value }
                            : element
                        )
                      )
                    }
                    className="bg-transparent border-none text-center outline-none w-full"
                  />
                </div>
              )}
              {el.type === "container" && (
                <div className="p-2 bg-gray-100 text-center font-bold">
                  <input
                    type="text"
                    value={el.content}
                    onChange={(e) =>
                      setElements((prev) =>
                        prev.map((element) =>
                          element.id === el.id
                            ? { ...element, content: e.target.value }
                            : element
                        )
                      )
                    }
                    className="bg-transparent border-none text-center outline-none w-full"
                  />
                </div>
              )}
              {el.type === "textEditor" && (
                <ReactQuill
                  value={el.content}
                  onChange={(value) =>
                    setElements((prev) =>
                      prev.map((element) =>
                        element.id === el.id
                          ? { ...element, content: value }
                          : element
                      )
                    )
                  }
                  style={{ height: "100%", width: "100%" }}
                />
              )}
              {el.type === "image" && (
                <div className="w-full h-full flex justify-center items-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setElements((prev) =>
                              prev.map((element) =>
                                element.id === el.id
                                  ? { ...element, content: event.target.result }
                                  : element
                              )
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {el.content ? (
                      <img
                        src={el.content}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500">Upload Image</div>
                    )}
                  </label>
                </div>
              )}
              {el.type === "button" && (
                <button className="w-full h-full bg-blue-500 text-white font-bold rounded">
                  Button
                </button>
              )}
            </Rnd>
          ))}
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

          {elements?.length > 0 && (
            <button
              onClick={handleSave}
              className="w-32 h-full bg-blue-500 text-white font-bold rounded"
            >
              Save Layout
            </button>
          )}

          {/* Primary Widgets */}
          <div className="flex justify-center items-center mt-32">
            {!selectedLayout && (
              <div className="w-full border border-dashed border-gray-500 h-32 flex justify-center items-center">
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
