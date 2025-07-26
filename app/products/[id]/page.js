import React from 'react'
import Product from '@/models/products'
import Link from 'next/link'
import { notFound } from "next/navigation"
import connectToDatabase from '@/lib/mongoose';
import Helpercomp from './helpercomp';


export default async function idPage({ params }) {

    const resolvedParams = await params;
    const id = resolvedParams.id;
    console.log(id)

    try {
        await connectToDatabase();
        const product = await Product.findById(id).lean()
        console.log(product)
        if (!product) {
            return notFound();
        }
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-10 text-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* IMAGE */}
                    <div className="rounded-xl overflow-hidden shadow-xl h-[550px]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight text-amber-500">
                            {product.name}
                        </h1>

                        <p className="text-xl text-white font-semibold">₹{product.price}</p>

                        <p className="text-gray-300">
                            {product.description || "This is one of our premium products made with high-quality materials and designed to elevate your street style."}
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-4 mt-6">
                            <Helpercomp productId={product._id.toString()} />
                            <button className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 font-semibold rounded-full">
                                Buy Now ⚡
                            </button>
                            
                        </div>

                        {/* Back to all products */}
                        <Link href="/products" className="block text-amber-400 hover:underline mt-10">
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        )
    } catch (err) {
        console.log("error", err)
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-10 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Product</h1>
                    <p className="text-gray-300 mb-6">Something went wrong while loading the product.</p>
                    <Link href="/products" className="text-amber-400 hover:underline">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

}
