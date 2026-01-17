"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, LogOut, Settings, Mail, Phone, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ siteName = "E-Store" }: { siteName?: string }) {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isAdmin = session && (session.user as any)?.role === "ADMIN";

    // Close menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/categories" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            {/* Top Contact Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <a href="mailto:support@estore.com" className="flex items-center gap-2 hover:opacity-80 transition">
                                <Mail className="w-4 h-4" />
                                <span>support@estore.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-2 hover:opacity-80 transition">
                                <Phone className="w-4 h-4" />
                                <span>+1 (234) 567-890</span>
                            </a>
                        </div>
                        <div className="text-xs">
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
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition z-50" onClick={() => setIsMenuOpen(false)}>
                            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {siteName}
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 hover:text-purple-600 transition font-medium relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Desktop Actions */}
                            <div className="hidden md:flex items-center gap-4">
                                {session ? (
                                    <>
                                        {isAdmin ? (
                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium"
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span>Admin Panel</span>
                                            </Link>
                                        ) : (
                                            <span className="text-sm text-gray-600">
                                                Hi, {session.user?.name?.split(' ')[0]}
                                            </span>
                                        )}
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition font-medium"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition z-50"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 md:hidden"
                            />

                            {/* Menu Panel */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col"
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-2 mb-8 mt-12">
                                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            {siteName}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-purple-50 rounded-xl text-gray-900 font-semibold transition group"
                                            >
                                                {link.name}
                                                <div className="w-2 h-2 rounded-full bg-purple-600 opacity-0 group-hover:opacity-100 transition"></div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-gray-100">
                                        {session ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                                                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                                                        {session.user?.name?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{session.user?.name}</p>
                                                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                                                    </div>
                                                </div>
                                                {isAdmin && (
                                                    <Link
                                                        href="/admin"
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 p-4 text-purple-600 font-bold hover:bg-purple-50 rounded-xl transition"
                                                    >
                                                        <Settings className="w-5 h-5" />
                                                        Admin Panel
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        signOut({ callbackUrl: "/" });
                                                    }}
                                                    className="flex items-center gap-3 p-4 w-full text-red-600 font-bold hover:bg-red-50 rounded-xl transition text-left"
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                    Logout
                                                </button>
                                            </div>
                                        ) : (
                                            <Link
                                                href="/login"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center justify-center gap-3 p-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg transition active:scale-95"
                                            >
                                                <User className="w-5 h-5" />
                                                Login / Sign Up
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
