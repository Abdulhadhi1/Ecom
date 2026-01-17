import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

async function getCategoryWithProducts(slug: string) {
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    return category;
}

export default async function CategoryPage({
    params,
}: {
    params: { slug: string };
}) {
    const [category, settings] = await Promise.all([
        getCategoryWithProducts(params.slug),
        getSiteSettings()
    ]);

    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar siteName={settings.siteName} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>

                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        {category.name}
                    </h1>
                    <p className="text-gray-600">
                        {category.products.length} product{category.products.length !== 1 ? "s" : ""} available
                    </p>
                </div>

                {category.products.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No products in this category yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {category.products.map((product: Product) => {
                            const imageUrl = product.images ? product.images.split(",")[0] : "";

                            return (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.slug}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                                        {imageUrl && (
                                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                                <Image
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-purple-600">
                                                    {settings.currencySymbol}{product.price.toFixed(2)}
                                                </span>
                                                <span className="text-purple-600 group-hover:translate-x-1 transition">
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
