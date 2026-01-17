"use client";

import { Save } from "lucide-react";
import { useState } from "react";

export default function ProductForm({
    action,
    categories,
    initialData,
}: {
    action: (formData: FormData) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: any[];
    initialData?: {
        name: string;
        slug: string;
        price: number;
        description: string;
        images: string;
        categoryId: string;
    };
}) {
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [price, setPrice] = useState(initialData?.price?.toString() || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [images, setImages] = useState(initialData?.images || "");
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");

    const handleNameChange = (value: string) => {
        setName(value);
        if (!initialData) {
            setSlug(value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""));
        }
    };

    const imageUrls = images.split(",").filter(Boolean);

    return (
        <form action={action} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="iPhone 15 Pro"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="iphone-15-pro"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="999.99"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                    </label>
                    <select
                        name="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                </label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="Product description..."
                    rows={4}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URLs (comma-separated)
                </label>
                <textarea
                    name="images"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                    Enter multiple image URLs separated by commas
                </p>
            </div>

            {imageUrls.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url.trim()}
                                alt={`Preview ${index + 1}`}
                                className="w-full aspect-square rounded-lg object-cover"
                            />
                        ))}
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
            >
                <Save className="w-5 h-5" />
                Save Product
            </button>
        </form>
    );
}
