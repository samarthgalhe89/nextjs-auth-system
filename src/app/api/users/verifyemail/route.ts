import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

connect();

interface VerifyEmailBody {
  token: string;
}

export async function POST(request: NextRequest) {
  try {
    const { token }: VerifyEmailBody = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // Hash the incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with matching token + unexpired
    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update verification status
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
