"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {

    const [dropdown, setdropdown] = useState(false)

    const toggle = () => {
        setdropdown(!dropdown)
    }

    return (
        <>
            <div className='bg-[#ff6106] w-[1690px]'>
                <div className='flex items-center justify-between h-18 mx-10'>
                    <Link href={'/products'} className='cursor pointer'>
                        <div className='text-4xl font-display text-black mx-10 cursor-pointer'>SLAY!!!</div>
                    </Link>
                    <ul className='flex w-1/2 gap-10 [&>*:not(:first-child)]:pt-2'>
                        <li className='searchbar flex bg-black w-[100%] justify-center items-center border-3 border-black rounded-full px-4 py-1'>
                            <input type="text" placeholder='search' className="bg-black text-white text-xl w-full px-4 py-1 rounded-full focus:outline-none  transition-all" />
                            <div className="h-8 mr-4 w-0.5 bg-[#f8f6f4]"></div>
                            <svg className='cursor-pointer' fill='#ff6106' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                <path d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
                            </svg>

                        </li>
                        <li className='wishlist'>
                            <Link href={"/wishlist"}><svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                            </Link>
                        </li>
                        <li className='dashboard'>
                            <Link href="/dashboard">
                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" /></svg>
                            </Link>
                        </li>
                        <li className='cart'>
                            <Link href={"/cart"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide invert cursor-pointer lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='h-1 w-full bg-black mt-1'></div>

                <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${dropdown ? 'max-h-40 py-2' : 'max-h-0 py-0'}  bg-black w-full`}
                >
                    <div className="w-full mx-15 flex justify-around items-center text-white text-xl">
                        <div className='cursor-pointer'>Men</div>
                        <div className="h-8 w-0.5 bg-[#ff6106]"></div>
                        <div className='cursor-pointer'>Women</div>
                        <div className="h-8 w-0.5 bg-[#ff6106]"></div>
                        <div className='cursor-pointer'>Accessories</div>
                        <div className="h-8 w-0.5 bg-[#ff6106]"></div>
                        <div className='cursor-pointer'>Watches</div>
                        <div className="h-8 w-0.5 bg-[#ff6106]"></div>
                        <div className='cursor-pointer'>Footwear</div>
                    </div>
                </div>



                <div className='relative'></div>
                <div className='h-6 w-15 bg-black flex justify-center absolute z-10' onClick={toggle}><svg className={`invert w-6 h-6 cursor-pointer transition-transform duration-200 ${dropdown ? 'rotate-180' : 'rotate-0'}`} name='up' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg></div>
            </div>
        </>
    )
}
export default Navbar
