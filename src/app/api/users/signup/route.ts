import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import crypto from 'crypto';

connect();

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isVerified: false
        });

        // Generate raw verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        // Hash token for DB storage
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        // Save hashed token + expiry
        newUser.verifyToken = hashedToken;
        newUser.verifyTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        await newUser.save();

        // Send raw token via email
        await sendEmail({ email, emailType: "VERIFY", token: verificationToken });

        return NextResponse.json({ message: "User created successfully", success: true });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
