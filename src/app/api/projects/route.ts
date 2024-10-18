import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import ProjectModel from "@/models/project.model";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: All APIs for projct.
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags: [Projects]
 *     summary: Create project
 *     description: Create a new project by providing the required details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *                 example: RhAdmin
 *               projectType:
 *                 type: string
 *                 example: Interior
 *               projectCat:
 *                 type: string
 *                 example: Residential
 *               projectCatHeading:
 *                 type: string
 *                 example: Elegant Homes
 *               projectName:
 *                 type: string
 *                 example: High Rise Apartments
 *               thumbPic:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Thumbnail Image
 *                   url:
 *                     type: string
 *                     example: /images/thumb.jpg
 *               projectPictures:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     projectPeriod:
 *                       type: string
 *                       example: 2023
 *                     urls:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: Picture 1
 *                           url:
 *                             type: string
 *                             example: /images/project1.jpg
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Internal server error
 */
export async function POST(request: Request) {
  try {
    const createData = await request.json();

    await connectToDatabase();
    const res = await ProjectModel.create(createData);

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
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Get projects
 *     description: Retrieve projects filtered by projectType and projectCat.
 *     parameters:
 *       - name: projectType
 *         in: query
 *         description: Type of the project (Interior/Exterior)
 *         schema:
 *           type: string
 *       - name: projectCat
 *         in: query
 *         description: Category of the project
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *       500:
 *         description: Internal server error
 */
export async function GET(req: Request) {
  const projectType = new URL(req.url).searchParams.get("projectType");
  const projectCat = new URL(req.url).searchParams.get("projectCat");

  await connectToDatabase();

  const query: any = {};
  let res;
  let projectsFields: any = {
    _id: 1,
    projectType: 1,
    projectCat: 1,
    projectCatHeading: 1,
    thumbPic: 1,
  };

  if (projectType) {
    query["projectType"] = { $regex: new RegExp(projectType, "i") };
  }

  if (projectCat) {
    query["projectCat"] = { $regex: new RegExp(projectCat, "i") };
    projectsFields = {
      _id: 1,
      projectName: 1,
      projectPictures: 1,
    };
  }

  const aggregationPipeline = [
    { $match: query },
    {
      $group: {
        _id: "$projectCat",
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$doc" },
    },
    {
      $project: projectsFields,
    },
  ];

  try {
    if (projectCat) {
      res = await ProjectModel.find(query, projectsFields);
    } else {
      res = await ProjectModel.aggregate(aggregationPipeline);
    }

    return jsonResponse(
      res,
      responseMessageUtilities.message,
      responseMessageUtilities.success
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
 * /api/projects:
 *   delete:
 *     summary: Delete a project
 *     description: Delete a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8b001f8e4b9b
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       500:
 *         description: Internal server error
 */
export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");

  await connectToDatabase();

  try {
    const res = await ProjectModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });

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
