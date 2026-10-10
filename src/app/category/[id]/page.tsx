"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";

interface Category {
    id: string | number;
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

type SortOption = "default" | "low" | "high";

const API_BASE_URL =
    "https://openapi.programming-hero.com/api/bazardor";

const CategoryPage = ({ params }: CategoryPageProps) => {
    const { id } = use(params);

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [sort, setSort] = useState<SortOption>("default");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            setLoading(true);
            setError(false);
            setCategory(null);
            setProducts([]);

            try {
                const [categoryRes, productRes] = await Promise.all([
                    fetch(
                        `${API_BASE_URL}/categories/${encodeURIComponent(id)}`,
                        {
                            cache: "no-store",
                            signal: controller.signal,
                        }
                    ),
                    fetch(
                        `${API_BASE_URL}/products?category=${encodeURIComponent(id)}`,
                        {
                            cache: "no-store",
                            signal: controller.signal,
                        }
                    ),
                ]);

                if (!categoryRes.ok || !productRes.ok) {
                    throw new Error("API request failed");
                }

                const categoryData = await categoryRes.json();
                const productData = await productRes.json();

                const categoryValue =
                    categoryData?.data?.category ??
                    categoryData?.category ??
                    categoryData?.data ??
                    categoryData;

                let loadedCategory: Category | null = null;

                if (
                    categoryValue &&
                    !Array.isArray(categoryValue) &&
                    typeof categoryValue === "object" &&
                    categoryValue.nameBn
                ) {
                    loadedCategory = categoryValue as Category;
                } else if (Array.isArray(categoryValue)) {
                    loadedCategory =
                        (categoryValue.find(
                            (item: Category) =>
                                String(item.id) === id || item.slug === id
                        ) as Category | undefined) ?? null;
                }

                let loadedProducts: Product[] = [];

                if (Array.isArray(productData)) {
                    loadedProducts = productData;
                } else if (Array.isArray(productData?.data)) {
                    loadedProducts = productData.data;
                } else if (Array.isArray(productData?.products)) {
                    loadedProducts = productData.products;
                } else if (Array.isArray(productData?.data?.products)) {
                    loadedProducts = productData.data.products;
                }

                if (!loadedCategory && loadedProducts.length > 0) {
                    loadedCategory = {
                        id,
                        slug: id,
                        nameBn: loadedProducts[0].categoryNameBn,
                        icon: loadedProducts[0].categoryIcon,
                    };
                }

                setCategory(loadedCategory);
                setProducts(loadedProducts);
            } catch (err) {
                if (
                    err instanceof Error &&
                    err.name === "AbortError"
                ) {
                    return;
                }

                console.error("Category page API error:", err);
                setError(true);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => controller.abort();
    }, [id]);

    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sort === "low") {
            result.sort((a, b) => a.today - b.today);
        } else if (sort === "high") {
            result.sort((a, b) => b.today - a.today);
        }

        return result;
    }, [products, sort]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-32 animate-pulse rounded-xl bg-white"
                            />
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
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
                        className="mt-6 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white transition hover:bg-[#047735]"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </main>
        );
    }

    if (!category || products.length === 0) {
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
                        className="mt-6 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white transition hover:bg-[#047735]"
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
                {/* Breadcrumb */}
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <Link
                        href="/"
                        className="transition hover:text-[#05893E]"
                    >
                        হোম
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-gray-900">
                        {category.nameBn}
                    </span>
                </div>

                {/* Category Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-3xl shadow-sm">
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

                    {/* Working Sort */}
                    <div className="flex items-center">
                        <label
                            htmlFor="sort"
                            className="mr-2 text-sm text-gray-600"
                        >
                            সাজান:
                        </label>

                        <select
                            id="sort"
                            value={sort}
                            onChange={(event) =>
                                setSort(event.target.value as SortOption)
                            }
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#05893E]"
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
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="block"
                        >
                            <article className="h-full rounded-xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:shadow-md">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="shrink-0 text-3xl">
                                            {product.image}
                                        </span>

                                        <div className="min-w-0">
                                            <h2 className="truncate font-bold text-gray-900">
                                                {product.nameBn}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                প্রতি {product.unit}
                                            </p>
                                        </div>
                                    </div>

                                    {product.change?.dir === "up" && (
                                        <span className="shrink-0 text-sm font-semibold text-red-500">
                                            ▲ {Math.abs(product.change.pct)}%
                                        </span>
                                    )}

                                    {product.change?.dir === "down" && (
                                        <span className="shrink-0 text-sm font-semibold text-[#05893E]">
                                            ▼ {Math.abs(product.change.pct)}%
                                        </span>
                                    )}

                                    {product.change?.dir === "flat" && (
                                        <span className="shrink-0 text-sm text-gray-400">
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
