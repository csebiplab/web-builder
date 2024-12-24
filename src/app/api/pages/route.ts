import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectToDb";
import PageModel from "@/models/page.model";
import { jsonResponse } from "@/lib/response.utils";
import { responseMessageUtilities } from "@/lib/response.message.utility";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { title, slug, sections } = await req.json();

    if (!title || !slug || !Array.isArray(sections)) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const page = new PageModel({ title, slug, sections });
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
