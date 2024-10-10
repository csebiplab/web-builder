import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import SitemapModel, { ISitemap } from "@/models/sitemap.model";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/sitemap/{id}:
 *   get:
 *     tags: [Sitemap]
 *     description: Fetch a single sitemap record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sitemap record to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single sitemap record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the sitemap record.
 *                 projectFor:
 *                   type: string
 *                   description: The project associated with the sitemap.
 *                 changefreq:
 *                   type: string
 *                   description: The change frequency.
 *                 loc:
 *                   type: string
 *                   description: The location.
 *                 priority:
 *                   type: number
 *                   description: The priority value.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the record.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update date of the record.
 *       404:
 *         description: Sitemap record not found.
 *       500:
 *         description: Server error.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const data = await SitemapModel.findById(params.id);

    if (!data) {
      return NextResponse.json(
        { error: "Sitemap record not found" },
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
 * /api/sitemap/{id}:
 *   patch:
 *     tags: [Sitemap]
 *     description: Update a sitemap record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sitemap record to update.
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
 *       200:
 *         description: Sitemap record updated successfully.
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
 *                       description: The ID of the sitemap record.
 *                     projectFor:
 *                       type: string
 *                       description: The project associated with the sitemap.
 *                     changefreq:
 *                       type: string
 *                       description: The change frequency.
 *                     loc:
 *                       type: string
 *                       description: The location.
 *                     priority:
 *                       type: number
 *                       description: The priority value.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The creation date of the record.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The last update date of the record.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Sitemap record not found.
 *       500:
 *         description: Server error.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload: Partial<ISitemap> = await request.json();

    await connectToDatabase();
    const updatedSitemap = await SitemapModel.findByIdAndUpdate(
      params.id,
      payload,
      { new: true }
    );

    if (!updatedSitemap) {
      return NextResponse.json(
        { error: "Sitemap record not found" },
        { status: 404 }
      );
    }

    
    return jsonResponse(
        updatedSitemap,
        responseMessageUtilities.message,
        responseMessageUtilities.success
      );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
