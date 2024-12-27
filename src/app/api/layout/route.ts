import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { jsonResponse } from "@/lib/response.utils";
import LayoutModel from "@/models/layout.mode";
import { NextRequest } from "next/server";

export async function GET() {
  await connectToDatabase();
  const layouts = await LayoutModel.find();
  return jsonResponse(
    layouts,
    responseMessageUtilities.message,
    responseMessageUtilities.success
  );
}

// API route handler
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { name, elements } = await req.json();

  if (
    !Array.isArray(elements) ||
    elements.some((el) => !el.type || !el.x || !el.y || !el.width || !el.height)
  ) {
    return new Response(JSON.stringify({ error: "Invalid elements data" }), {
      status: 400,
    });
  }

  const layout = await LayoutModel.create({ name, elements });
  return jsonResponse(
    layout,
    responseMessageUtilities.message,
    responseMessageUtilities.create
  );
}
