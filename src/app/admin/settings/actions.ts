"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    let config = await prisma.siteConfig.findUnique({
        where: { id: "default" },
    });

    if (!config) {
        config = await prisma.siteConfig.create({
            data: {
                id: "default",
                currencySymbol: "$",
                siteName: "E-Store",
            },
        });
    }

    return config;
}

export async function updateSettings(formData: FormData) {
    const currencySymbol = formData.get("currencySymbol") as string;
    const siteName = formData.get("siteName") as string;

    await prisma.siteConfig.upsert({
        where: { id: "default" },
        update: {
            currencySymbol,
            siteName,
        },
        create: {
            id: "default",
            currencySymbol,
            siteName,
        },
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
}
