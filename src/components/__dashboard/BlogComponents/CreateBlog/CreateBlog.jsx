"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BlogContentEditor from "./BlogContentEditor";
import YearNdMonthPicker from "../../../common/YearNdMonthPicker";

function CreateBlog({ id, data, user }) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [inputValue, setInputValue] = useState({
    blogTitle: "",
    metaTitle: "",
    customLink: "",
    metaDescription: "",
    metaKeywords: "",
    shortDescription: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setInputValue({
        blogTitle: data.blogTitle || "",
        metaTitle: data.metaTitle || "",
        customLink: data.customLink || "",
        metaDescription: data.metaDescription || "",
        metaKeywords: data.metaKeywords || "",
        shortDescription: data.shortDescription || "",
        content: data.content || "",
      });
    }
  }, [data]);

  const handleInputChange = useCallback((eventKey, e) => {
    const { value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [eventKey]: value,
    }));
  }, []);

  const handleChangeYear = useCallback((selectedYear) => {
    setSelectedYear(selectedYear);
    inputValue["blogTitle"] = inputValue.blogTitle.concat(` ${selectedYear}`);
  });
  const handleChangeMonth = useCallback((selectedMonth) => {
    setSelectedMonth(selectedMonth);
    inputValue["blogTitle"] = inputValue.blogTitle.concat(`${selectedMonth}`);
  });

  const handleBlogContentEditor = useCallback((eventKey, content) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [eventKey]: content,
    }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const method = id ? "PATCH" : "POST";
      const url = id ? `/api/blogs/${id}` : `/api/blogs`;
      const body = JSON.stringify({
        ...inputValue,
        projectFor: user?.role,
      });

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!res.ok) {
        toast.error(`Failed to ${id ? "update" : "create"} blog`);
        return;
      }

      toast.success(`Successfully ${id ? "updated" : "created"} blog`);
      router.refresh();
      router.push(`/dashboard/blogs/show-blogs`);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // console.log(selectedMonth, "selectedMonth");
  // console.log(selectedYear, "selectedYear");

  return (
    <div className="px-5">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-14">
        {[
          { label: "Blog Title", key: "blogTitle" },
          { label: "Meta Title", key: "metaTitle" },
          { label: "Custom Link", key: "customLink" },
          { label: "Meta Description", key: "metaDescription" },
          { label: "Meta Keywords", key: "metaKeywords" },
          { label: "Short Description", key: "shortDescription" },
        ].map((field) => (
          <div
            className={`${field.key === "blogTitle" ? "flex w-4/6" : ""}`}
            key={field.key}
          >
            <div className="w-full">
              <label
                htmlFor={field.key}
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                {field.label}
              </label>
              <div className="mt-2">
                <textarea
                  required
                  name={field.key}
                  id={field.key}
                  autoComplete="off"
                  rows="4"
                  className={`block ${
                    field.key !== "blogTitle" && "lg:w-4/6"
                  } w-full px-5 rounded-md border-0 py-1.5
                   text-gray-900 dark:text-white shadow-sm ring-1 ring-inset
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={inputValue[field.key]}
                  onChange={(e) => handleInputChange(field.key, e)}
                />
              </div>
            </div>
            <div className="ml-2">
              {field?.key === "blogTitle" && (
                <YearNdMonthPicker
                  currentYear={currentYear}
                  setSelectedYear={setSelectedYear}
                  setSelectedMonth={setSelectedMonth}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  handleChangeMonth={handleChangeMonth}
                  handleChangeYear={handleChangeYear}
                />
              )}
            </div>
          </div>
        ))}

        <div className="blogContentEditor">
          <BlogContentEditor
            inputValue={inputValue}
            handleInputChange={handleBlogContentEditor}
          />
        </div>
      </div>

      <div className="mt-20">
        <button
          type="submit"
          aria-label={id ? "Update" : "Create"}
          onClick={handleSubmit}
          className={`w-1/6 bg-blue-600 hover:bg-blue-500  font-semibold text-white py-2 my-5 px-5 border border-blue-500 hover:border-transparent rounded ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : id ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;
