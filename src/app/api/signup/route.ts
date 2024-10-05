import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import UserModel, { IUser } from "@/models/user.model";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     tags: [Auth]
 *     description: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
export async function POST(req: Request) {
  await connectToDatabase();

  const payload: IUser = await req.json();

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser: IUser = new UserModel({
    ...payload,
    password: hashedPassword,
  });

  await newUser.save();

  return jsonResponse(
    newUser,
    responseMessageUtilities.message,
    responseMessageUtilities.create
  );
}
