"use client";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/user");
            const data = await res.json();
            if (res.ok) setUser(data.user);
        };
        fetchUser();
    }, []);

    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message || "Logout successful");
            window.location.href = "/login";
        } else {
            alert("Logout failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-10">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                        Welcome back, {user?.name || "User"} 👋
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Here's your personalized account dashboard.
                    </p>
                </div>

                {/* User Info Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold mb-4 text-amber-400">
                        Your Information
                    </h2>
                    <InfoRow label="👤 Name" value={user?.name || "N/A"} />
                    <InfoRow label="📧 Email" value={user?.email || "N/A"} />
                    <InfoRow label="📱 Phone" value={user?.phone || "Not Provided"} />
                    <InfoRow label="🏠 Address" value={user?.address || "Not Provided"} />
                </div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 px-6 rounded-xl text-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <p className="text-lg text-gray-200">
        <span className="font-medium text-white">{label}:</span> {value}
    </p>
);

export default Dashboard;
