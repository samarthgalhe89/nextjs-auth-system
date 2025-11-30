import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

connect();

interface ResetPasswordBody {
  token: string;
  newPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword }: ResetPasswordBody = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
