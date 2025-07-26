"use client"
import React, { useEffect, useState } from 'react'
import { addtocart } from '@/lib/addtocart'

const helpercomp = ({ productId }) => {
    const [IsInCart, setIsInCart] = useState(false)

    useEffect(() => {
        async function fetchcart() {
            try {
                const res = await fetch('/api/cart')
                const data = await res.json();
                console.log(data.cart)
                if (res.ok) {
                    const productids = data.cart.map(p => p.productId)
                    if(productids.includes(productId)){
                        setIsInCart(true)
                    }
                } else {
                    console.log('Failed to fetch the cart:', data.message)
                }
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        }
        fetchcart();
    }
        , [])

    const handleAddtoCart = async (productid, action) => {
        const res = await addtocart(productid, action, 1);
        if (res.success) {
            console.log("done")
        } else if (res.error) {
            console.log(res.message)
        }
    }



    return (
        <button onClick={() => {
            if (IsInCart) {
                handleAddtoCart(productId, "remove");
                setIsInCart(false);
            } else {
                handleAddtoCart(productId, "add");
                setIsInCart(true);
            }
        }}
            className={!IsInCart ? "bg-amber-600 hover:bg-amber-700 transition px-6 py-3 text-white font-semibold rounded-full" : "bg-white hover:bg-gray-300 transition px-6 py-3 text-black font-semibold rounded-full"}>
            {!IsInCart ? "Add to Cart 🛒" : "Added to Cart ✅"}
        </button>
    )
}

export default helpercomp
