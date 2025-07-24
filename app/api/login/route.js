import connectToDatabase from '@/lib/mongoose';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(req) {
    await connectToDatabase();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ message: 'email is not registered' }, { status: 401 })
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password)

    if (!ispasswordvalid) {
        return NextResponse.json({ message: 'invalid password' }, { status: 401 })
    }
    const token = await generateToken(email)

    const response = NextResponse.json({ message: 'login succesful' }, { status: 200 })
    response.headers.set('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'Strict',
        secure: false
    }));

    return response;
}