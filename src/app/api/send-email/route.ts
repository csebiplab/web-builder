import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import MessageModel, { IUserMessage } from "@/models/userMessages.model";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { connectToDatabase } from "@/lib/connectToDb";

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Email related operations
 */

/**
 * @swagger
 * /api/send-email:
 *   post:
 *     tags: [Email]
 *     summary: Send a message and store it in MongoDB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Failed to send email
 */

export async function POST(req: Request) {
  try {
    const { projectFor, name, email, message }: IUserMessage = await req.json();

    await connectToDatabase();
    // Save message to MongoDB
    const userMessage = await MessageModel.create({
      projectFor,
      name,
      email,
      message,
    });
    // await userMessage.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: projectFor,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return jsonResponse(
      userMessage,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
