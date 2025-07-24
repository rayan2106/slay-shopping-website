"use client"
import React from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, Heart, ArrowLeft, Weight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { addtocart } from '@/lib/addtocart';

const page = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        try {
            const fetchcart = async () => {
                const res = await fetch('/api/wishlist')
                const data = await res.json();
                if(data.wishlist){
                    setProducts(data.wishlist)
                }else{
                    console.log(data.message)
                }
            }
            fetchcart();
        } catch (err) {
            console.log(err, "error")
        } finally {
            setLoading(false)
        }
    }, [])

   

    if (loading) <p>loading...</p>

    if (products.length === 0 ) return <p className="text-lg min-h-screen flex items-center justify-center text-white">Your wishlist is empty.</p>;

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
                <div className="mx-5 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.isArray(products) && products.map(({ product }) => {
                        return (
                            < div key={product._id} className="bg-white/10 border border-white/20 rounded-3xl p-4 shadow-xl backdrop-blur-md hover:scale-[1.03] hover:shadow-amber-500/30 transition-transform duration-300 my-10"
                            >
                                <Link href={`/products/${product.id}`}>
                                    <div className="overflow-hidden rounded-2xl h-[300px] sm:h-[350px]">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover rounded-2xl hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>

                                <div className="mt-3 text-white px-2">
                                    <h1 className='text-2xl font-sans font-bold'>
                                        {product.brand}
                                    </h1>
                                    <h2 className="text-lg my-2 font-sans tracking-wide hover:text-amber-400 transition">
                                        {product.name}
                                    </h2>
                                    <p className="text-lg font-semibold text-amber-500 mt-1">
                                        ₹{product.price}
                                    </p>
                                    <div className='flex items-end justify-between'>
                                        <div className='flex justify-between'>
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="inline-block mt-4 text-sm bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full text-white font-semibold transition"
                                            >
                                                View Product →
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>)
                    })}
                </div>

            </div>
        </div >
    )
}

export default page
