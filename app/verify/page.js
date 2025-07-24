"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'


const page = () => {
    const [Otp, setOtp] = useState("")
    const [email, setemail] = useState("")
    const router = useRouter();


    useEffect(() => {
        const storedEmail = localStorage.getItem("verifyemail");
        if (storedEmail) {
            setemail(storedEmail);
        }
    }, []);

    const handleverify = async () => {
        console.log(email)
        console.log(Otp)
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ otp: Otp, email }),

        })
        const data = await res.json();

        if (res.ok) {
            alert(data.message)
            router.push('/home')
        } else {
            alert(data.message || "registration failed")
        }

    }
    const resendverify = async () => {
        console.log(email)
        console.log(Otp)
        const res = await fetch("/api/resendotp", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ email }),

        })
        const data = await res.json();

        if (res.ok) {
            alert(data.message || "otp sent successfully")
        } else {
            alert(data.message || "registration failed")
        }

    }

    return (<div className=" p-10 min-h-screen max-w-md py-50 mx-auto">
        <div className='bg-gray-700 py-20 px-10 rounded-2xl'>
            <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
            <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 w-full mb-4 bg-gray-800"
            />
            <button
                onClick={handleverify}
                className="bg-blue-600 text-white p-2 w-full rounded cursor-pointer"
            >
                Verify
            </button>
            <div onClick={resendverify} className='text-blue-400 cursor-pointer py-2'>resend otp?</div>
        </div>
    </div>
    );

}

export default page
