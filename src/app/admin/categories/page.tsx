import Link from "next/link";
import { getCategories } from "./actions";
import { Plus, Edit } from "lucide-react";
import DeleteButton from "./delete-button";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
                    <p className="text-gray-600">Manage your product categories</p>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Category
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Slug
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Products
                            </th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No categories yet. Create your first category!
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {category.image && (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            )}
                                            <span className="font-medium text-gray-900">
                                                {category.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {category._count.products}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/categories/${category.id}/edit`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <DeleteButton categoryId={category.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
