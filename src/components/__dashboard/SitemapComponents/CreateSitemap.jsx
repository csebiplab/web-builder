"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import CreateNdUpdateBtn from "../Actions/CreateNdUpdateBtn";

function CreateSitemap({ data, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    changefreq: "weekly", // Default value
    loc: "",
    priority: 0.5,
  });

  const id = data?._id;
  const apiUrl = id ? `/api/sitemap/${id}` : `/api/sitemap`;

  useEffect(() => {
    if (data) {
      const { changefreq, loc, priority } = data;
      setInputValue({
        changefreq: changefreq || "weekly",
        loc: loc || "",
        priority: priority || 0.5,
      });
    }
  }, [data]);

  const handleInputChange = ({ target: { name, value } }) => {
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { changefreq, loc, priority } = inputValue;
    const payload = id ? {
        changefreq,
        loc,
        priority,
      } : {
        changefreq,
        loc,
        priority,
        projectFor: user?.role,
      }
    const requestOptions = {
      method: id ? "PATCH" : "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsLoading(true);
      const res = await fetch(apiUrl, requestOptions);
      if (res.ok) {
        toast.success(`Successfully ${id ? "updated" : "submitted"} sitemap`);
        return router.push("/dashboard/sitemap/show-all-sitemaps");
      } else {
        toast.error(`Failed to ${id ? "update" : "create"} sitemap`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <InputField
          label="Change Frequency"
          name="changefreq"
          type="select"
          value={inputValue.changefreq}
          options={["yearly", "monthly", "weekly"]}
          onChange={handleInputChange}
        />
        <InputField
          label="Sitemap URL"
          name="loc"
          value={inputValue.loc}
          onChange={handleInputChange}
        />
        <InputField
          label="Priority"
          name="priority"
          type="number"
          value={inputValue.priority}
          step="0.1"
          min="0"
          max="1"
          onChange={handleInputChange}
        />
      </div>
      {/* <button
        type="submit"
        aria-label="Submit"
        onClick={handleSubmit}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 my-5 px-5 border border-blue-500 hover:border-transparent rounded"
      >
        {id ? "Update" : "Save"}
      </button> */}
      <>
        <CreateNdUpdateBtn
          id={id}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </>
      <div className="mt-40 text-center">
        <Link
          href="/dashboard/sitemap/show-all-sitemaps"
          className="px-5 py-3 bg-primary-700 text-white"
        >
          Show All Sitemaps
        </Link>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  type = "text",
  onChange,
  options = [],
  ...rest
}) {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        {type === "select" ? (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="block w-full lg:w-4/6 px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...rest}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="block w-full lg:w-4/6 px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...rest}
          />
        )}
      </div>
    </div>
  );
}

export default CreateSitemap;
