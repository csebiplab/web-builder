import { NextRequest, NextResponse } from "next/server";
import BlogModel, { IBlog } from "@/models/blog.model";
import convertToLink from "@/helpers/trimSpace";
import { connectToDatabase } from "@/lib/connectToDb";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog related operations
 */

/**
 * @swagger
 * /api/blog:
 *   get:
 *     tags: [Blog]
 *     description: Fetch all blogs.
 *     responses:
 *       200:
 *         description: A list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   projectFor:
 *                     type: string
 *                   blogTitle:
 *                     type: string
 *                   metaTitle:
 *                     type: string
 *                   customLink:
 *                     type: string
 *                   metaDescription:
 *                     type: string
 *                   metaKeywords:
 *                     type: string
 *                   shortDescription:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Server error.
 *   post:
 *     tags: [Blog]
 *     description: Add a new blog.
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
 *       201:
 *         description: Blog created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const payload: Omit<
      IBlog,
      "_id" | "createdAt" | "updatedAt" | "deletedAt"
    > = await request.json();

    const convertLink = convertToLink(payload?.customLink);

    await connectToDatabase();

    const data = await BlogModel.create({
      ...payload,
      customLink: convertLink,
    });

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

export async function GET() {
  try {
    await connectToDatabase();
    const data = await BlogModel.find();

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
 * /api/blog:
 *   delete:
 *     tags: [Blog]
 *     description: Delete a blog by marking it as deleted.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog to delete.
 *     responses:
 *       200:
 *         description: Blog deleted successfully.
 *       400:
 *         description: Blog ID is required.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Server error.
 */

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const deletedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { upsert: false, new: true }
    );

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return jsonResponse(
      deletedBlog,
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
