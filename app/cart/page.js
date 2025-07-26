"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, Heart, ArrowLeft, Weight, CreditCard, Truck } from 'lucide-react';
import { addtocart } from '@/lib/addtocart';


const page = () => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCheckingOut, setIsCheckingOut] = useState(false)

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

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // Simulate checkout process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would normally integrate with your payment processor
            // For now, we'll just show a success message
            alert("Checkout successful! Redirecting to order confirmation...");
            
            // You could redirect to order confirmation page here
            // Router.push("/order-confirmation");
        } catch (error) {
            console.error('Checkout error:', error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    }

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const finalTotal = subtotal + shippingCost + tax;

    if (loading) return <p>loading...</p>

    if (cart.length === 0) return <p className="text-lg min-h-screen flex items-center justify-center text-white">Your cart is empty.</p>;

   return (
  <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white'>
    {cart.map(({ product, quantity }) => (
      <div className='flex justify-center' key={product._id}>
        <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/50 transition mx-10 my-10 w-5/6'>
          <div className='flex pb-10'>
            <div className='mr-15'>
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                className="object-fit rounded-2xl"
              />
            </div>
            <div className='w-full'>
              <div className='flex justify-between'>
                <h3 className='text-3xl w-full flex wishlist-title'>{product.name}</h3>
                <button onClick={() => handleAddtoCart(product._id, "remove")} className='text-red-400 mx-5 cursor-pointer'>
                  <Trash2 size={28} />
                </button>
              </div>
              <div style={{ fontWeight: 500 }} className='my-5 flex gap-10 text-lg wishlist-title'>
                <div>Size:</div>
                <div>Color:</div>
              </div>
              <div className='flex justify-between'>
                <div className='flex justify-center items-center'>
                  <button className='bg-amber-600 rounded-full p-2 cursor-pointer'>
                    <Minus size={20} />
                  </button>
                  <div className='text-xl flex items-center justify-center mx-5'>{quantity}</div>
                  <button className='bg-amber-600 rounded-full p-2 cursor-pointer'>
                    <Plus size={20} />
                  </button>
                </div>
                <div>
                  <div className='text-xl font-bold wishlist-title'>₹{product.price}</div>
                  <div className='text-sm wishlist-title'>₹{product.price} each</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* Enhanced Total Section */}
    <div className='flex justify-center'>
      <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 w-[82%] max-w-8xl text-white my-20'>
        {/* Order Summary Header */}
        <div className='flex items-center gap-3 mb-6'>
          <ShoppingBag className='text-amber-500' size={28} />
          <h2 className='text-3xl font-bold'>Order Summary</h2>
        </div>

        {/* Items Count */}
        <div className='mb-6 p-4 bg-white/5 rounded-xl border border-white/5'>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-white'>{totalItems}</span> {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Price Breakdown */}
        <div className='space-y-4 mb-8'>
          <div className='flex justify-between items-center py-3 border-b border-white/10'>
            <span className='text-lg text-gray-300'>Subtotal ({totalItems} items)</span>
            <span className='text-xl font-semibold'>₹{subtotal}</span>
          </div>
          
          <div className='flex justify-between items-center py-3 border-b border-white/10'>
            <div className='flex items-center gap-2'>
              <Truck size={18} className='text-amber-500' />
              <span className='text-lg text-gray-300'>Shipping</span>
              {shippingCost === 0 && <span className='text-sm text-green-400 ml-2'>(Free)</span>}
            </div>
            <span className='text-xl font-semibold'>
              {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
            </span>
          </div>

          <div className='flex justify-between items-center py-3 border-b border-white/10'>
            <span className='text-lg text-gray-300'>Tax (GST 18%)</span>
            <span className='text-xl font-semibold'>₹{tax}</span>
          </div>

          {/* Free Shipping Banner */}
          {subtotal < 500 && (
            <div className='bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center'>
              <p className='text-amber-400'>
                Add ₹{500 - subtotal} more to get <span className='font-bold'>FREE SHIPPING</span>!
              </p>
            </div>
          )}
        </div>

        {/* Final Total */}
        <div className='flex justify-between items-center py-6 border-t-2 border-amber-500/30 mb-8'>
          <h3 className='text-2xl font-bold'>Total Amount</h3>
          <p className='text-4xl font-bold text-amber-500'>₹{finalTotal}</p>
        </div>

        {/* Checkout Button */}
        <div className='space-y-4'>
          <button 
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className='w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg hover:shadow-amber-500/25'
          >
            {isCheckingOut ? (
              <>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={24} />
                Proceed to Checkout
              </>
            )}
          </button>

          {/* Security Badge */}
          <div className='flex items-center justify-center gap-2 text-sm text-gray-400'>
            <div className='w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
              <div className='w-2 h-2 bg-white rounded-full'></div>
            </div>
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
export default page
