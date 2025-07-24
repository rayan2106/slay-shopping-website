"use client"
import React, { useEffect, useState } from 'react'
import { addtocart } from '@/lib/addtocart'

const helpercomp = () => {
    const [isclicked, setisclicked] = useState(false)

    useEffect(() => {
        async function fetchcart() {
            try {
                const res = await fetch('/api/cart')
                const data = await res.json();
                console.log(data.cart)
                if (res.ok) {
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

    const handleAddtoCart = async (productid) => {
        const res = await addtocart(productid, 'add', 1);
        if (res.success) {
            setisclicked(true)
        } else if (res.error) {
            alert("You are not logged in!");
            Router.push("/login");
        }
    }


    return (
        <button onClick={() => { handleAddtoCart() }} className={isclicked ? "bg-amber-600 hover:bg-amber-700 transition px-6 py-3 text-white font-semibold rounded-full" : "bg-white hover:bg-gray-300 transition px-6 py-3 text-white font-semibold rounded-full"}>
            {isclicked ? "Add to Cart 🛒" : "Added to Cart 🛒"}
        </button>
    )
}

export default helpercomp
