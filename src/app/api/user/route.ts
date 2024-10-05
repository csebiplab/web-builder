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
