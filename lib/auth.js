import jwt from 'jsonwebtoken';
import User from '@/models/user';
import connectToDatabase from './mongoose';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function generateToken(email) {
    await connectToDatabase();

    const user = await User.findOne({email})

    if(!user){
        throw new Error('User not found')
    }

    const payload = {
        id: user._id.toString(),
        email: user.email
    }

    const token =  jwt.sign(payload, secret, { expiresIn: '1d' })
    return token;
}


