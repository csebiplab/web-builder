import { NextResponse } from "next/server";
import RolePermissionModel from "@/models/rolePermission.model";
import { connectToDatabase } from "@/lib/connectToDb";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/role-permission:
 *   get:
 *     tags: [Auth]
 *     description: Fetch all role permissions.
 *     responses:
 *       200:
 *         description: A list of role permissions.
 *       500:
 *         description: Server error.
 *   post:
 *     tags: [Auth]
 *     description: Assign permissions to a role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: string
 *                 example: "64a2b3c4d5e6f7g8h9i0j1k2"
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64b2b3c4d5e6f7g8h9i0j1l2", "64b2b3c4d5e6f7g8h9i0j1m3"]
 *     responses:
 *       201:
 *         description: Role permissions assigned successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *        description: Server error.
 */

export async function GET() {
  try {
    await connectToDatabase();
    const rolePermissions = await RolePermissionModel.find().populate(
      "roleId permissionIds"
    );
    return jsonResponse(
      rolePermissions,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch role permissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { roleId, permissionIds } = await req.json();

    if (
      !roleId ||
      !permissionIds ||
      !Array.isArray(permissionIds) ||
      permissionIds.length === 0
    ) {
      return NextResponse.json(
        { error: "Role ID and an array of Permission IDs are required" },
        { status: 400 }
      );
    }

    const newRolePermission = new RolePermissionModel({
      roleId,
      permissionIds,
    });
    await newRolePermission.save();

    return jsonResponse(
      newRolePermission,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to assign permissions to role" },
      { status: 500 }
    );
  }
}
