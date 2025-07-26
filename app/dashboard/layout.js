'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Orders", href: "/dashboard/orders" },
        { label: "Wishlist", href: "/dashboard/wishlist" },
        { label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-80 bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 space-y-8 rounded-r-2xl shadow-xl my-10">
                <div className="space-y-1 w-60">
                    <h2 className="text-2xl font-bold tracking-tight">Welcome</h2>
                    <p className="text-sm text-gray-400">Your personal dashboard</p>
                </div>

                <nav className="flex flex-col space-y-3 text-base font-medium w-70">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-amber-600 text-white font-semibold shadow-inner"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-10">
                    <button className="w-full text-left font-semibold text-gray-300 hover:text-red-400 transition-colors">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto">
                {children}
            </main>
        </div>
    );
}


