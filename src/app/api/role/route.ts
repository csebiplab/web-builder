import { NextResponse } from "next/server";
import RoleModel from "@/models/role.model";
import { connectToDatabase } from "@/lib/connectToDb";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";

export enum AdminEnum {
  SUPER_ADMIN = "Super Admin",
}

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/role:
 *   get:
 *     tags: [Auth]
 *     description: Fetch all available roles.
 *     responses:
 *       200:
 *         description: A list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   rolename:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error.
 *   post:
 *     tags: [Auth]
 *     description: Add a new role to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolename:
 *                 type: string
 *                 example: "Manager"
 *               description:
 *                 type: string
 *                 example: "Manages teams"
 *     responses:
 *       201:
 *         description: Role created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */

export async function GET() {
  try {
    await connectToDatabase();
    const roles = await RoleModel.find();

    // Successful response
    return jsonResponse(
      roles,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { rolename, description } = await req.json();

    if (!rolename || !description) {
      return NextResponse.json(
        { error: "Role name and description are required" },
        { status: 400 }
      );
    }

    if (rolename !== AdminEnum.SUPER_ADMIN && rolename.split(" ").length > 1) {
      return NextResponse.json(
        { error: "Role name must not contain spaces" },
        { status: 400 }
      );
    }

    const newRole = new RoleModel({ rolename, description });
    await newRole.save();

    return jsonResponse(
      newRole,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create role" },
      { status: 500 }
    );
  }
}
