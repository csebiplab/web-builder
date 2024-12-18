"use client";

import Link from "next/link";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import DeleteDocumentBtn from "./../Actions/DeleteDocumentBtn";

const ShowSitemaps = ({ data }) => {
  return (
    <div>
      {data?.length > 0 ? (
        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Change Frequency
                </th>
                <th scope="col" className="px-6 py-3">
                  Sitemap URL
                </th>
                <th scope="col" className="px-6 py-3">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.changefreq}
                  </th>
                  <td className="px-6 py-4">{item?.loc}</td>
                  <td className="px-6 py-4">{item?.priority}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/sitemap/${item?._id}`}>
                        <HiPencilAlt size={24} />
                      </Link>
                      <DeleteDocumentBtn
                        url={`/api/sitemap?id=${item?._id}`}
                        routerPath="/dashboard/sitemap"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-40 text-center">
          <p className="text-3xl text-center">No Data Found!</p>
          <Link
            href="/dashboard/sitemap"
            className="mt-5 px-5 py-3 bg-primary-700  text-white"
          >
            Add Sitemaps
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowSitemaps;
