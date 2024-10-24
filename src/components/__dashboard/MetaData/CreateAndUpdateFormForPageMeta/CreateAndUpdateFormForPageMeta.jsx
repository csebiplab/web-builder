"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateAndUpdateFormForPageMeta = ({ metaData, user }) => {
  const router = useRouter();
  const [isUpdateCreateLoading, setIsUpdateCreateLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    pageLink: "",
    pageName: "",
    title: "",
    description: "",
    keywords: "",
  });

  const {
    _id: id,
    pageLink,
    pageName,
    title: titleValue,
    description: descriptionValue,
    keywords: keywordsValue,
  } = metaData ?? {};
  const endPoints = "/api/metadata";
  const redirectPath = "/dashboard/allpages/see-all-page-metadata"

  useEffect(() => {
    if (id) {
      setInputValue({
        pageLink,
        pageName,
        title: titleValue,
        description: descriptionValue,
        keywords: keywordsValue,
      });
    }
  }, [id, pageLink, pageName, titleValue, descriptionValue, keywordsValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({ ...prevInputValue, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsUpdateCreateLoading(true);
    const payload = id ? { ...inputValue } : { ...inputValue, projectFor: user?.role };
    const method = id ? "PATCH" : "POST";
    const url = id ? `${endPoints}/${id}` : endPoints;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        return toast.error(`Failed to ${id ? "update" : "create"} meta data`);

      toast.success(`Successfully ${id ? "updated" : "created"} meta data`);
      router.push(redirectPath);
      if (!id) {
        setInputValue({
          pageLink: "",
          pageName: "",
          title: "",
          description: "",
          keywords: "",
        });
      }
    } catch (error) {
      toast.error(`Failed to ${id ? "update" : "create"} meta data`);
    } finally {
      setIsUpdateCreateLoading(false);
    }
  };

  return (
    <div className="px-5">
      <h3 className="text-2xl uppercase">
        {id ? `Update ${pageName} Page Meta Data` : "Create Page Meta Data"}
      </h3>
      {id && (
        <h3 className="text-xl mt-1">
          Update{" "}
          <span className="text-primary">
            {pageLink || "Please Add Page Link"}
          </span>{" "}
          Page Meta Data
        </h3>
      )}

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {[
          { label: "Page Link", name: "pageLink", required: true },
          { label: "Page Name", name: "pageName", required: true },
        ].map(({ label, name, required }) => (
          <div key={name} className="sm:col-span-3">
            <label
              htmlFor={name}
              className="block text-sm font-extrabold leading-6 text-gray-900"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-2">
              <input
                required={required}
                type="text"
                name={name}
                id={name}
                value={inputValue[name]}
                onChange={handleChange}
                className="block lg:w-4/6 w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        ))}

        {[
          { label: "Meta Title", name: "title" },
          { label: "Meta Description", name: "description" },
          {
            label: "Keywords",
            name: "keywords",
            helper: "Write a few keywords about this page.",
          },
        ].map(({ label, name, helper }) => (
          <div key={name} className="col-span-full">
            <label
              htmlFor={name}
              className="block text-sm font-extrabold leading-6 text-gray-900"
            >
              {label}
            </label>
            <div className="mt-2">
              <textarea
                id={name}
                name={name}
                rows={3}
                value={inputValue[name]}
                onChange={handleChange}
                className="block w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {helper && (
              <p className="mt-3 text-sm leading-6 text-gray-600">{helper}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        aria-label="Submit"
        onClick={handleSubmit}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 my-5 px-5 border border-blue-500 hover:border-transparent rounded"
        disabled={isUpdateCreateLoading}
      >
        {isUpdateCreateLoading ? "Submitting..." : id ? "Update" : "Save"}
      </button>
    </div>
  );
};

export default CreateAndUpdateFormForPageMeta;