"use client";

import Image from "next/image";

import { Save, Upload, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import SubmitButton from "@/components/submit-button";

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
        sku?: string | null;
        sizes?: string | null;
        categoryId: string;
    };
}) {
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [price, setPrice] = useState(initialData?.price?.toString() || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [images, setImages] = useState(initialData?.images || "");
    const [sku, setSku] = useState(initialData?.sku || "");
    const [sizes, setSizes] = useState(initialData?.sizes || "");
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
    const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

    useEffect(() => {
        // Cleanup previews to avoid memory leaks
        return () => {
            uploadPreviews.forEach(URL.revokeObjectURL);
        };
    }, [uploadPreviews]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setUploadPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeUpload = (index: number) => {
        URL.revokeObjectURL(uploadPreviews[index]);
        setUploadPreviews(prev => prev.filter((_, i) => i !== index));
    };

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU (Product Code)
                    </label>
                    <input
                        type="text"
                        name="sku"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="DRS-001"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Sizes (comma-separated)
                    </label>
                    <input
                        type="text"
                        name="sizes"
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="S, M, L, XL"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Enter sizes separated by commas
                    </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* URL Option */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                    <div className="flex items-center gap-2 mb-4 text-purple-600">
                        <Globe className="w-5 h-5" />
                        <h3 className="font-semibold text-gray-900">Image URLs</h3>
                    </div>
                    <textarea
                        name="images"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                        rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Paste external links separated by commas
                    </p>
                </div>

                {/* Upload Option */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                    <div className="flex items-center gap-2 mb-4 text-pink-600">
                        <Upload className="w-5 h-5" />
                        <h3 className="font-semibold text-gray-900">Upload Photos</h3>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            name="uploadImages"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                        />
                        <div className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white hover:border-pink-400 transition">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">Click or drag to upload</span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Combined Preview */}
            {(imageUrls.length > 0 || uploadPreviews.length > 0) && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        Final Preview ({imageUrls.length + uploadPreviews.length} images)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {/* URL Previews */}
                        {imageUrls.map((url: string, index: number) => (
                            <div key={`url-${index}`} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                <Image
                                    src={url.trim()}
                                    alt={`URL Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-[10px] text-white rounded-full">URL</div>
                            </div>
                        ))}

                        {/* Upload Previews */}
                        {uploadPreviews.map((url: string, index: number) => (
                            <div key={`upload-${index}`} className="relative group aspect-square">
                                <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                    <Image
                                        src={url}
                                        alt={`Upload Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-pink-600 text-[10px] text-white rounded-full">FILE</div>
                                <button
                                    type="button"
                                    onClick={() => removeUpload(index)}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <SubmitButton icon={<Save className="w-5 h-5" />}>
                Save Product
            </SubmitButton>
        </form>
    );
}
