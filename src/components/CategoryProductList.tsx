"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface CategoryProductListProps {
    products: Product[];
}

const CategoryProductList = ({
    products,
}: CategoryProductListProps) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sort === "low") {
            result.sort((a, b) => a.today - b.today);
        } else if (sort === "high") {
            result.sort((a, b) => b.today - a.today);
        }

        return result;
    }, [products, sort]);

    return (
        <>
            {/* Sort */}
            <div className="flex items-center justify-end">
                <label
                    htmlFor="sort"
                    className="mr-2 text-sm text-gray-600"
                >
                    সাজান:
                </label>

                <select
                    id="sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#05893E]"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="low">দাম: কম থেকে বেশি</option>
                    <option value="high">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            {/* Products */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

                                {product.change.dir === "up" && (
                                    <span className="shrink-0 text-sm font-semibold text-red-500">
                                        ▲ {Math.abs(product.change.pct)}%
                                    </span>
                                )}

                                {product.change.dir === "down" && (
                                    <span className="shrink-0 text-sm font-semibold text-[#05893E]">
                                        ▼ {Math.abs(product.change.pct)}%
                                    </span>
                                )}

                                {product.change.dir === "flat" && (
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
                                    <span className="font-normal">টাকা</span>
                                </p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CategoryProductList;
