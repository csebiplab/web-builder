import PermissionModel, { IPermission } from "@/models/permission.model";
import { connectToDatabase } from "@/lib/connectToDb";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Permission Related Operations
 */

/**
 * @swagger
 *  /api/permission:
 *    post:
 *      tags: [Auth]
 *      description: Create a new permission
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                permissionName:
 *                  type: string
 *                description:
 *                  type: string
 *      responses:
 *        201:
 *          description: User created successfully
 *        400:
 *          description: Bad Request
 */
export const POST = async (req: Request, res: Response) => {
  await connectToDatabase();
  const permissionData: Partial<IPermission> = await req.json();
  const permission = new PermissionModel(permissionData);
  await permission.save();
  return NextResponse.json(permission, { status: 201 });
};

/**
 * @swagger
 *  /api/permission:
 *    get:
 *      tags: [Auth]
 *      description: Retrieve all permissions
 *      responses:
 *        200:
 *          description: Request Success
 */
export const GET = async (req: Request, res: Response) => {
  await connectToDatabase();
  const permissions = await PermissionModel.find();
  return NextResponse.json(permissions, { status: 200 });
};
