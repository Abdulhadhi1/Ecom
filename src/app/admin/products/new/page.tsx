import { createProduct } from "../actions";
import { getCategories } from "../../categories/actions";
import ProductForm from "../product-form";

export default async function NewProductPage() {
    const categories = await getCategories();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">New Product</h1>
                <p className="text-gray-600">Add a new product to your inventory</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <ProductForm action={createProduct} categories={categories} />
            </div>
        </div>
    );
}
