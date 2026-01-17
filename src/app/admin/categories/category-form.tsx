"use client";

import { Save, Upload, X, Globe } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubmitButton from "@/components/submit-button";

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
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (uploadPreview) URL.revokeObjectURL(uploadPreview);
        };
    }, [uploadPreview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);
            setUploadPreview(preview);
        }
    };

    const removeUpload = () => {
        if (uploadPreview) URL.revokeObjectURL(uploadPreview);
        setUploadPreview(null);
    };

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* URL Option */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                    <div className="flex items-center gap-2 mb-4 text-purple-600">
                        <Globe className="w-5 h-5" />
                        <h3 className="font-semibold text-gray-900">Image URL</h3>
                    </div>
                    <input
                        type="url"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* Upload Option */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                    <div className="flex items-center gap-2 mb-4 text-pink-600">
                        <Upload className="w-5 h-5" />
                        <h3 className="font-semibold text-gray-900">Upload Photo</h3>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            name="uploadImage"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                        />
                        <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white hover:border-pink-400 transition">
                            <Upload className="w-6 h-6 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">Click to upload</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            {(image || uploadPreview) && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
                    <div className="flex gap-6">
                        {image && (
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                <Image
                                    src={image}
                                    alt="URL Preview"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-[10px] text-white rounded-full">URL</div>
                            </div>
                        )}
                        {uploadPreview && (
                            <div className="relative group">
                                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                    <Image
                                        src={uploadPreview}
                                        alt="Upload Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-pink-600 text-[10px] text-white rounded-full">FILE</div>
                                <button
                                    type="button"
                                    onClick={removeUpload}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <SubmitButton icon={<Save className="w-5 h-5" />}>
                Save Category
            </SubmitButton>
        </form>
    );
}
