"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const image = formData.get("image") as string;

    if (!name || !slug) {
        throw new Error("Name and slug are required");
    }

    await prisma.category.create({
        data: {
            name,
            slug,
            image: image || null,
        },
    });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const image = formData.get("image") as string;

    if (!name || !slug) {
        throw new Error("Name and slug are required");
    }

    await prisma.category.update({
        where: { id },
        data: {
            name,
            slug,
            image: image || null,
        },
    });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({
        where: { id },
    });

    revalidatePath("/admin/categories");
}

export async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });
}

export async function getCategoryById(id: string) {
    return await prisma.category.findUnique({
        where: { id },
    });
}
