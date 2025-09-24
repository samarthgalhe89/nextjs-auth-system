import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const { token, newPassword } = await request.json();
        if (!token || !newPassword) return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });

        // Hash incoming token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid reset token
        const user = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: { $gt: new Date() }
        });

        if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

        // Hash new password
        user.password = await bcrypt.hash(newPassword, 10);

        // Clear reset token fields
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successfully", success: true });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
