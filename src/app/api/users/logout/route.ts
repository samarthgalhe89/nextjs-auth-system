import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Remove cookie (set it empty + expired)
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // immediately expire
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
