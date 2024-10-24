import { connectToDatabase } from "@/lib/connectToDb";
import { envConfig } from "@/lib/envConfig";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/admin:
 *   patch:
 *     tags: [User]
 *     description: Update the admin's profile, including username and password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentUserName:
 *                 type: string
 *                 description: Current username of the admin
 *               newUserName:
 *                 type: string
 *                 description: New username to update
 *               currentPassword:
 *                 type: string
 *                 description: Current password of the admin
 *               newPassword:
 *                 type: string
 *                 description: New password to update
 *     responses:
 *       200:
 *         description: Successfully updated admin profile
 *       401:
 *         description: Unauthorized (missing or invalid credentials)
 *       500:
 *         description: Internal Server Error
 */

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  // Start Mongoose session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payload = await request.json();
    const { currentUserName, newUserName, currentPassword, newPassword } =
      payload;

    if (!currentUserName) {
      return NextResponse.json(
        { error: "Please provide current user name" },
        { status: 401 }
      );
    }

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Please provide current password" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const admin = await UserModel.findOne({
      username: currentUserName,
    }).session(session);

    if (!admin) {
      return NextResponse.json({ error: "Invalid username" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Update username if provided
    if (newUserName) {
      admin.username = newUserName;
    }

    // Update password if provided
    if (newPassword) {
      const saltRounds = Number(envConfig.saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      admin.password = hashedPassword;
    }

    // Save the updated admin profile
    await admin.save();

    // Commit the transaction
    await session.commitTransaction();

    return jsonResponse(
      admin,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    // Abort transaction if an error occurs
    await session.abortTransaction();
    console.error("Error during update profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // End the session
    session.endSession();
  }
}
