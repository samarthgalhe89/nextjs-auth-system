import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/helpers/mailer";

connect();

interface ResetEmailPayload {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email }: ResetEmailPayload = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email!" },
        { status: 404 }
      );
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token to user record
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    // Send reset email
    await sendEmail({
      email,
      emailType: "RESET",
      token: resetToken,
    });

    return NextResponse.json({
      message: "Password reset email sent",
      success: true,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
