import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import UserModel, { IUser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     tags: [User]
 *     description: Update a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
export async function Patch(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User" }, { status: 400 });
    }

    await connectToDatabase();

    const payload: IUser = await request.json();

    const hashedPassword = await bcrypt.hash(payload?.password, 10);
    const updatedData: IUser = new UserModel({
      ...payload,
      password: hashedPassword,
    });

    await updatedData.save();

    return jsonResponse(
      updatedData,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags: [User]
 *     description: Get a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully fetched user
 *       400:
 *         description: Invalid User
 *       404:
 *         description: User not found
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return jsonResponse(
      user,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
