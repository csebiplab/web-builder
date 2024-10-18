import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// Define the type for formData's image field
interface ImageData {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
}

/**
 * @swagger
 * /api/upload-img:
 *   post:
 *     tags: [File upload and retrive]
 *     description: Uploads an image file and returns the URL where it is stored.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: No image provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as ImageData;

    if (!image) {
      return NextResponse.json(
        { error: "No image provided." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date()
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join("/", "uploads", relativeUploadDir);
    const imageName = `${Date.now()}-${image.name}`;
    const imageUrl = join(relativeUploadDir, imageName);
    const imagePath = join(uploadDir, imageName);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    await writeFile(imagePath, buffer);
    return NextResponse.json(
      { name: imageName, url: `/api/uploads${imageUrl}` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during file upload:\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
