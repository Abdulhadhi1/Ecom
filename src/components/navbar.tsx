"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, LogOut, Settings, Mail, Phone } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isAdmin = session && (session.user as any)?.role === "ADMIN";

    return (
        <>
            {/* Top Contact Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <a href="mailto:support@estore.com" className="flex items-center gap-2 hover:opacity-80 transition">
                                <Mail className="w-4 h-4" />
                                <span className="hidden sm:inline">support@estore.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-2 hover:opacity-80 transition">
                                <Phone className="w-4 h-4" />
                                <span className="hidden sm:inline">+1 (234) 567-890</span>
                            </a>
                        </div>
                        <div className="text-xs hidden md:block">
                            Free shipping on orders over $50
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                            <ShoppingBag className="w-8 h-8 text-purple-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                E-Store
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-gray-700 hover:text-purple-600 transition font-medium">
                                Home
                            </Link>
                            <Link href="/categories" className="text-gray-700 hover:text-purple-600 transition font-medium">
                                Categories
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition font-medium">
                                Contact
                            </Link>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {session && (
                                <>
                                    {!isAdmin && (
                                        <span className="text-sm text-gray-600 hidden sm:block">
                                            Welcome, {session.user?.name}
                                        </span>
                                    )}
                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span className="hidden sm:inline">Admin Panel</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
