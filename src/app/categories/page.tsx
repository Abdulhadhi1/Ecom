import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { CategoryWithCount } from "@/lib/types";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

async function getAllCategories() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });

    return categories;
}

export default async function CategoriesPage() {
    const categories = await getAllCategories();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        All Categories
                    </h1>
                    <p className="text-gray-600">
                        Browse our complete collection of product categories
                    </p>
                </div>

                {categories.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <p className="text-gray-500 text-lg">No categories available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category: CategoryWithCount) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="group"
                            >
                                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center border border-gray-100 h-48 flex flex-col items-center justify-center">
                                    {category.image && (
                                        <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition"
                                            />
                                        </div>
                                    )}
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {category._count.products} {category._count.products === 1 ? "product" : "products"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
