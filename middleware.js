import { NextResponse } from "next/server";
import { verifytoken } from "@/lib/auth-edge";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
    const token = request.cookies.get('token')?.value
    const verified = await verifytoken(token);

    console.log("Token:", token);
    console.log("Verified:", verified);

    const pathname = request.nextUrl.pathname;

    const isProtected = ['/dashboard', '/wishlist', '/cart'].some((path) => pathname.startsWith(path));

    if (isProtected && !verified) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/cart/:path*', '/wishlist/:path*'],
};