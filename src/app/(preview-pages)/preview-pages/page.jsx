"use client";

import { useState, useEffect } from "react";

export default function LayoutPage() {
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/layout");
        const data = await response.json();
        setLayouts(data?.data);
      } catch (error) {
        console.error("Error fetching layouts:", error);
      }
    };

    fetchData();
  }, []);

  if (layouts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {layouts.map((layout) => (
        <div key={layout._id}>
          <div>
            {layout.elements.map((element) => {
              switch (element.type) {
                case "heading":
                  return (
                    <h2
                      key={element._id}
                      style={{
                        position: "absolute",
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                      }}
                    >
                      {element.content}
                    </h2>
                  );
                case "image":
                  // Extract image data
                  const imageData = element.content.split(",")[1];

                  return (
                    <img
                      key={element._id}
                      src={`data:image/jpeg;base64,${imageData}`}
                      alt="Layout Image"
                      style={{
                        position: "absolute",
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                      }}
                    />
                  );
                case "textEditor":
                  return (
                    <div
                      key={element._id}
                      dangerouslySetInnerHTML={{ __html: element.content }}
                      style={{
                        position: "absolute",
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                      }}
                    />
                  );
                // Add more cases for other element types
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
