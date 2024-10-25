"use client";

import { Card, Typography } from "@material-tailwind/react";
import { HiPencilAlt } from "react-icons/hi";
import DeleteDocumentBtn from "./../../Actions/DeleteDocumentBtn";
import Link from "next/link";

const TABLE_HEAD = [
  "Serial",
  "Name",
  "User Name",
  "Email",
  "Project For",
  "Access Modules",
  "Actions",
];

export function ShowAllUsers({ data }) {
  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(
            ({ _id, name, username, email, role, permissions, deletedAt }, index) => (
              <tr key={_id} className={`${!deletedAt ? "even:bg-blue-gray-50/50" : "bg-danger-500"}`}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {username}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className="p-4 text-wrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {role ? (
                      role
                    ) : (
                      <span className="text-warning">Not Assigned Yet</span>
                    )}
                  </Typography>
                </td>
                <td className="p-4 text-wrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {permissions?.length > 0 && permissions?.[0]?.name ? (
                      permissions?.map(({ _id, name }) => (
                        <span key={_id}>{name},</span>
                      ))
                    ) : (
                      <span className="text-warning">0 Permissions</span>
                    )}
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/super-user/update-user/${_id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                    <DeleteDocumentBtn
                      url={`/api/user?id=${_id}`}
                      redirectPath="/dashboard/super-user/show-users"
                    />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}
