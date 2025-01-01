"use client";
import { toast } from "react-toastify";

export default function SaveLayoutBtn({ elements }) {
  if (elements?.length < 1) return null;

  const preparePayload = (elm) => ({
    title: "My Awesome Page",
    slug: "my-awesome-page",
    designData: elm.map((el, i) => ({
      id: el.id.toString(),
      style: {
        classname: "container",
        custom: { width: el.width, height: el.height },
      },
      components: [
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

  return (
    <div className="ml-10 mb-5">
      <button
        onClick={handleSave}
        className="w-32 h-full py-2 px-1 bg-blue-500 text-white font-bold rounded"
      >
        Save Layout
      </button>
    </div>
  );
}
