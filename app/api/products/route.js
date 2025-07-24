import connectToDatabase from "@/lib/mongoose";
import products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectToDatabase();
        const Products = await products.find({});
        return NextResponse.json(Products)
    }catch(err){
        return NextResponse.json({message : "server error", err}, {status: 500})
    }
} 