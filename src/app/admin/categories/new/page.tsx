import { createCategory } from "../actions";
import CategoryForm from "../category-form";

export default function NewCategoryPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">New Category</h1>
                <p className="text-gray-600">Create a new product category</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <CategoryForm action={createCategory} />
            </div>
        </div>
    );
}
