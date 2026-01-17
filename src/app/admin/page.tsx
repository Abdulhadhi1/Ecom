import React from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";
import { Package, FolderOpen, TrendingUp } from "lucide-react";

async function getStats() {
    const [productCount, categoryCount] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
    ]);

    return { productCount, categoryCount };
}

export default async function AdminDashboard() {
    const session = await requireAdmin();

    if (!session) {
        redirect("/login");
    }

    const stats = await getStats();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Products"
                    value={stats.productCount}
                    icon={Package}
                    color="from-blue-500 to-cyan-500"
                />
                <StatCard
                    title="Total Categories"
                    value={stats.categoryCount}
                    icon={FolderOpen}
                    color="from-purple-500 to-pink-500"
                />
                <StatCard
                    title="Growth"
                    value="+12%"
                    icon={TrendingUp}
                    color="from-green-500 to-emerald-500"
                />
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuickActionCard
                        title="Add New Product"
                        description="Create a new product listing"
                        href="/admin/products/new"
                    />
                    <QuickActionCard
                        title="Add New Category"
                        description="Create a new category"
                        href="/admin/categories/new"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon: Icon,
    color,
}: {
    title: string;
    value: number | string;
    icon: React.ElementType;
    color: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-4 bg-gradient-to-br ${color} rounded-xl`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
}

function QuickActionCard({
    title,
    description,
    href,
}: {
    title: string;
    description: string;
    href: string;
}) {
    return (
        <a
            href={href}
            className="block p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:shadow-md transition border border-slate-200"
        >
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </a>
    );
}
