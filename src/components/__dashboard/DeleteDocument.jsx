"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteDocument({
  url = "http://localhost:3000",
  redirectPath = "/dashboard/admin/profile",
}) {
  const router = useRouter();
  const deleteHandler = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
      toast.success(`Successfully deleted.`);
      return router.push(routerPath);
    }
  };

  return (
    <button
      aria-label="Delete"
      onClick={deleteHandler}
      className="text-red-400"
    >
      <HiOutlineTrash size={24} />
      <span className="sr-only">Delete</span>
    </button>
  );
}
