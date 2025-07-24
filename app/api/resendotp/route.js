import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { verifyEmail } from '@/lib/sendemail';

export async function POST(req) {
  await connectToDatabase();

  try {
    const { email } = await req.json();
    console.log(email)

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }


    const newOtp = Math.floor(100000 + Math.random() * 900000); 
    const otpExpires = Date.now() + 1000 * 60 * 5; 


    user.otp = newOtp;
    user.otpExpires = otpExpires;
    user.verified = false;
    await user.save();

    await verifyEmail(email, newOtp)

    return NextResponse.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
