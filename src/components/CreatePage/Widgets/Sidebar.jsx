"use client";

import { useState } from "react";
import WidgetComponents from "./WidgetComponents";
import ContentComponent from "./ContentComponent";
import { FaPen } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ widgets, currElmId }) => {
  const [title, setTitle] = useState("");
  const [htmlTag, setHtmlTag] = useState("h2");
  const [currStyling, setCurrStyling] = useState("Content");

  const handleCurrentStylingState = (crntState) => {
    setCurrStyling(crntState);
  };

  return (
    <div>
      <>{!currElmId && <WidgetComponents widgets={widgets} />}</>
      {currElmId && (
        <div>
          <div className="flex justify-between gap-x-2 border-b border-gray-600">
            <button
              onClick={() => handleCurrentStylingState("Content")}
              className={`border-b-2 ${
                currStyling === "Content"
                  ? "border-gray-900"
                  : "border-transparent"
              } flex flex-col justify-center items-center w-full`}
            >
              <FaPen />
              <span className="text-sm">Content</span>
            </button>
            <button
              onClick={() => handleCurrentStylingState("Style")}
              className={`border-b-2 ${
                currStyling === "Style"
                  ? "border-gray-900"
                  : "border-transparent"
              } flex flex-col justify-center items-center w-full`}
            >
              <SiTailwindcss />
              <span className="text-sm">Style</span>
            </button>
            <button
              onClick={() => handleCurrentStylingState("Advance")}
              className={`border-b-2 ${
                currStyling === "Advance"
                  ? "border-gray-900"
                  : "border-transparent"
              } flex flex-col justify-center items-center w-full`}
            >
              <IoSettings />
              <span className="text-sm">Advance</span>
            </button>
          </div>
          <div className="mt-6">
            <ContentComponent
              title={title}
              setTitle={setTitle}
              setHtmlTag={setHtmlTag}
              htmlTag={htmlTag}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
