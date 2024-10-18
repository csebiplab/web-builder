/**
 * @swagger
 * /api/dropdown/role-nd-permissions:
 *   get:
 *     tags: [Auth]
 *     description: Fetch all available roles nd permissions.
 *     responses:
 *       200:
 *         description: Request Success
 *       500:
 *         description: Server error.
 */

import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import PermissionModel from "@/models/permission.model";
import RoleModel from "@/models/role.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const [roles, permissions] = await Promise.all([
      RoleModel.find({ deletedAt: null }),
      PermissionModel.find({ deletedAt: null }),
    ]);

    const rolesWithLabelValue = roles.map((role) => {
      return {
        label: role.rolename,
        value: role._id,
      };
    });

    const permissionsWithLabelValue = permissions.map((permission) => {
      return {
        label: permission.permissionName,
        value: permission._id,
      };
    });

    const prepareData = {
      roles: rolesWithLabelValue,
      permissions: permissionsWithLabelValue,
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
