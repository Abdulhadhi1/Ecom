import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import CategoryScroll from "@/components/category-scroll";
import Footer from "@/components/footer";
import { getSiteSettings } from "@/lib/settings";
import { ProductWithCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getFeaturedData() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      take: 12,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
      },
    }),
  ]);

  return { categories, products };
}

export default async function HomePage() {
  const [{ categories, products }, settings] = await Promise.all([
    getFeaturedData(),
    getSiteSettings()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar siteName={settings.siteName} />

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Browse our collection
            </p>
          </div>

          {/* Scrollable Categories with Buttons */}
          <CategoryScroll categories={categories} />
        </section>
      )}

      {/* Products Section */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All Products
            </h2>
            <p className="text-gray-600">
              Discover our latest collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: ProductWithCategory) => {
              const imageUrl = product.images ? product.images.split(",")[0] : "";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                    {imageUrl && (
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2">
                        {product.category.name}
                      </span>
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
        </section>
      )}
      <Footer />
    </div>
  );
}
