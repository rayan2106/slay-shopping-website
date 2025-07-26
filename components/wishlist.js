"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch('/api/wishlist');
                const data = await res.json();
                if (data.wishlist) {
                    setProducts(data.wishlist);
                    console.log(data.wishlist)
                } else {
                    console.log(data.message);
                }
            } catch (err) {
                console.log("Error fetching wishlist:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    if (loading)
        return <p className="text-white text-lg min-h-screen flex items-center justify-center">Loading...</p>;

    if (products.length === 0)
        return <p className="text-white text-lg min-h-screen flex items-center justify-center">Your wishlist is empty.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="mx-5 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map(({ product }) => (
                    <div key={product._id} className="bg-white/10 border border-white/20 rounded-3xl p-4 shadow-xl backdrop-blur-md hover:scale-[1.03] hover:shadow-amber-500/30 transition-transform duration-300 my-10">
                        <div className="overflow-hidden rounded-2xl h-[300px] sm:h-[350px]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover rounded-2xl hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="mt-3 text-white px-2">
                            <h1 className="text-2xl font-bold">{product.brand}</h1>
                            <h2 className="text-lg my-2 tracking-wide hover:text-amber-400 transition">
                                {product.name}
                            </h2>
                            <p className="text-lg font-semibold text-amber-500 mt-1">₹{product.price}</p>
                            <div className="flex justify-between items-end">
                                <Link
                                    href={`/products/${product._id}`}
                                    className="inline-block mt-4 text-sm bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full text-white font-semibold transition"
                                >
                                    View Product →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
