import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        if (!token) return NextResponse.json({ error: "Token is required" }, { status: 400 });

        // Hash incoming token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            verifyToken: hashedToken,
            verifyTokenExpiry: { $gt: new Date() } // token not expired
        });

        if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

        // Mark user as verified
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
