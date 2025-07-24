import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { generatetoken } from "@/lib/auth";
import { serialize } from 'cookie';

export async function POST(req) {
    try {
        await connectToDatabase();
        console.log("connected to database")

        const body = await req.json();
        const { email, otp } = body;
        console.log(body)
        console.log(otp)

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }
        if(user.verified){
            return NextResponse.json({ message: "user is already verified" }, { status: 400 })
        }

        console.log(user.otp)
        if (String(user.otp) !== String(otp) || user.otpExpires < Date.now()) {
            return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
        }

        user.verified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        console.log('consoled')

        const token = generatetoken( email )
        
        const response = NextResponse.json({ message: 'SignIn and Login successful' }, { status: 200 })
        response.headers.set('Set-Cookie', serialize('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: '/',
            sameSite: 'Strict',
            secure: false
        }));
        
        return response;
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}