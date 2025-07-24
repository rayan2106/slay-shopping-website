"use client"
import React from "react"
import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/register')
  }

  return( <div className="h-[1100px] bg-amber-400 pt-10">
    <div className="w-[1690px] h-[1000px] flex flex-col items-center justify-center ">
      <div className="">
        <img className="w-[1400px] h-[800px]" src="homescreen.png" ></img>
        <button onClick={handleClick} className="bg-black text-white px-15 py-5 my-5 font-bold cursor-pointer">Shop Now</button>
      </div>
    </div>
  </div>)
}
