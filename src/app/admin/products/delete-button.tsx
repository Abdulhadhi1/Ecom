"use client";

import { deleteProduct } from "./actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ productId }: { productId: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }

        setLoading(true);
        try {
            await deleteProduct(productId);
        } catch {
            alert("Failed to delete product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    );
}
