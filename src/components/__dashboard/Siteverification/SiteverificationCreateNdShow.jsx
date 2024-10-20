// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import DeleteDocumentBtn from "../Actions/DeleteDocumentBtn";
// import CreateNdUpdateBtn from "../Actions/CreateNdUpdateBtn";

// function SiteverificationCreateNdShow({ data, user }) {
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const [inputValue, setInputValue] = useState({
//     title: "",
//     url: "",
//   });

//   const id = data?.[0]?._id;
//   const queryURLPathForDelete = `/api/site-verification?id=${id}`;
//   const paramsURLPath = `/api/site-verification/${id}`;
//   const redirectPath = `/dashboard/site-verification`;

//   useEffect(() => {
//     setInputValue({
//       title: data?.[0]?.title,
//       url: data?.[0]?.url,
//     });
//   }, [id]);
//   const handleTitleChange = (e) => {
//     setInputValue((prevInputValue) => ({
//       ...prevInputValue,
//       title: e.target.value,
//     }));
//   };
//   const handleUrlChange = (e) => {
//     setInputValue((prevInputValue) => ({
//       ...prevInputValue,
//       url: e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     let { title, url } = inputValue;
//     if (!title || !url) {
//       toast.warning("Both message and content are required");
//       return;
//     }

//     if (id) {
//       setIsLoading(true);
//       try {
//         const res = await fetch(paramsURLPath, {
//           method: "PATCH",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({ title, url }),
//         });

//         if (res.ok) {
//           toast.success(`Successfully updated verification url & meta data`);
//           setIsLoading(false);
//           router.refresh();
//           // router.push(`/dashboard/site-verification`);
//         } else {
//           setIsLoading(false);
//           toast.error(`Failed to update verification url & meta data`);
//         }
//       } catch (error) {
//         setIsLoading(false);
//         console.log(error);
//       }
//     } else {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/site-verification`, {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({ title, url, projectFor: user?.role }),
//         });

//         if (res.ok) {
//           setIsLoading(false);
//           toast.success(`Successfully submitted verification url & meta data`);
//           router.refresh();
//           // router.push(`/dashboard/site-verification`);
//         } else {
//           setIsLoading(false);
//           toast.error(`Failed to create verificationUrl url`);
//         }
//       } catch (error) {
//         setIsLoading(false);
//         console.log(error);
//       }
//     }
//   };
//   return (
//     <div>
//       <div className="px-5">
//         <div>
//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-3">
//               <label
//                 htmlFor="first-name"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Message
//               </label>
//               <div className="mt-2">
//                 <input
//                   required
//                   type="text"
//                   name="title"
//                   id="title"
//                   autoComplete="given-name"
//                   className="block lg:w-4/6 w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={inputValue.title}
//                   onChange={handleTitleChange}
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label
//                 htmlFor="last-name"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Paste Content{" "}
//                 <span className="text-red-500">
//                   * Paste only content from meta
//                 </span>
//               </label>
//               <div className="mt-2">
//                 <input
//                   required
//                   type="text"
//                   name="description"
//                   id="description"
//                   autoComplete="family-name"
//                   className="block lg:w-4/6 w-full px-5  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={inputValue.url}
//                   onChange={handleUrlChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <>
//             <CreateNdUpdateBtn
//               id={id}
//               handleSubmit={handleSubmit}
//               isLoading={isLoading}
//             />
//           </>
//         </div>

//         <>
//           {data?.length > 0 && (
//             <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
//               <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" className="px-6 py-3">
//                       Message
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Verification Content
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data?.map((item) => (
//                     <tr
//                       key={item._id}
//                       className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
//                     >
//                       <th
//                         scope="row"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         {item?.title}
//                       </th>
//                       <td className="px-6 py-4">{item?.url}</td>
//                       <td className="px-6 py-4">
//                         <div className="flex gap-2">
//                           <DeleteDocumentBtn
//                             url={queryURLPathForDelete}
//                             redirectPath={redirectPath}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       </div>
//     </div>
//   );
// }

// export default SiteverificationCreateNdShow;

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DeleteDocumentBtn from "../Actions/DeleteDocumentBtn";
import CreateNdUpdateBtn from "../Actions/CreateNdUpdateBtn";

function SiteverificationCreateNdShow({ data = [], user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({ title: "", url: "" });

  const router = useRouter();
  const id = data?.[0]?._id;
  const queryURLPathForDelete = `/api/site-verification?id=${id}`;
  const paramsURLPath = `/api/site-verification/${id}`;
  const redirectPath = `/dashboard/site-verification`;

  // Handle input changes using a single function
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    if (id) {
      setInputValue({
        title: data?.[0]?.title || "",
        url: data?.[0]?.url || "",
      });
    }
  }, [id, data]);

  const handleSubmit = useCallback(async () => {
    const { title, url } = inputValue;
    if (!title || !url) {
      toast.warning("Both message and content are required");
      return;
    }

    const fetchData = async (url, method, body) => {
      setIsLoading(true);
      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          toast.success(
            `Successfully ${id ? "updated" : "submitted"} verification data`
          );
          router.refresh();
        } else {
          toast.error(
            `Failed to ${id ? "update" : "create"} verification data`
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData(paramsURLPath, "PATCH", { title, url });
    } else {
      fetchData(`/api/site-verification`, "POST", {
        title,
        url,
        projectFor: user?.role,
      });
    }
  }, [inputValue, id, paramsURLPath, router, user?.role]);

  return (
    <div className="px-5">
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <InputField
            label="Message"
            name="title"
            value={inputValue.title}
            handleChange={handleInputChange}
          />
          <InputField
            label="Paste Content"
            name="url"
            value={inputValue.url}
            handleChange={handleInputChange}
            description="* Paste only content from meta"
          />
        </div>

        <CreateNdUpdateBtn
          id={id}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {data?.length > 0 && (
          <DataTable
            data={data}
            queryURLPathForDelete={queryURLPathForDelete}
            redirectPath={redirectPath}
          />
        )}
      </div>
    </div>
  );
}

// Reusable InputField component
function InputField({ label, name, value, handleChange, description }) {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}{" "}
        {description && <span className="text-red-500">{description}</span>}
      </label>
      <div className="mt-2">
        <input
          required
          type="text"
          name={name}
          id={name}
          className="block lg:w-4/6 w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

// Reusable DataTable component
function DataTable({ data, queryURLPathForDelete, redirectPath }) {
  return (
    <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Message</th>
            <th className="px-6 py-3">Verification Content</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="odd:bg-white even:bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {item?.title}
              </th>
              <td className="px-6 py-4">{item?.url}</td>
              <td className="px-6 py-4">
                <DeleteDocumentBtn
                  url={queryURLPathForDelete}
                  redirectPath={redirectPath}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SiteverificationCreateNdShow;
