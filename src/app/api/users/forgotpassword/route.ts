import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "No user found with this email!" }, { status: 404 });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash it with SHA256 ✅
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Save to DB with expiry
        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000); // 1h expiry
        await user.save();

        // Send reset email with the raw token (not hashed)
        await sendEmail({
            email,
            emailType: "RESET",
            token: resetToken, // ✅ we send plain token, not hashed one
        });

        return NextResponse.json({ message: "Password reset email sent", success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
