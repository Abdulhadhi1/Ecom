import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <ShoppingBag className="w-8 h-8 text-purple-500" />
                            <span className="text-2xl font-bold text-white">E-Store</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your trusted online shopping destination for quality products at great prices.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-purple-400 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-purple-400 transition">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-purple-400 transition">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-purple-400 transition">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/shipping" className="hover:text-purple-400 transition">
                                    Shipping Information
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-purple-400 transition">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-purple-400 transition">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-purple-400 transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-purple-400 transition">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <a href="mailto:support@estore.com" className="hover:text-purple-400 transition">
                                        support@estore.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <a href="tel:+1234567890" className="hover:text-purple-400 transition">
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-400">Address</p>
                                    <p>123 E-Commerce Street<br />Business District, City<br />State 12345</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} E-Store. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="hover:text-purple-400 transition">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-purple-400 transition">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="hover:text-purple-400 transition">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
