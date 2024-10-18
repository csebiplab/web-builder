import { NextResponse } from "next/server";
import UserRoleModel from "@/models/userRole.model";
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
 * /api/user-role:
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

    const userRole = await UserRoleModel.findOne({ userId: userId });

    if (userRole && userRole?.userId) {
      return NextResponse.json(
        { error: "You already have given a role for this user!" },
        { status: 400 }
      );
    }

    const newUserRole = {
      userId: new mongoose.Types.ObjectId(userId),
      roleId: new mongoose.Types.ObjectId(roleId),
    };
    const res = await UserRoleModel.create(newUserRole);

    return jsonResponse(
      res,
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

/*

{
  "_id": {
    "$oid": "67041be2f5365a8f2cfbf76e"
  },
  "userId": {
    "$oid": "670ea75b84cc5d50de983d00"
  },
  "roleId": {
    "$oid": "67040e95607f60f5afdb1b55"
  },
  "deletedAt": null,
  "createdAt": {
    "$date": "2024-10-07T17:35:30.818Z"
  },
  "updatedAt": {
    "$date": "2024-10-07T17:35:30.818Z"
  },
  "__v": 0
}

*/
