import { NextResponse } from "next/server";
import { verifytoken } from "@/lib/auth";

export async function GET(req){
    const token = req.cookies.get('token')?.value
    const user = verifytoken(token);

    if(!verified){
        return NextResponse.json({message: 'unauthorized'} , {status: 401})
    }

    return NextResponse.json({message: 'Hello' + user.email})
}