import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: LoginBody = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    const tokenPayload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
