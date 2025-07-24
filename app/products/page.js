"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, Weight } from 'lucide-react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addtocart } from '@/lib/addtocart';
import { addtowishlist } from '@/lib/addtowishlist';
import { useRouter } from 'next/navigation';

const productsPage = () => {
    const Router = useRouter();
    const [products, setproducts] = useState([])
    const [cartitems, setCartitems] = useState([])
    const [ClickedIds, setClickedIds] = useState([])
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        const fetchcart = async () => {
            try {
                const res = await fetch("/api/cart")
                const data = await res.json()
                if (res.ok) {
                    setCartitems(data.cart)
                } 
            } catch (err) {
                console.error("Failed to load cart", err);
            }
        }
        fetchcart();
    }, [])

    useEffect(() => {
        const fetchwishlist = async () => {
            try {
                const res = await fetch("/api/wishlist")
                const data = await res.json()
                if (res.ok && Array.isArray(data.wishlist)) {
                    setWishlist(data.wishlist)
                }
            } catch (err) {
                console.error("Failed to load wishlist", err);
            }
        }
        fetchwishlist();
    }, [])

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setproducts(data)
            })
            .catch(console.error)
    }, [])

    const handleAddtoCart = async (productid) => {
        setClickedIds(prev => [...prev, productid]);
        const res = await addtocart(productid, 'add', 1);
        if (res.success) {
            // setting cart items which were not there before
            setCartitems(prev => {
                if (!prev.some(item => item.productId === productid)) {
                    return [...prev, { productId: productid }];
                }
                return prev;
            })
        } else if (res.error) {
            alert("You are not logged in!");
            Router.push("/login");
        }
    }

    const handleAddtowishlist = async (productid) => {
        const isAlreadyWishlisted = wishlist?.some(item => item.productId === productid)
        if (isAlreadyWishlisted) {
            const res = await addtowishlist(productid, 'remove');
            if (res.success) {
                setWishlist(prev => prev.filter(item => item.productId !== productid));
            }
        } else {
            const res = await addtowishlist(productid, 'add');
            if (res.success) {
                setWishlist(prev => [...prev, { productId: productid }]);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-10">
            <h1 className="text-4xl font-extrabold text-amber-500 mb-10 text-center tracking-wider">
                🔥 Our Trendy Picks 🔥
            </h1>

            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                    const isInCart = cartitems.some(item => item.productId === product._id);
                    const isclicked = ClickedIds.includes(product._id)
                    const isinwishlist = wishlist?.some(item => item.productId === product._id)

                    return (
                        <div
                            key={product._id}
                            className="bg-white/10 border border-white/20 rounded-3xl p-4 shadow-xl backdrop-blur-md hover:scale-[1.03] hover:shadow-amber-500/30 transition-transform duration-300"
                        >
                            <div className="overflow-hidden rounded-2xl h-[300px] sm:h-[350px]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover rounded-2xl hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            <div className="mt-3 text-white px-2">
                                <h1 className='text-2xl font-sans font-bold'>{product.brand}</h1>
                                <h2 className="text-lg my-2 font-sans tracking-wide hover:text-amber-400 transition">
                                    {product.name}
                                </h2>
                                <p className="text-lg font-semibold text-amber-500 mt-1">₹{product.price}</p>
                            </div>

                            <div className='h-12 my-2 flex items-center justify-between'>
                                <div className='flex justify-center items-center'>
                                    <Link
                                        href={`/products/${product._id}`}
                                        className="inline-block text-sm bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full text-white font-semibold transition"
                                    >
                                        View Product →
                                    </Link>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <div>
                                        <button
                                            onClick={() => handleAddtoCart(product._id)}
                                            className={`p-3 rounded-full transition mr-2  ${isInCart || isclicked ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 cursor-pointer'}`}
                                            disabled={isInCart || isclicked}
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className='bg-white rounded-full p-2'
                                            onClick={() => handleAddtowishlist(product._id)}
                                        >
                                            {isinwishlist ? (
                                                <AiFillHeart className="text-amber-700 cursor-pointer" size={22} />
                                            ) : (
                                                <AiOutlineHeart className="text-black" size={22} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default productsPage
