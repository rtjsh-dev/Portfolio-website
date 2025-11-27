import { NextResponse } from "next/server";

export function handleError(error: unknown) {

  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Something went wrong" },
    { status: 500 }
  );
}