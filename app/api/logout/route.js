import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
    const response = NextResponse.json({ message: 'logged out succesfully' }, { status: 200 })

    response.headers.set('Set-Cookie', serialize('token', '',
        {
            httpOnly: true,
            maxAge: 0,
            path: '/',
            sameSite: 'Strict',
            secure: false
        }))

    return response;
}