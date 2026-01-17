import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            name: "Admin User",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✅ Admin user created:", admin.email);

    // Create categories
    const categories = [
        {
            name: "Electronics",
            slug: "electronics",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
        },
        {
            name: "Fashion",
            slug: "fashion",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
        },
        {
            name: "Home & Living",
            slug: "home-living",
            image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400",
        },
        {
            name: "Sports",
            slug: "sports",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
        },
        {
            name: "Books",
            slug: "books",
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
        },
        {
            name: "Beauty",
            slug: "beauty",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        },
        {
            name: "Toys & Games",
            slug: "toys-games",
            image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",
        },
        {
            name: "Automotive",
            slug: "automotive",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        },
        {
            name: "Jewelry",
            slug: "jewelry",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        },
        {
            name: "Pet Supplies",
            slug: "pet-supplies",
            image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400",
        },
    ];
    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }

    console.log("✅ Categories created");

    // Get category IDs
    const electronicsCategory = await prisma.category.findUnique({
        where: { slug: "electronics" },
    });
    const fashionCategory = await prisma.category.findUnique({
        where: { slug: "fashion" },
    });
    const homeCategory = await prisma.category.findUnique({
        where: { slug: "home-living" },
    });
    const sportsCategory = await prisma.category.findUnique({
        where: { slug: "sports" },
    });
    const booksCategory = await prisma.category.findUnique({
        where: { slug: "books" },
    });

    // Create products
    const products = [
        {
            name: "Wireless Headphones",
            slug: "wireless-headphones",
            price: 199.99,
            description: "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
            images: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800,https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
            categoryId: electronicsCategory!.id,
        },
        {
            name: "Smart Watch",
            slug: "smart-watch",
            price: 299.99,
            description: "Feature-packed smartwatch with health tracking, GPS, and 5-day battery life.",
            images: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800,https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
            categoryId: electronicsCategory!.id,
        },
        {
            name: "Laptop Stand",
            slug: "laptop-stand",
            price: 49.99,
            description: "Ergonomic aluminum laptop stand with adjustable height and angle.",
            images: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
            categoryId: electronicsCategory!.id,
        },
        {
            name: "Wireless Mouse",
            slug: "wireless-mouse",
            price: 39.99,
            description: "Ergonomic wireless mouse with precision tracking and long battery life.",
            images: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
            categoryId: electronicsCategory!.id,
        },
        {
            name: "Designer Sunglasses",
            slug: "designer-sunglasses",
            price: 159.99,
            description: "Stylish UV-protected sunglasses with polarized lenses.",
            images: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800,https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
            categoryId: fashionCategory!.id,
        },
        {
            name: "Leather Backpack",
            slug: "leather-backpack",
            price: 129.99,
            description: "Premium leather backpack with laptop compartment and multiple pockets.",
            images: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
            categoryId: fashionCategory!.id,
        },
        {
            name: "Cotton T-Shirt",
            slug: "cotton-tshirt",
            price: 29.99,
            description: "Comfortable 100% organic cotton t-shirt in various colors.",
            images: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
            categoryId: fashionCategory!.id,
        },
        {
            name: "Minimalist Desk Lamp",
            slug: "minimalist-desk-lamp",
            price: 79.99,
            description: "Modern LED desk lamp with adjustable brightness and color temperature.",
            images: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
            categoryId: homeCategory!.id,
        },
        {
            name: "Ceramic Vase Set",
            slug: "ceramic-vase-set",
            price: 59.99,
            description: "Set of 3 handcrafted ceramic vases in modern geometric designs.",
            images: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
            categoryId: homeCategory!.id,
        },
        {
            name: "Throw Pillow Set",
            slug: "throw-pillow-set",
            price: 39.99,
            description: "Set of 4 decorative throw pillows with removable covers.",
            images: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800",
            categoryId: homeCategory!.id,
        },
        {
            name: "Yoga Mat",
            slug: "yoga-mat",
            price: 45.99,
            description: "Non-slip yoga mat with extra cushioning for comfort.",
            images: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
            categoryId: sportsCategory!.id,
        },
        {
            name: "Running Shoes",
            slug: "running-shoes",
            price: 119.99,
            description: "Lightweight running shoes with superior cushioning and support.",
            images: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
            categoryId: sportsCategory!.id,
        },
        {
            name: "Fiction Bestseller",
            slug: "fiction-bestseller",
            price: 24.99,
            description: "Award-winning fiction novel by bestselling author.",
            images: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
            categoryId: booksCategory!.id,
        },
        {
            name: "Cookbook Collection",
            slug: "cookbook-collection",
            price: 34.99,
            description: "Comprehensive cookbook with 500+ recipes from around the world.",
            images: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800",
            categoryId: booksCategory!.id,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }

    console.log("✅ Products created");
    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📧 Admin credentials:");
    console.log("   Email: admin@example.com");
    console.log("   Password: admin123");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
