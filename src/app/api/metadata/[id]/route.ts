import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ObjectId } from "mongodb";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { connectToDatabase } from "@/lib/connectToDb";
import MetaDataModel, { IMetaData } from "@/models/metadata.model";


/**
 * @swagger
 * /api/metadata/{id}:
 *   patch:
 *     tags: [MetaData]
 *     description: Update a MetaData document by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the MetaData document.
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
 *       200:
 *         description: MetaData updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *       404:
 *         description: MetaData not found.
 *       500:
 *         description: Server error.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectToDatabase();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updateData: Partial<IMetaData> = await request.json();
    const data = await MetaDataModel.findByIdAndUpdate(id, updateData, {
      new: true,
      upsert: false,
    }).exec();

    if (!data) {
      return jsonResponse(
        null,
        responseMessageUtilities.message,
        responseMessageUtilities.notFound,
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
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/metadata/{id}:
 *   get:
 *     tags: [MetaData]
 *     description: Get a MetaData document by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the MetaData document.
 *     responses:
 *       200:
 *         description: MetaData fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     projectFor:
 *                       type: string
 *                     pageName:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     keywords:
 *                       type: string
 *                     pageLink:
 *                       type: string
 *       404:
 *         description: MetaData not found.
 *       500:
 *         description: Server error.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const data = await MetaDataModel.findById(id);

    if (!data) {
      return jsonResponse(
        null,
        responseMessageUtilities.message,
        responseMessageUtilities.notFound,
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
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
