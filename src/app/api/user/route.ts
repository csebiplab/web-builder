import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import UserModel, { IUser } from "@/models/user.model";
import { PipelineStage } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related operations
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [User]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Request Success
 */
export async function GET() {
  await connectToDatabase();

  // const pipeline = [
  //   {
  //     $match: {},
  //   },
  //   {
  //     $lookup: {
  //       from: "userroles",
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "userRoles",
  //     },
  //   },
  //   {
  //     $unwind: "$userRoles",
  //   },
  //   {
  //     $lookup: {
  //       from: "roles",
  //       localField: "userRoles.roleId",
  //       foreignField: "_id",
  //       as: "roleDetails",
  //     },
  //   },
  //   {
  //     $unwind: "$roleDetails",
  //   },
  //   {
  //     $lookup: {
  //       from: "rolepermissions",
  //       localField: "roleDetails._id",
  //       foreignField: "roleId",
  //       as: "rolePermissions",
  //     },
  //   },
  //   {
  //     $unwind: "$rolePermissions",
  //   },
  //   {
  //     $lookup: {
  //       from: "permissions",
  //       localField: "rolePermissions.permissionIds",
  //       foreignField: "_id",
  //       as: "permissions",
  //     },
  //   },
  //   {
  //     $unwind: "$permissions",
  //   },
  //   {
  //     $group: {
  //       _id: "$_id",
  //       username: { $first: "$username" },
  //       name: { $first: "$name" },
  //       email: { $first: "$email" },
  //       role: { $first: "$roleDetails.rolename" },
  //       permissions: {
  //         $push: {
  //           _id: "$permissions._id",
  //           name: "$permissions.permissionName",
  //           description: "$permissions.description",
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $sort: { name: 1 },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       name: 1,
  //       username: 1,
  //       email: 1,
  //       role: 1,
  //       permissions: 1,
  //     },
  //   },
  // ];

  const pipeline: PipelineStage[] = [
    {
      $match: {},
    },
    {
      $lookup: {
        from: "userroles",
        localField: "_id",
        foreignField: "userId",
        as: "userRoles",
      },
    },
    {
      $unwind: {
        path: "$userRoles",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "userRoles.roleId",
        foreignField: "_id",
        as: "roleDetails",
      },
    },
    {
      $unwind: {
        path: "$roleDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "rolepermissions",
        localField: "roleDetails._id",
        foreignField: "roleId",
        as: "rolePermissions",
      },
    },
    {
      $unwind: {
        path: "$rolePermissions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "rolePermissions.permissionIds",
        foreignField: "_id",
        as: "permissions",
      },
    },
    {
      $unwind: {
        path: "$permissions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        name: { $first: "$name" },
        email: { $first: "$email" },
        role: { $first: "$roleDetails.rolename" },
        permissions: {
          $push: {
            _id: "$permissions._id",
            name: "$permissions.permissionName",
            description: "$permissions.description",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        role: 1,
        permissions: 1,
        // role: { $ifNull: ["$role", null] },
        // permissions: {
        //   $cond: {
        //     if: { $eq: ["$permissions._id", null] },
        //     then: [],
        //     else: "$permissions",
        //   },
        // },
      },
    },
    {
      $sort: { name: 1 },
    },
  ];

  // console.log(JSON.stringify(pipeline, null, 4));

  const users = await UserModel.aggregate(pipeline).exec();

  return jsonResponse(
    users,
    responseMessageUtilities.message,
    responseMessageUtilities.success
  );
}
