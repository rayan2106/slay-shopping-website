import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { verifytoken } from "@/lib/auth-edge";
import User from "@/models/user";

export async function PUT(req) {
    try {
        await connectToDatabase();
        const token = req.cookies.get("token")?.value;
        const verified = await verifytoken(token);
        if (!verified) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const updated = await User.findByIdAndUpdate(
            verified.id,
            {
                name: body.name,
                phone: body.phone,
                address: body.address,
            },
            { new: true }
        ).lean();

        return NextResponse.json({ user: updated });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}