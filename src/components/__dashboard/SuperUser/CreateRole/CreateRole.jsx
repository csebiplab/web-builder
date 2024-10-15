"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateRole() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Successfully created!");
        reset();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create A Role</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rolename"
            >
              Role Name
            </label>
            <input
              id="rolename"
              type="text"
              {...register("rolename", { required: "Role name is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.rolename.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Creating..." : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
