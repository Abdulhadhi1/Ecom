import { getCategoryById, updateCategory } from "../../actions";
import { redirect } from "next/navigation";
import CategoryForm from "../../category-form";

export default async function EditCategoryPage({
    params,
}: {
    params: { id: string };
}) {
    const category = await getCategoryById(params.id);

    if (!category) {
        redirect("/admin/categories");
    }

    const updateCategoryWithId = async (formData: FormData) => {
        "use server";
        await updateCategory(params.id, formData);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Category</h1>
                <p className="text-gray-600">Update category details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <CategoryForm action={updateCategoryWithId} initialData={category} />
            </div>
        </div>
    );
}
