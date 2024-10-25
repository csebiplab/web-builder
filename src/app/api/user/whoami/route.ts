import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import UserModel from "@/models/user.model";
import { Types } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /api/user/whoami:
 *   get:
 *     tags: [User]
 *     description: Get user details including roles and permissions.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Request Success
 *       400:
 *         description: Invalid request
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request?.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "send user _id in query" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const pipeline = [
      {
        $match: { _id: new Types.ObjectId(id) },
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
        },
      },
    ];

    const result = await UserModel.aggregate(pipeline).exec();

    if (!result || result.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return jsonResponse(
      result,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    console.error("Server error: ", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
