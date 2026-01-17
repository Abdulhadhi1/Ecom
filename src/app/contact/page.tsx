import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-gray-600 text-lg">
                        Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Cards */}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Email Us</h3>
                        <a href="mailto:support@estore.com" className="text-purple-600 hover:text-purple-700 font-medium">
                            support@estore.com
                        </a>
                        <p className="text-sm text-gray-500 mt-2">We&apos;ll reply within 24 hours</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-8 h-8 text-pink-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Call Us</h3>
                        <a href="tel:+1234567890" className="text-purple-600 hover:text-purple-700 font-medium">
                            +1 (234) 567-890
                        </a>
                        <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600">
                            123 E-Commerce Street<br />
                            Business District, City
                        </p>
                        <p className="text-sm text-gray-500 mt-2">State 12345</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Business Hours */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Business Hours</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700">Monday - Friday</span>
                                <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700">Saturday</span>
                                <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium text-gray-700">Sunday</span>
                                <span className="text-red-600 font-medium">Closed</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Note:</strong> Our customer support team typically responds to emails within 24 hours during business days.
                            </p>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Send className="w-6 h-6 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                                    placeholder="+1 (234) 567-890"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-gray-900"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
