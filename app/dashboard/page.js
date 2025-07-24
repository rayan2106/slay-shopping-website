"use client"
import React from 'react'

const dashboard = () => {

    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
        })
        const data = await res.json();
        if(res.ok){
            alert(data.message || "logout successful")
        }else{
            alert("????")
        }
    }

    return (
        <div className='min-h-screen bg-black mx-auto'>
            dashboard
            <button onClick={logout} className='bg-amber-500 cursor-pointer'>logout</button>
        </div>
    )
}

export default dashboard
