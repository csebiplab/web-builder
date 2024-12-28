import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectToDb";
import PageModel from "@/models/page.model";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { title, slug, designData } = await req.json();

    if (!title || !slug || !Array.isArray(designData)) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const page = new PageModel({
      title,
      slug,
      designData,
    });

    await page.save();

    return jsonResponse(
      page,
      responseMessageUtilities.message,
      responseMessageUtilities.create
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create the page" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const page = await PageModel.find({});

    return jsonResponse(
      page,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Request Failed" }, { status: 500 });
  }
}
