import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import MetaDataModel, { IMetaData } from "@/models/metadata.model";
import { connectToDatabase } from "@/lib/connectToDb";
import { AdminEnum } from "@/models/role.model";

/**
 * @swagger
 * tags:
 *   name: MetaData
 *   description: Metada related operations
 */

/**
 * @swagger
 * /api/metadata:
 *   post:
 *     tags: [MetaData]
 *     description: Create new metadata.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *               pageName:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               keywords:
 *                 type: string
 *               pageLink:
 *                 type: string
 *     responses:
 *       201:
 *         description: Metadata created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal Server Error.
 */

export async function POST(request: NextRequest) {
  try {
    const payload: Omit<
      IMetaData,
      "_id" | "createdAt" | "updatedAt" | "deletedAt"
    > = await request.json();

    await connectToDatabase();

    const data = await MetaDataModel.create(payload);

    return jsonResponse(
      data,
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
 * /api/metadata:
 *   get:
 *     tags: [MetaData]
 *     summary: Get metadata by project scope and optionally by pageLink.
 *     description: Fetch metadata based on the project scope using the `projectFor` query parameter. Optionally, filter by `pageLink`.
 *     parameters:
 *       - in: query
 *         name: projectFor
 *         required: false
 *         schema:
 *           type: string
 *         description: The project scope (e.g., Admin, Super Admin).
 *       - in: query
 *         name: pageLink
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional pageLink to filter metadata.
 *     responses:
 *       200:
 *         description: Metadata fetched successfully.
 *       500:
 *         description: Internal Server Error.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectFor: string | null = searchParams.get("projectFor");
    const pageLink: string | null = searchParams.get("pageLink");

    const query: { projectFor?: string | null; pageLink?: string | null } = {};

    if (projectFor && projectFor !== AdminEnum.SUPER_ADMIN) {
      query["projectFor"] = projectFor;
    }

    if (pageLink) {
      query["pageLink"] = pageLink;
    }

    const projectsFields = {
      deletedAt: 0,
      createdAt: 0,
      updatedAt: 0,
    };

    await connectToDatabase();
    const data = await MetaDataModel.find(query, { ...projectsFields });
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
 * /api/metadata/{id}:
 *   delete:
 *     tags: [MetaData]
 *     description: Delete metadata by marking it as deleted.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the metadata to delete.
 *     responses:
 *       200:
 *         description: Metadata deleted successfully.
 *       404:
 *         description: Metadata not found.
 *       500:
 *         description: Internal Server Error.
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const deletedMeta = await MetaDataModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { upsert: false, new: true }
    );

    if (!deletedMeta) {
      return NextResponse.json(
        { error: "Metadata not found" },
        { status: 404 }
      );
    }

    return jsonResponse(
      deletedMeta,
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
