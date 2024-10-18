import { join } from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

/**
 * @swagger
 * tags:
 *   name: Get File
 *   description: Get upload files.
 */

/**
 * @swagger
 * /api/uploads/{path*}:
 *   get:
 *     tags: [Get File]
 *     description: Retrieves a file from the server based on the provided path.
 *     parameters:
 *       - name: path
 *         in: path
 *         required: true
 *         description: The path to the file.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File retrieved successfully.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { path } = params;
  const filePath = join("/", "uploads", ...path);

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
}
