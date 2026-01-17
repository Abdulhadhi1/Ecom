"use client";

import { useState } from "react";

export default function SizeSelector({ sizes }: { sizes: string }) {
    const sizeList = sizes.split(",").map(s => s.trim()).filter(Boolean);
    const [selectedSize, setSelectedSize] = useState(sizeList[0] || "");

    if (sizeList.length === 0) return null;

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Select Size
            </h2>
            <div className="flex flex-wrap gap-3">
                {sizeList.map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 rounded-lg font-medium border-2 transition ${selectedSize === size
                                ? "border-purple-600 bg-purple-50 text-purple-600"
                                : "border-gray-200 text-gray-600 hover:border-purple-300"
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            {selectedSize && (
                <p className="mt-2 text-sm text-purple-600 font-medium">
                    Selected: {selectedSize}
                </p>
            )}
        </div>
    );
}
