import connectToDatabase from '@/lib/mongoose';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { verifyEmail } from '@/lib/sendemail';

export async function POST(req) {
    await connectToDatabase();
    console.log("connected to database")


    try {
        const body = await req.json();
        console.log(body)

        const { name, email, password } = body;

        const existinguser = await User.findOne({ email });

        console.log(existinguser)
        if (existinguser.verified) {
            return NextResponse.json({ message: "user already exists" }, { status: 400 })
        }else{
            await User.deleteOne({email})
        }

        const hashedpass = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExprires = new Date(Date.now + 5 * 60 * 1000)

        const newUser = new User({
            name,
            email,
            password: hashedpass,
            verified: false,
            otp,
            otpExprires,
        })
        console.log(newUser)
        await newUser.save();
        
        await verifyEmail(email, otp);

        return NextResponse.json({ message: "OTP sent to email", email }, { status: 201 });

        
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "server error" }, { status: 500 })
    }


}


