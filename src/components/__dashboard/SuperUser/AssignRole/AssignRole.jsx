"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFetchdata } from "./../../../../hooks/useFetchdata";

const AssignRole = ({ roles, users, url, fetchUrl }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  //  const { data, isLoading, error } = useFetchdata(fetchUrl);

  // if(isLoading) return <p>Loading...</p>

  // const users = data?.data?.users
  // const roles = data?.data?.roles;

  const onSubmit = async (data) => {
    const { userId, roleId } = data;

    if (!userId || !roleId) {
      setMessage("Please select both a user and a role.");
      return;
    }

    const payload = {
      userId,
      roleId,
    };

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...payload}),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Role assigned successfully");
        reset();
      } else {
        toast.error(result.error || "Failed to assign role");
      }
    } catch (error) {
      toast.error("An error occurred while assigning role.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Assign Role to User
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="user"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select User
        </label>
        <select
          id="user"
          className={`w-full mb-4 p-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-500 ${
            errors.userId ? "border-red-500" : ""
          }`}
          {...register("userId", { required: "Please select a user" })}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.value} value={user.value}>
              {user.label}
            </option>
          ))}
        </select>
        {errors.userId && (
          <p className="text-red-500 text-sm">{errors.userId.message}</p>
        )}

        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Role
        </label>
        <select
          id="role"
          className={`w-full mb-4 p-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-500 ${
            errors.roleId ? "border-red-500" : ""
          }`}
          {...register("roleId", { required: "Please select a role" })}
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="text-red-500 text-sm">{errors.roleId.message}</p>
        )}

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Assigning..." : "Assign Role"}
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AssignRole;
