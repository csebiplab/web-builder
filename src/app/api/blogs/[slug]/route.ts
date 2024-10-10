import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import BlogModel, { IBlog } from "@/models/blog.model";
import convertToLink from "@/helpers/trimSpace";
import { jsonResponse } from "@/lib/response.utils";
import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";

/**
 * @swagger
 * /api/blog/{slug}:
 *   patch:
 *     tags: [Blog]
 *     description: Update blog information.
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID or custom link of the blog to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectFor:
 *                 type: string
 *               blogTitle:
 *                 type: string
 *               metaTitle:
 *                 type: string
 *               customLink:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               metaKeywords:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Server error.
 */

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const updateFields: Partial<IBlog> = await request.json();

    await connectToDatabase();

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      slug,
      {
        ...updateFields,
        customLink: updateFields.customLink
          ? convertToLink(updateFields.customLink)
          : undefined,
      },
      { new: true, upsert: false }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return jsonResponse(
      updatedBlog,
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
 * /api/blog/{slug}:
 *   get:
 *     tags: [Blog]
 *     description: Fetch a single blog by ID or custom link.
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID or custom link of the blog to fetch.
 *     responses:
 *       200:
 *         description: Blog retrieved successfully.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Server error.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let blogData;
    if (ObjectId.isValid(slug)) {
      blogData = await BlogModel.findById(slug);
    } else {
      blogData = await BlogModel.findOne({ customLink: slug });
    }

    if (!blogData) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return jsonResponse(
      blogData,
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
