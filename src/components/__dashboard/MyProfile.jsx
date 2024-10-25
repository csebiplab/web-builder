"use client";

import { envConfig } from "@/lib/envConfig";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyProfile = ({ user }) => {
  const [isUpdateBtnClick, setUpdateBtnClick] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { newUsername, currentPassword, newPassword } = data;

    if (!newUsername && !newPassword && !currentPassword) {
      toast.warning("Please provide a new username or password.");
      return;
    }

    try {
      const response = await fetch(`/api/admin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserName: user?.username,
          newUserName: newUsername,
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
        return;
      }

      const responseData = await response.json();
      await signOut({ callbackUrl: `${envConfig?.url}/signin` });

      toast.success(responseData?.message);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div>
      <div>
        <p className="text-xl text-white">
          <span className="font-bold text-white">Name:</span>{" "}
          <span className="text-primary">{user?.name}</span>
        </p>
        <p className="text-xl text-white">
          <span className="font-bold text-white">User Name:</span>{" "}
          <span className="text-primary">{user?.username}</span>
        </p>
        <p className="text-xl text-white">
          <span className="font-bold text-white">Role:</span>{" "}
          <span className="text-primary">{user?.role}</span>
        </p>
        {
          !isUpdateBtnClick && <button
          onClick={() => setUpdateBtnClick(true)}
          className="mt-8 bg-red-800 px-3 py-1 text-white"
        >
          Update
        </button>
        }
      </div>
      {
        isUpdateBtnClick && <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-white">New Username</label>
              <input
                type="text"
                placeholder="New username"
                {...register("newUsername", {
                  required: "New username is required.",
                })}
                autoComplete="off"
              />
              {errors.newUsername && (
                <p className="text-red-500">{errors.newUsername.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-white">Current password</label>
              <input
                type="password"
                placeholder="********"
                {...register("currentPassword", {
                  required: "Current password is required.",
                })}
                autoComplete="off"
              />
              {errors.currentPassword && (
                <p className="text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-white">New password</label>
              <input
                type="password"
                placeholder="********"
                {...register("newPassword", {
                  required: "New password is required.",
                })}
                autoComplete="off"
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`bg-red-700 text-white mt-6 px-3 py-1`}
            disabled={isSubmitting}
            aria-label="Submit"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      }
      
    </div>
  );
};

export default MyProfile;
