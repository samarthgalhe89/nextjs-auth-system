import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findById(userId).select("-password -isAdmin");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User found!",
      data: user,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
