"use client";

import {
  projectPeriods,
  projectTypes,
  serviceWithCompanyName,
  servicesDropDown,
} from "@/constants/projectDetails.dropdownValue";
import "./ProjectDetailsForm.css";
import { HRSvg } from "./HRSvg";
import { useState } from "react";
import { toast } from "react-toastify";

const ProjectDetailsForm = ({ projectFor }) => {
  const [projectCat, setProjectCat] = useState("");
  const [projectCatHeading, setProjectCatHeading] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [thumbPic, setThumbPic] = useState(null);
  const [projectPics, setProjectPics] = useState({});
  const [projectPeriod, setProjectPeriod] = useState("");
  const [loading, setLoading] = useState(false);

  const projectData = {
    projectFor,
    projectCat,
    projectCatHeading,
    projectType,
    projectName,
    thumbPic,
    projectPictures: Object.keys(projectPics).map((period) => ({
      projectPeriod: period,
      urls: projectPics[period],
    })),
  };

  const uploadImage = async (file, setImage) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload-img", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      setImage(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadThumbImage = (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file, setThumbPic);
  };

  const uploadProjectImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file, (data) => {
        setProjectPics((prev) => ({
          ...prev,
          [projectPeriod]: [
            ...(prev[projectPeriod] || []),
            { name: data.name, url: data.url },
          ],
        }));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        throw new Error("Failed to save project details");
      }

      // Clear form fields on successful submission
      resetForm();
      toast.success("Project details saved successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProjectCat("");
    setProjectCatHeading("");
    setProjectType("");
    setProjectName("");
    setThumbPic(null);
    setProjectPics({});
    setProjectPeriod("");
  };

  return (
    <div className="parent__projectDetails px-16 py-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-9">
          <h5 className="service__info mb-4">Service Information</h5>
          <HRSvg />
          <div className="mt-6 flex gap-10">
            <div className="w-full">
              <label className="input__label mb-[10px] block w-full">
                Service
              </label>
              <select
                value={projectCat}
                onChange={(e) => setProjectCat(e.target.value)}
                className="dropdown__input block px-7 py-5 w-full"
              >
                <option value="" disabled>
                  Select Service Name
                </option>
                {servicesDropDown.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="input__label mb-[10px] block">
                Company Name With Service
              </label>
              <select
                value={projectCatHeading}
                onChange={(e) => setProjectCatHeading(e.target.value)}
                className="dropdown__input block px-7 py-5 w-full"
              >
                <option value="" disabled>
                  Select Company Name With Service
                </option>
                {serviceWithCompanyName.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="input__label mb-[10px] block">
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="dropdown__input block px-7 py-5 w-full"
              >
                <option value="" disabled>
                  Select Project Type
                </option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-9">
          <h5 className="service__info mb-4">Project Information</h5>
          <HRSvg />
          <div className="mt-6 flex gap-10">
            <div className="w-full">
              <label className="input__label mb-[10px] block w-full">
                Project Name
              </label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
                className="dropdown__input block px-7 py-[18px] w-full"
                placeholder="Enter Project Name"
              />
            </div>
            <div className="w-full">
              <label className="input__label mb-[10px] block w-full">
                Picture
              </label>
              <label className="dropdown__input w-full flex justify-between items-center px-7 py-3">
                <span className="text-lg">
                  {thumbPic ? thumbPic.name : "Select a file"}
                </span>
                <span className="text-base choose__file px-8 py-2">
                  Upload Picture
                </span>
                <input
                  onChange={uploadThumbImage}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {thumbPic && (
            <div className="mt-3">
              <p>Uploaded Project Image:</p>
              <img
                src={thumbPic.url}
                alt="Project Thumbnail"
                className="h-[300px] w-[300px]"
              />
            </div>
          )}
        </div>

        <div className="mb-9">
          <div className="mt-9 mb-6">
            <HRSvg />
          </div>
          <div className="grid grid-cols-12 items-center gap-y-6 gap-x-10 w-full mb-12">
            <div className="w-full col-span-4">
              <label className="input__label mb-[10px] block w-full">
                Project Period
              </label>
              <select
                value={projectPeriod}
                onChange={(e) => setProjectPeriod(e.target.value)}
                required
                className="dropdown__input block px-7 py-[18px] w-full mt-2"
              >
                <option value="" disabled>
                  Select Project Period
                </option>
                {projectPeriods.map(({ label, value }, i) => (
                  <option key={i} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full col-span-5">
              <label className="input__label mb-[10px] block w-full">
                Picture
              </label>
              <label className="dropdown__input w-full flex justify-between items-center px-7 py-2">
                <span className="text-lg">Select a file</span>
                <span className="text-base choose__file px-8 py-2">
                  Upload Picture
                </span>
                <input
                  onChange={uploadProjectImageHandler}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            <div className="w-full col-span-3 plus__upload">
              <label className="mb-[10px] flex items-center mt-8 gap-2 w-full cursor-pointer">
                <img
                  src="/assets/icons/addmore.png"
                  alt="add more"
                  className="w-10 h-10 rounded-full upload__img"
                />
                <span className="text-lg upload__text">Add More</span>
                <input
                  onChange={uploadProjectImageHandler}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {Object.keys(projectPics).length > 0 && (
            <div>
              <h4>Uploaded Project Images:</h4>
              {Object.entries(projectPics).map(([period, images]) => (
                <div key={period}>
                  <h5 className="mt-4">{period}:</h5>
                  <div className="flex gap-4">
                    {images.map((img) => (
                      <img
                        key={img.name}
                        src={img.url}
                        alt={img.name}
                        className="h-[150px] w-[150px]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className={`px-8 py-4 text-lg rounded-lg transition-all duration-500 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetailsForm;
