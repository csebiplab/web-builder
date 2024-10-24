import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import { AdminEnum } from "@/models/role.model";
import SiteVerificationModel, {
  ISiteVerification,
} from "@/models/siteVerification.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   name: SiteVerification
 *   description: API for managing site verifications.
 */

/**
 * @swagger
 * /api/site-verification:
 *   post:
 *     tags: [SiteVerification]
 *     description: Add a new site verification.
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
 *       201:
 *         description: Site verification created successfully.
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
 *       500:
 *         description: Server error.
 */
export async function POST(request: Request) {
  try {
    const payload: Partial<ISiteVerification> = await request.json();
    await connectToDatabase();

    const data = await SiteVerificationModel.create(payload);

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
 * /api/site-verification:
 *   get:
 *     tags: [SiteVerification]
 *     description: Fetch all site verifications.
 *     parameters:
 *       - in: query
 *         name: projectFor
 *         required: false
 *         schema:
 *           type: string
 *         description: The project scope (e.g., Admin, Super Admin)
 *     responses:
 *       200:
 *         description: A list of site verifications.
 *       500:
 *         description: Server error.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectFor: string | null = searchParams.get("projectFor");

    const query: { projectFor?: string | null } = {};

    if (projectFor && projectFor !== AdminEnum.SUPER_ADMIN) {
      query["projectFor"] = projectFor;
    }

    const projectsFields = {
      deletedAt: 0,
      createdAt: 0,
      updatedAt: 0,
    };

    await connectToDatabase();
    const data: ISiteVerification[] = await SiteVerificationModel.find(query, {
      ...projectsFields,
    });

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
 * /api/site-verification:
 *   delete:
 *     tags: [SiteVerification]
 *     description: Delete a site verification by marking it as deleted.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the site verification to delete.
 *     responses:
 *       200:
 *         description: Site verification deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Site verification ID is required.
 *       404:
 *         description: Site verification not found.
 *       500:
 *         description: Server error.
 */
export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Site verification ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const deletedDoc = await SiteVerificationModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedDoc) {
      return NextResponse.json(
        { error: "Site verification not found" },
        { status: 404 }
      );
    }

    return jsonResponse(
      deletedDoc,
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
