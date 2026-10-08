import Link from "next/link";
import React from "react";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface CategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { id } = await params;

    const categoryRes = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/categories/${id}`,
        {
            cache: "no-store",
        }
    );

    const productRes = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${id}`,
        {
            cache: "no-store",
        }
    );

    if (!categoryRes.ok || !productRes.ok) {
        return (
            <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        তথ্য লোড করা যায়নি
                    </h1>

                    <p className="mt-3 text-gray-500">
                        অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </main>
        );
    }

    const category: Category = await categoryRes.json();
    const products: Product[] = await productRes.json();

    if (!category || !products || products.length === 0) {hw
        return (
            <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        কোনো পণ্য পাওয়া যায়নি
                    </h1>

                    <p className="mt-3 text-gray-500">
                        এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-8 md:py-12">
            <div className="mx-auto max-w-6xl">

                {/* Category Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-3xl shadow-sm">
                            {category.icon}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                {category.nameBn}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {products.length}টি পণ্য
                            </p>
                        </div>
                    </div>

                    {/* Sort */}
                    <div>
                        <label
                            htmlFor="sort"
                            className="mr-2 text-sm text-gray-600"
                        >
                            সাজান:
                        </label>

                        <select
                            id="sort"
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
                            defaultValue="default"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low">
                                দাম: কম থেকে বেশি
                            </option>
                            <option value="high">
                                দাম: বেশি থেকে কম
                            </option>
                        </select>
                    </div>
                </div>

                {/* Products */}
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                        >
                            <article className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">
                                            {product.image}
                                        </span>

                                        <div>
                                            <h2 className="font-bold text-gray-900">
                                                {product.nameBn}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                প্রতি {product.unit}
                                            </p>
                                        </div>
                                    </div>

                                    {product.change.dir === "up" && (
                                        <span className="text-sm font-semibold text-red-500">
                                            ▲ {product.change.pct}%
                                        </span>
                                    )}

                                    {product.change.dir === "down" && (
                                        <span className="text-sm font-semibold text-[#05893E]">
                                            ▼ {product.change.pct}%
                                        </span>
                                    )}

                                    {product.change.dir === "flat" && (
                                        <span className="text-sm text-gray-400">
                                            — ০.০%
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 border-t border-gray-100 pt-3">
                                    <p className="text-xs text-gray-500">
                                        আজকের দাম
                                    </p>

                                    <p className="mt-1 text-xl text-gray-900">
                                        <span className="font-bold">
                                            {product.today}
                                        </span>{" "}
                                        <span className="font-normal">
                                            টাকা
                                        </span>
                                    </p>
                                </div>

                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default CategoryPage;
