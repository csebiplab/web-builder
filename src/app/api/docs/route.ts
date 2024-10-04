import { swaggerSpec } from "@/lib/swagger";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(swaggerSpec, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
