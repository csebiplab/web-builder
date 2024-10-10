import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import RobotTxtModel, { IRobotTxt } from "@/models/robotTxt.model";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/robot-txt/{id}:
 *   get:
 *     tags: [RobotTxt]
 *     description: Fetch a single robot.txt record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the robot.txt record to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single robot.txt record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the robot.txt record.
 *                 projectFor:
 *                   type: string
 *                   description: The project associated with the robot.txt.
 *                 sitemap_url:
 *                   type: string
 *                   description: The sitemap URL.
 *                 user_agent:
 *                   type: string
 *                   description: The user agent.
 *                 allow:
 *                   type: string
 *                   description: The allowed paths.
 *                 disallow:
 *                   type: string
 *                   description: The disallowed paths.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the record.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update date of the record.
 *       404:
 *         description: Robot.txt record not found.
 *       500:
 *         description: Server error.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const data = await RobotTxtModel.findById(params.id);

    if (!data) {
      return NextResponse.json(
        { error: "Robot.txt record not found" },
        { status: 404 }
      );
    }

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
 * /api/robot-txt/{id}:
 *   patch:
 *     tags: [RobotTxt]
 *     description: Update a robot.txt record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the robot.txt record to update.
 *         schema:
 *           type: string
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
 *       200:
 *         description: Robot.txt record updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the robot.txt record.
 *                     projectFor:
 *                       type: string
 *                       description: The project associated with the robot.txt.
 *                     sitemap_url:
 *                       type: string
 *                       description: The sitemap URL.
 *                     user_agent:
 *                       type: string
 *                       description: The user agent.
 *                     allow:
 *                       type: string
 *                       description: The allowed paths.
 *                     disallow:
 *                       type: string
 *                       description: The disallowed paths.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The creation date of the record.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The last update date of the record.
 *       404:
 *         description: Robot.txt record not found.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updateData: Partial<IRobotTxt> = await request.json();

    await connectToDatabase();
    const updatedRobotTxt = await RobotTxtModel.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    if (!updatedRobotTxt) {
      return NextResponse.json(
        { error: "Robot.txt record not found" },
        { status: 404 }
      );
    }

    return jsonResponse(
      updatedRobotTxt,
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
