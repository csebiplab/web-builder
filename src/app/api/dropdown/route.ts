/**
 * @swagger
 * /api/dropdown:
 *   get:
 *     tags: [Auth]
 *     description: Fetch all available roles and either users or permissions based on the query parameter.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [roles-and-users, roles-and-permissions]
 *         required: true
 *         description: Specify the type of data to fetch - either "roles-and-users" or "roles-and-permissions".
 *     responses:
 *       200:
 *         description: Request Success
 *       400:
 *         description: Invalid query parameter
 *       500:
 *         description: Server error
 */

import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import PermissionModel from "@/models/permission.model";
import RoleModel from "@/models/role.model";
import UserModel from "@/models/user.model";
import UserRoleModel from "@/models/userRole.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const type: string | any = searchParams.get("type");

    if (!["roles-and-users", "roles-and-permissions"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid query parameter" },
        { status: 400 }
      );
    }

    const roles = await RoleModel.find({ deletedAt: null });

    const rolesWithLabelValue = roles.map((role) => ({
      label: role.rolename,
      value: role._id,
    }));

    if (type === "roles-and-permissions") {
      const permissions = await PermissionModel.find({ deletedAt: null });
      const permissionsWithLabelValue = permissions.map((permission) => ({
        label: permission.permissionName,
        value: permission._id,
      }));

      const prepareData = {
        roles: rolesWithLabelValue,
        permissions: permissionsWithLabelValue,
      };

      return jsonResponse(
        prepareData,
        responseMessageUtilities.message,
        responseMessageUtilities.success
      );
    } else if (type === "roles-and-users") {
      const userRoles = await UserRoleModel.find({ deletedAt: null });
      const userIds = userRoles.map((userRole) => userRole.userId);

      const users = await UserModel.find({
        deletedAt: null,
        _id: { $nin: userIds },
      });

      const usersWithLabelValue = users.map((user) => ({
        label: user.name,
        value: user._id,
      }));

      const prepareData = {
        roles: rolesWithLabelValue,
        users: usersWithLabelValue,
      };

      return jsonResponse(
        prepareData,
        responseMessageUtilities.message,
        responseMessageUtilities.success
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}
