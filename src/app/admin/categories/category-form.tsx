"use client";

import { Save } from "lucide-react";
import { useState } from "react";

export default function CategoryForm({
    action,
    initialData,
}: {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        name: string;
        slug: string;
        image?: string | null;
    };
}) {
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [image, setImage] = useState(initialData?.image || "");

    const handleNameChange = (value: string) => {
        setName(value);
        if (!initialData) {
            setSlug(value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""));
        }
    };

    return (
        <form action={action} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="Electronics"
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
                    placeholder="electronics"
                    required
                />
                <p className="text-sm text-gray-500 mt-1">
                    URL-friendly version of the name
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                </label>
                <input
                    type="url"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            {image && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                    </label>
                    <img
                        src={image}
                        alt="Preview"
                        className="w-32 h-32 rounded-lg object-cover"
                    />
                </div>
            )}

            <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
            >
                <Save className="w-5 h-5" />
                Save Category
            </button>
        </form>
    );
}
