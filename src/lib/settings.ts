import prisma from "@/lib/prisma";
import { cache } from "react";

export const getSiteSettings = cache(async () => {
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
});
