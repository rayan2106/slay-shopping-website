"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, Heart, ArrowLeft, Weight } from 'lucide-react';
import { addtocart } from '@/lib/addtocart';


const page = () => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchcart() {
            try {
                const res = await fetch('/api/cart')
                const data = await res.json();
                
                if (res.ok) {
                    setCart(data.cart)
                    console.log(data)
                    console.log(cart)
                } else {
                    console.log('Failed to fetch the cart:', data.message)
                }
            } catch (err) {
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchcart();
    }
        , [])

    const handleAddtoCart = async (productid, action) => {
        const res = await addtocart(productid, action, 1);
        console.log(res)
        if (res.success) {
            const cartRes = await fetch('/api/cart');
            const cartData = await cartRes.json();
            setCart(cartData.cart);
        } else if (res.error) {
            alert("You are not logged in!");
            Router.push("/login");
        } 
    }


    if (loading) <p>loading...</p>

    if (cart.length === 0) return <p className="text-lg min-h-screen flex items-center justify-center text-white">Your cart is empty.</p>;


    return (

        <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white '>
            {cart.map(({ product, quantity }) => {
                return (
                    <div className='flex justify-center' key={product._id}>
                        <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/50 transition mx-10 my-10 w-5/6'>
                            <div className='flex pb-10 '>
                                <div className='mr-15'>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={150}
                                        height={150}
                                        className="object-fit rounded-2xl" />

                                </div>
                                <div className='w-full'>
                                    <div className='flex justify-between'>
                                        <h3 className='text-3xl w-full flex wishlist-title'>{product.name}</h3>
                                        <button onClick={() => { handleAddtoCart(product._id, "remove") }} className='text-red-400 mx-5 cursor-pointer'><Trash2 size={28} /> </button>
                                    </div>
                                    <div style={{ fontWeight: 500 }} className='my-5 flex gap-10 text-lg wishlist-title'>
                                        <div >Size:</div>
                                        <div >Color:</div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex justify-center items-center'>
                                            <button className='bg-amber-600 rounded-full p-2 cursor-pointer'> <Minus size={20} /></button>
                                            <div className='text-xl flex items-center justify-center mx-5'> {quantity}</div>
                                            <button className='bg-amber-600 rounded-full p-2 cursor-pointer'> <Plus size={20} /></button>
                                        </div>
                                        <div >
                                            <div className='text-xl font-bold wishlist-title'>{product.price}</div>
                                            <div className='text-sm wishlist-title'>{product.price}each</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
export default page
