import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import crypto from "crypto";

connect();

interface SignupBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password }: SignupBody = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    newUser.verifyToken = hashedToken;
    newUser.verifyTokenExpiry = new Date(Date.now() + 3600000);

    await newUser.save();

    await sendEmail({
      email,
      emailType: "VERIFY",
      token: verificationToken,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
