"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { envConfig } from "@/lib/envConfig";

const CreateRobot = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/robot-txt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          projectFor: user?.role,
          sitemap_url: `${envConfig?.url}/sitemap.xml`,
        }),
      });

      if (response.ok) {
        toast.success("robots.txt data submitted successfully!");
        reset();
      } else {
        toast.error("Failed to submit robots.txt data.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pl-12">
      <h3 className="mb-3 text-3xl font-bold">Add Robot</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="block">User Agent:</label>
          <input
            className="border border-green-300 px-3 py-2 w-1/2"
            {...register("user_agent", { required: "User Agent is required" })}
            placeholder="Enter User Agent"
          />
          {errors.user_agent && (
            <p className="text-red-500">{errors.user_agent.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block">Allow:</label>
          <input
            className="border border-green-300 px-2 py-2 w-1/2"
            {...register("allow", { required: "Allow field is required" })}
            placeholder="Enter allowed paths (comma-separated)"
          />
          {errors.allow && (
            <p className="text-red-500">{errors.allow.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block">Disallow:</label>
          <input
            className="border border-green-300 px-2 py-2 w-1/2"
            {...register("disallow", {
              required: "Disallow field is required",
            })}
            placeholder="Enter disallowed paths (comma-separated)"
          />
          {errors.disallow && (
            <p className="text-red-500">{errors.disallow.message}</p>
          )}
        </div>

        <Button
          aria-label="Form submit button"
          className="mt-6"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? `Saving...` : `Save`}
        </Button>
      </form>

      <div className="mt-20 text-center">
        <Link
          href="/dashboard/robot/show-all-robots-txt"
          className="px-5 py-3 bg-primary-700  text-white"
        >
          Show All Robots
        </Link>
      </div>
    </div>
  );
};

export default CreateRobot;
