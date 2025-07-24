import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { verifytoken } from "@/lib/auth-edge";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const token = await req.cookies.get('token')?.value;
        const verified = await verifytoken(token);
        if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { productId, action } = await req.json();

        await connectToDatabase();
        const user = await User.findById(verified.id);

        if (action === 'add') {
            const alreadyExists = user.wishlist.some(
                (item) => item.productId.toString() === productId.toString()
            );
            if (!alreadyExists) {
                user.wishlist.push({ productId });
            }
        } else if (action === 'remove') {
            user.wishlist = user.wishlist.filter(item => item.productId.toString() !== productId.toString());
        }

        await user.save();

        const isinwishlist = user.wishlist.some(
            (item) => item.productId.toString() === productId.toString()
        );

        return NextResponse.json({ success: true, wishlist: isinwishlist }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "not able to add" }, { status: 400 });
    }
}
