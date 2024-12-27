// "use client";

// import { useState } from "react";
// import LayoutModal from "./LayoutModal";
// import LayoutStylePreview from "./LayoutStylePreview";
// import LayoutOptions from "./LayoutOptions";
// import Widgets from "./Widgets/Widgets";

// export default function PageEditor() {
//   const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   const [layoutStyle, setLayoutStyle] = useState(null);

//   const handleAddSection = () => setIsLayoutModalOpen(true);

//   const handleSelectLayout = (layout) => {
//     setSelectedLayout(layout);
//     setIsLayoutModalOpen(false);
//   };

//   const handleSelectLayoutStyle = (style) => {
//     setLayoutStyle(style);
//     setSelectedLayout(null);
//   };

//   return (
//     <div className="grid grid-cols-12 gap-x-6">
//       <div className="col-span-2">
//         <Widgets />
//       </div>
//       <div className="p-8 col-span-10">
//         <LayoutModal
//           isOpen={isLayoutModalOpen}
//           onClose={() => setIsLayoutModalOpen(false)}
//           onSelectLayout={handleSelectLayout}
//         />
//         <LayoutStylePreview style={layoutStyle} />
//         <div className="flex justify-center">
//           {!selectedLayout && (
//             <div className="w-1/2 border border-dashed border-gray-500 h-32 flex justify-center items-center">
//               <button
//                 onClick={handleAddSection}
//                 className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-full"
//               >
//                 +
//               </button>
//             </div>
//           )}
//         </div>
//         <LayoutOptions
//           selectedLayout={selectedLayout}
//           onSelectStyle={handleSelectLayoutStyle}
//         />
//       </div>
//     </div>
//   );
// }
