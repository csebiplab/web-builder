import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/connectToDb";
import ProjectModel from "@/models/project.model";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";

/**
 * @swagger
 * tags:
 *   name: Projects
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     tags: [Project Details]
 *     summary: Update project details
 *     description: Update a project's details using the project ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8b001f8e4b9b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *               projectType:
 *                 type: string
 *               projectCat:
 *                 type: string
 *               projectCatHeading:
 *                 type: string
 *               projectName:
 *                 type: string
 *               thumbPic:
 *                 type: object
 *               projectPictures:
 *                 type: array
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid project ID format
 *       500:
 *         description: Internal server error
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();

    // Check if the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid project ID format",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const res = await ProjectModel.findByIdAndUpdate(
      id,
      { ...updateData },
      {
        new: true,
        upsert: false,
      }
    );

    return jsonResponse(
      res,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags: [Project Details]
 *     summary: Get project details by name
 *     description: Retrieve project details by providing the project name.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: High Rise Apartments
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id: projectName } = params;

  let projectsFields = {
    _id: 1,
    projectName: 1,
    projectPictures: 1,
  };

  await connectToDatabase();

  try {
    const res = await ProjectModel.findOne({ projectName }, projectsFields);

    if (!res) {
      return NextResponse.json(
        {
          status: 404,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return jsonResponse(
      res,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
