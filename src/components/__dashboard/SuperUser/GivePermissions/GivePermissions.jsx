"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";



const GivePermissions = ({roles, permissions, url}) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    reset();
  };

  const onSubmit = (data) => {
    console.log("Selected Role:", selectedRole);
    console.log("Selected Permissions:", data.permissions || []);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Assign Permissions to Role
      </h2>

      <label
        htmlFor="role"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Select Role
      </label>
      <select
        id="role"
        className="w-full mb-4 p-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-500"
        value={selectedRole}
        onChange={handleRoleChange}
      >
        <option value="">Select a role</option>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>

      {selectedRole && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Assign Permissions
          </label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {permissions.map((permission) => (
              <div key={permission.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`permission-${permission.value}`}
                  value={permission.value}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  {...register("permissions")}
                />
                <label
                  htmlFor={`permission-${permission.value}`}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {permission.label}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save Permissions
          </button>
        </form>
      )}
    </div>
  );
};

export default GivePermissions;
