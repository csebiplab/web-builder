import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import SitemapModel, { ISitemap } from "@/models/sitemap.model";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Sitemap
 *   description: API endpoints for managing sitemap.xml records.
 */

/**
 * @swagger
 * /api/sitemap:
 *   get:
 *     tags: [Sitemap]
 *     description: Fetch all sitemap records.
 *     responses:
 *       200:
 *         description: A list of sitemap records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the sitemap record.
 *                   projectFor:
 *                     type: string
 *                     description: The project associated with the sitemap.
 *                   changefreq:
 *                     type: string
 *                     description: The change frequency.
 *                   loc:
 *                     type: string
 *                     description: The location.
 *                   priority:
 *                     type: number
 *                     description: The priority value.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation date of the record.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The last update date of the record.
 *       500:
 *         description: Server error.
 */
export async function GET() {
  try {
    await connectToDatabase();
    const data = await SitemapModel.find();

    return jsonResponse(
      data,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/sitemap:
 *   post:
 *     tags: [Sitemap]
 *     description: Add a new sitemap record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *                 description: The project associated with the sitemap.
 *               changefreq:
 *                 type: string
 *                 description: The change frequency.
 *               loc:
 *                 type: string
 *                 description: The location.
 *               priority:
 *                 type: number
 *                 description: The priority value.
 *     responses:
 *       201:
 *         description: Sitemap record created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
export async function POST(request: Request) {
  try {
    const payload: Omit<ISitemap, "_id" | "createdAt" | "updatedAt" | "deletedAt"> = await request.json();

    await connectToDatabase();
    const newSitemap = await SitemapModel.create(payload);

    return jsonResponse(
        newSitemap,
        responseMessageUtilities.message,
        responseMessageUtilities.create
      );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/sitemap:
 *   delete:
 *     tags: [Sitemap]
 *     description: Delete a sitemap record by marking it as deleted.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the sitemap record to delete.
 *     responses:
 *       200:
 *         description: Sitemap record deleted successfully.
 *       400:
 *         description: ID is required.
 *       404:
 *         description: Sitemap record not found.
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
    const deletedSitemap = await SitemapModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedSitemap) {
      return NextResponse.json({ error: "Sitemap record not found" }, { status: 404 });
    }

    return jsonResponse(
        deletedSitemap,
        responseMessageUtilities.message,
        responseMessageUtilities.success
      );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}