import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import RobotTxtModel, { IRobotTxt } from "@/models/robotTxt.model";
import { AdminEnum } from "@/models/role.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   name: RobotTxt
 *   description: API endpoints for managing robots.txt records.
 */

/**
 * @swagger
 * /api/robot-txt:
 *   get:
 *     tags: [RobotTxt]
 *     description: Fetch all robot.txt records.
 *     parameters:
 *       - in: query
 *         name: projectFor
 *         required: false
 *         schema:
 *           type: string
 *         description: The project scope (e.g., Admin, Super Admin)
 *     responses:
 *       200:
 *         description: A list of robot.txt records.
 *       500:
 *         description: Server error.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectFor: string | null = searchParams.get("projectFor");

    const query: { projectFor?: string | null } = {};

    if (projectFor && projectFor !== AdminEnum.SUPER_ADMIN) {
      query["projectFor"] = projectFor;
    }

    const projectsFields = {
      deletedAt: 0,
      createdAt: 0,
      updatedAt: 0,
    };

    await connectToDatabase();
    const data = await RobotTxtModel.find(query, {
      ...projectsFields,
    });

    return jsonResponse(
      data,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/robot-txt:
 *   post:
 *     tags: [RobotTxt]
 *     description: Add a new robot.txt record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *                 description: The project associated with the robot.txt.
 *               sitemap_url:
 *                 type: string
 *                 description: The sitemap URL.
 *               user_agent:
 *                 type: string
 *                 description: The user agent.
 *               allow:
 *                 type: string
 *                 description: The allowed paths.
 *               disallow:
 *                 type: string
 *                 description: The disallowed paths.
 *     responses:
 *       201:
 *         description: Robot.txt record created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
export async function POST(request: Request) {
  try {
    const payload: Omit<
      IRobotTxt,
      "_id" | "createdAt" | "updatedAt" | "deletedAt"
    > = await request.json();

    await connectToDatabase();
    const newRobotTxt = await RobotTxtModel.create(payload);

    return jsonResponse(
      newRobotTxt,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/robot-txt:
 *   delete:
 *     tags: [RobotTxt]
 *     description: Delete a robot.txt record by marking it as deleted.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the robot.txt record to delete.
 *     responses:
 *       200:
 *         description: Robot.txt record deleted successfully.
 *       400:
 *         description: ID is required.
 *       404:
 *         description: Robot.txt record not found.
 *       500:
 *         description: Server error.
 */
export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    const deletedRobotTxt = await RobotTxtModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedRobotTxt) {
      return NextResponse.json(
        { error: "Robot.txt record not found" },
        { status: 404 }
      );
    }

    return jsonResponse(
      deletedRobotTxt,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
