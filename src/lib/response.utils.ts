import { NextResponse } from "next/server";
import { responseMessageUtilities } from "./response.message.utility";

interface JsonResponseOptions {
  status?: number;
}

export const jsonResponse = (
  data: any,
  message: string = responseMessageUtilities.message,
  statusCode: number = responseMessageUtilities.success,
  options?: JsonResponseOptions
) => {
  const response = {
    message,
    data,
    statusCode,
  };

  return NextResponse.json(response, {
    status: statusCode,
    ...options,
  });
};
