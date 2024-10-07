import { NextResponse } from "next/server";
import UserRoleModel from "@/models/userRole.model";
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
 * /api/userrole:
 *   get:
 *     tags: [Auth]
 *     description: Fetch all user-role mappings.
 *     responses:
 *       200:
 *         description: A list of user roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   roleId:
 *                     type: string
 *       500:
 *         description: Server error.
 *   post:
 *     tags: [Auth]
 *     description: Assign a specific role to a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "614d1b5f2f9a2c001c8b4567"
 *               roleId:
 *                 type: string
 *                 example: "614d1b5f2f9a2c001c8b1234"
 *     responses:
 *       201:
 *         description: Role assigned successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */

export async function GET() {
  try {
    await connectToDatabase();
    const userRoles = await UserRoleModel.find()
      .populate("userId")
      .populate("roleId");

    return jsonResponse(
      userRoles,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user roles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { userId, roleId } = await req.json();

    if (!userId || !roleId) {
      return NextResponse.json(
        { error: "User ID and Role ID are required" },
        { status: 400 }
      );
    }

    const newUserRole = new UserRoleModel({ userId, roleId });
    await newUserRole.save();

    return jsonResponse(
      newUserRole,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to assign role" },
      { status: 500 }
    );
  }
}
