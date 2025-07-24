import { verifytoken } from "@/lib/auth-edge";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Products from "@/models/products";

export async function GET(req) {
    const token = await req.cookies.get('token')?.value;
    const verified = await verifytoken(token);

    if (!verified) {
        return NextResponse.json({ message: "not verified" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(verified.id);
    if (!user) {
        return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    if (user.wishlist.length === 0) {
        return NextResponse.json({ message: "no wishlist items" }, { status: 404 });
    }

    const productids = user.wishlist.map(i => i.productId);
    const products = await Products.find({ _id: { $in: productids } }).lean();

    const wishlistproducts = user.wishlist.map(item => {
        const product = products.find(prod => prod._id.toString() === item.productId.toString());
        return {
            ...item.toObject(),
            product
        };
    });

    return NextResponse.json({ wishlist: wishlistproducts|| [] }, { status: 200 });
}
