import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import UserModel, { IUser } from "@/models/user.model";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related operations
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [User]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
  await connectToDatabase();
  const users: IUser[] = await UserModel.find({});
  return jsonResponse(
    users,
    responseMessageUtilities.message,
    responseMessageUtilities.success
  );
}

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [User]
 *     description: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
  const newUser: IUser = new UserModel({ ...payload });
  await newUser.save();
  return jsonResponse(
    newUser,
    responseMessageUtilities.message,
    responseMessageUtilities.create
  );
}
