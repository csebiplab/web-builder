/**
 * @swagger
 * /api/dropdown/roles-and-users:
 *   get:
 *     tags: [Auth]
 *     description: Fetch all available roles nd users.
 *     responses:
 *       200:
 *         description: Request Success
 *       500:
 *         description: Server error.
 */

import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import RoleModel from "@/models/role.model";
import UserModel from "@/models/user.model";
import UserRoleModel from "@/models/userRole.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const userRoles = await UserRoleModel.find({ deletedAt: null });

    const userIds = userRoles.map((userRole) => userRole.userId);

    const roles = await RoleModel.find({ deletedAt: null });

    const users = await UserModel.find({
      deletedAt: null,
      _id: { $nin: userIds },
    });

    // const [roles, users] = await Promise.all([
    //   RoleModel.find({ deletedAt: null }),
    //   // UserModel.find({ deletedAt: null, _id: { $nin: userIds } }),
    //   UserModel.find({ deletedAt: null }),
    // ]);

    const rolesWithLabelValue = roles.map((role) => {
      return {
        label: role.rolename,
        value: role._id,
      };
    });

    const usersWithLabelValue = users.map((user) => {
      return {
        label: user.name,
        value: user._id,
      };
    });

    const prepareData = {
      roles: rolesWithLabelValue,
      users: usersWithLabelValue,
    };

    // Successful response
    return jsonResponse(
      prepareData,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}
