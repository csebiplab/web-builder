import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import SiteVerificationModel from "@/models/siteVerification.model";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/site-verification/{id}:
 *   patch:
 *     tags: [SiteVerification]
 *     description: Update a site verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the site verification to update.
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
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Site verification updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Site verification not found.
 *       500:
 *         description: Server error.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;
    const updateData = await request.json();

    const data = await SiteVerificationModel.findByIdAndUpdate(id, updateData, {
      new: true,
      upsert: false,
    });

    if (!data) {
      return NextResponse.json(
        { error: "Site verification not found" },
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
 * /api/site-verification/{id}:
 *   get:
 *     tags: [SiteVerification]
 *     description: Fetch a single site verification by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the site verification to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Site verification retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Site verification not found.
 *       500:
 *         description: Server error.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;
    const data = await SiteVerificationModel.findById(id);

    if (!data) {
      return NextResponse.json(
        { error: "Site verification not found" },
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
