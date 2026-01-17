"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const images = formData.get("images") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!name || !slug || !price || !description || !categoryId) {
        throw new Error("All fields are required");
    }

    await prisma.product.create({
        data: {
            name,
            slug,
            price,
            description,
            images,
            categoryId,
        },
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const images = formData.get("images") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!name || !slug || !price || !description || !categoryId) {
        throw new Error("All fields are required");
    }

    await prisma.product.update({
        where: { id },
        data: {
            name,
            slug,
            price,
            description,
            images,
            categoryId,
        },
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });

    revalidatePath("/admin/products");
}

export async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            category: true,
        },
    });
}

export async function getProductById(id: string) {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });
}
