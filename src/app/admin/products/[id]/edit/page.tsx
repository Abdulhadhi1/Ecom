import { getProductById, updateProduct } from "../../actions";
import { getCategories } from "../../../categories/actions";
import { redirect } from "next/navigation";
import ProductForm from "../../product-form";

export default async function EditProductPage({
    params,
}: {
    params: { id: string };
}) {
    const [product, categories] = await Promise.all([
        getProductById(params.id),
        getCategories(),
    ]);

    if (!product) {
        redirect("/admin/products");
    }

    const updateProductWithId = async (formData: FormData) => {
        "use server";
        await updateProduct(params.id, formData);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Product</h1>
                <p className="text-gray-600">Update product details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <ProductForm
                    action={updateProductWithId}
                    categories={categories}
                    initialData={product}
                />
            </div>
        </div>
    );
}
