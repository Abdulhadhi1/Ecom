import { Product, Category } from "@prisma/client";

export type ProductWithCategory = Product & {
    category: Category;
};

export type CategoryWithCount = Category & {
    _count: {
        products: number;
    };
};
