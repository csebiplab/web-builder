"use client";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import Text from "./elements/Text";
import Image from "./elements/Image";
import Button from "./elements/Button";

const initialElements = [
  {
    id: "1",
    type: "text",
    content: "Edit this text",
    styles: { fontSize: "16px", color: "#000" },
  },
  {
    id: "2",
    type: "button",
    content: "Click me",
    styles: { backgroundColor: "#007bff", color: "#fff" },
  },
];

export default function Editor() {
  const [elements, setElements] = useState(initialElements);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(elements);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setElements(reordered);
  };

  // const handleSave = () => {
  //   onSave(elements);
  // };

  const handleSave = async () => {
    await fetch("/api/layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Homepage", elements }),
    });
    alert("Layout saved!");
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="editor">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: "300px", border: "1px dashed #ccc" }}
            >
              {elements.map((el, index) => (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: "10px",
                      }}
                    >
                      {el.type === "text" && <Text element={el} />}
                      {el.type === "button" && <Button element={el} />}
                      {el.type === "image" && <Image element={el} />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Save Layout
      </button>
    </div>
  );
}
