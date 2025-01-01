"use client";

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import "react-quill/dist/quill.snow.css";
import { FaHeading } from "react-icons/fa";
import LayoutModal from "./../LayoutModal";
import LayoutOptions from "./../LayoutOptions";
import { useRef } from "react";
import Sidebar from "./Sidebar";
import { MdFormatAlignLeft } from "react-icons/md";
import SaveLayoutBtn from "./SaveLayoutBtn";

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
  const [currElmId, setCurrElmId] = useState("");

  const widgets = [
    {
      type: "heading",
      label: "Heading",
      icon: <FaHeading />,
    },
    {
      type: "text",
      label: "Text Editor",
      icon: <MdFormatAlignLeft />,
    },
  ];

  const handleAddElement = (type) => {
    setCurrElmId(elements.length + 1);
    let content = "";
    let htmlTag = "div";
    let classNameForCompnt = "";
    let customStyle = {};
    if (type === "heading") {
      content = "Add Your Heading Text Here";
      htmlTag = "h1";
      classNameForCompnt = "text-4xl font-bold text-center";
      customStyle["fontSize"] = "36px";
    }

    const newElement = {
      id: elements.length + 1,
      type,
      width: "100%",
      height: "auto",
      content: content,
      htmlTag: htmlTag,
      style: {
        classname: classNameForCompnt,
        custom: customStyle,
      },
    };
    setElements([...elements, newElement]);
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

  const removeElementHandler = (elmId) => {
    setElements((prev) => prev.filter((element) => element.id !== elmId));
  };

  const handleSetCurrentElmId = (elmId) => {
    setCurrElmId(elmId);
  };

  useEffect(() => {
    if (elements?.length < 1) {
      setCurrElmId("");
    }
    const handleClickOutside = (event) => {
      // Check if the click is outside all Rnd elements
      if (
        !event.target.closest(".contentCompClose") &&
        !event.target.closest(".sidebar")
      ) {
        setCurrElmId(""); // Reset currElmId when clicking outside
      }
    };

    // Attach event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elements?.length]);

  return (
    <>
      <div className="flex min-h-screen w-full">
        <div className="w-3/12 bg-gray-100 p-4 border-r overflow-y-auto sidebar">
          <Sidebar widgets={widgets} currElmId={currElmId} />
        </div>

        <div className="bg-gray-50 w-full">
          <div className="w-9/12 mx-auto mt-6 contentCompClose border border-red-500">
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
                onClick={() => handleSetCurrentElmId(el.id)}
                style={{ position: "relative", top: "auto", left: "auto" }}
                className="p-2 border border-transparent 
                hover:border hover:border-pink-300 w-full show__after_parent"
              >
                <div
                  onClick={() => removeElementHandler(el.id)}
                  className="hidden show__after_child cursor-pointer absolute -top-5 left-1/2 w-8
                 bg-yellow-500 text-center text-red-600"
                >
                  X
                </div>
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

            <div className="p-8 w-full flex justify-center items-center mt-10">
              <div className="w-full">
                <SaveLayoutBtn elements={elements} />

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
