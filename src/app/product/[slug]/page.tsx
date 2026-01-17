import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowLeft, ShoppingCart } from "lucide-react";

async function getProduct(slug: string) {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
        },
    });

    return product;
}

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    const imageUrls = product.images ? product.images.split(",").filter(Boolean) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href={`/category/${product.category.slug}`}
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to {product.category.name}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Image Gallery */}
                    <div className="lg:col-span-5 space-y-4">
                        {imageUrls.length > 0 ? (
                            <>
                                <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
                                    <img
                                        src={imageUrls[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {imageUrls.length > 1 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {imageUrls.slice(1, 5).map((url, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg"
                                            >
                                                <img
                                                    src={url}
                                                    alt={`${product.name} ${index + 2}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="aspect-square rounded-2xl bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No image available</span>
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="mb-4">
                            <Link
                                href={`/category/${product.category.slug}`}
                                className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full hover:bg-purple-200 transition"
                            >
                                {product.category.name}
                            </Link>
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            {product.name}
                        </h1>

                        <div className="mb-8">
                            <span className="text-5xl font-bold text-purple-600">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition">
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </button>
                            <p className="text-sm text-gray-500 text-center mt-4">
                                Cart functionality coming soon
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
