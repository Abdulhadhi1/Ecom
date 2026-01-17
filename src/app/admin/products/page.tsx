import Link from "next/link";
import { getProducts } from "./actions";
import { Plus, Edit } from "lucide-react";
import DeleteButton from "./delete-button";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center text-gray-500">
                        No products yet. Create your first product!
                    </div>
                ) : (
                    products.map((product) => {
                        const imageUrl = product.images ? product.images.split(",")[0] : "";

                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                            >
                                {imageUrl && (
                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                                            {product.category.name}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-purple-600">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <DeleteButton productId={product.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
