import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import PageModel from "@/models/page.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectToDatabase();

  try {
    const { slug } = params;
    const page = await PageModel.findOne({ slug }).lean();

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return jsonResponse(
      page,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch the page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectToDatabase();

  try {
    const { slug } = params;
    const { title, sections } = await req.json();

    const updatedPage = await PageModel.findOneAndUpdate(
      { slug },
      { title, sections },
      { new: true, runValidators: true }
    );

    if (!updatedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return jsonResponse(
      updatedPage,
      responseMessageUtilities.message,
      responseMessageUtilities.success
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update the page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectToDatabase();

  try {
    const { slug } = params;
    const deletedPage = await PageModel.findOneAndDelete({ slug });

    if (!deletedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Page deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete the page" },
      { status: 500 }
    );
  }
}
