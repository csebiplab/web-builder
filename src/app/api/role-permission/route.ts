import { NextResponse } from "next/server";
import RolePermissionModel from "@/models/rolePermission.model";
import { connectToDatabase } from "@/lib/connectToDb";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import * as mongoose from "mongoose";

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
 *                 example: "670ec85e088abcdece7638d0"
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["670ecb3684cc5d50de983d18", "670eccd984cc5d50de983d1c"]
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

    const role = await RolePermissionModel.findOne({ roleId: roleId });

    if (role && role?.roleId) {
      return NextResponse.json(
        { error: "You already have given permissions for this role!" },
        { status: 400 }
      );
    }

    const newRolePermission = {
      roleId: new mongoose.Types.ObjectId(roleId),
      permissionIds: permissionIds.map((p) => new mongoose.Types.ObjectId(p)),
    };

    const res = await RolePermissionModel.create(newRolePermission);

    return jsonResponse(
      res,
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
