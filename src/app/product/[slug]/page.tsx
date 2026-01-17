import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowLeft, ShoppingCart, Hash } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";
import SizeSelector from "@/components/size-selector";

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
    const [product, settings] = await Promise.all([
        getProduct(params.slug),
        getSiteSettings()
    ]);

    if (!product) {
        notFound();
    }

    const imageUrls = product.images ? product.images.split(",").filter(Boolean) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <Navbar siteName={settings.siteName} />

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
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
                                    <Image
                                        src={imageUrls[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {imageUrls.length > 1 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {imageUrls.slice(1, 5).map((url: string, index: number) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-lg"
                                            >
                                                <Image
                                                    src={url}
                                                    alt={`${product.name} ${index + 2}`}
                                                    fill
                                                    className="object-cover"
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

                        <h1 className="text-5xl font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>

                        {product.sku && (
                            <div className="flex items-center gap-2 text-gray-500 mb-6 font-medium">
                                <Hash className="w-4 h-4" />
                                <span>SKU: {product.sku}</span>
                            </div>
                        )}

                        <div className="mb-8">
                            <span className="text-5xl font-bold text-purple-600">
                                {settings.currencySymbol}{product.price.toFixed(2)}
                            </span>
                        </div>

                        {product.sizes && (
                            <SizeSelector sizes={product.sizes} />
                        )}

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
