// "use client";

// import { useState, useEffect } from "react";

// export default function LayoutPage() {
//   const [layouts, setLayouts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/layout");
//         const data = await response.json();
//         setLayouts(data?.data);
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (layouts.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {layouts.map((layout) => (
//         <div key={layout._id}>
//           <div>
//             {layout.elements.map((element) => {
//               switch (element.type) {
//                 case "heading":
//                   return (
//                     <h2
//                       key={element._id}
//                       style={{
//                         position: "absolute",
//                         left: `${element.x}px`,
//                         top: `${element.y}px`,
//                         width: `${element.width}px`,
//                         height: `${element.height}px`,
//                       }}
//                     >
//                       {element.content}
//                     </h2>
//                   );
//                 case "image":
//                   // Extract image data
//                   const imageData = element.content.split(",")[1];

//                   return (
//                     <img
//                       key={element._id}
//                       src={`data:image/jpeg;base64,${imageData}`}
//                       alt="Layout Image"
//                       style={{
//                         position: "absolute",
//                         left: `${element.x}px`,
//                         top: `${element.y}px`,
//                         width: `${element.width}px`,
//                         height: `${element.height}px`,
//                       }}
//                     />
//                   );
//                 case "textEditor":
//                   return (
//                     <div
//                       key={element._id}
//                       dangerouslySetInnerHTML={{ __html: element.content }}
//                       style={{
//                         position: "absolute",
//                         left: `${element.x}px`,
//                         top: `${element.y}px`,
//                         width: `${element.width}px`,
//                         height: `${element.height}px`,
//                       }}
//                     />
//                   );
//                 // Add more cases for other element types
//                 default:
//                   return null;
//               }
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

async function getData() {
  try {
    const response = await fetch("http://localhost:3000/api/pages", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.log(error, "err");
    return null;
  }
}

export default async function page() {
  const data = await getData();

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {data.map((page) => (
        <div key={page._id}>
          {page.designData.map((design) => (
            <div key={design.id} style={design.style}>
              {design.sections.map((section) => {
                const SectionTag = section.htmlTag || "div";
                return (
                  <SectionTag
                    key={section.id}
                    className={section.style.classname}
                    style={section.style.custom}
                  >
                    {section.content}
                  </SectionTag>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
