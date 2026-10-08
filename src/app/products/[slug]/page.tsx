import Link from "next/link";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: Market[];
}

interface ProductDetailsProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
    const { slug } = await params;

    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
                <div className="mx-auto max-w-5xl text-center">
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

    const products: Product[] = await res.json();

    const product = products.find((item) => item.slug === slug);

    if (!product) {
        return (
            <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
                <div className="mx-auto max-w-5xl text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        পণ্য পাওয়া যায়নি
                    </h1>

                    <p className="mt-3 text-gray-500">
                        আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
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

    const minimumPrice = Math.min(
        ...product.markets.map((market) => market.min)
    );

    const maximumPrice = Math.max(
        ...product.markets.map((market) => market.max)
    );

    const averagePrice =
        product.markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0
        ) / product.markets.length;

    const priceDifference = Math.abs(
        product.today - product.yesterday
    );

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

                    <Link
                        href={`/category/${product.category}`}
                        className="transition hover:text-[#05893E]"
                    >
                        {product.categoryNameBn}
                    </Link>

                    <span>/</span>

                    <span className="text-gray-900">
                        {product.nameBn}
                    </span>
                </div>

                <article className="overflow-hidden rounded-2xl bg-white shadow-sm">

                    {/* Product Header + Primary Price */}
                    <div className="p-5 md:p-8">
                        <div className="grid gap-6 md:grid-cols-2 md:items-center">

                            {/* Product Identity - Left */}
                            <div>
                                <div className="flex items-center gap-4">
                                    {/* Product Icon */}
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-5xl">
                                        {product.image}
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-[#05893E]">
                                            {product.categoryIcon}{" "}
                                            {product.categoryNameBn}
                                        </p>

                                        <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-4xl">
                                            {product.nameBn}
                                        </h1>

                                        <p className="mt-1 text-sm text-gray-500">
                                            প্রতি {product.unit}
                                        </p>
                                    </div>
                                </div>

                                {/* Micro Context */}
                                <div className="mt-5">
                                    {product.change.dir === "up" && (
                                        <p className="text-sm font-medium text-red-500">
                                            গতকালের তুলনায়{" "}
                                            <span className="font-bold">
                                                {priceDifference} টাকা
                                            </span>{" "}
                                            বেড়েছে
                                        </p>
                                    )}

                                    {product.change.dir === "down" && (
                                        <p className="text-sm font-medium text-[#05893E]">
                                            গতকালের তুলনায়{" "}
                                            <span className="font-bold">
                                                {priceDifference} টাকা
                                            </span>{" "}
                                            কমেছে
                                        </p>
                                    )}

                                    {product.change.dir === "flat" && (
                                        <p className="text-sm font-medium text-gray-500">
                                            গতকালের তুলনায় দাম অপরিবর্তিত
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Primary Metric - Right */}
                            <div className="rounded-2xl bg-[#EAF7EF] p-6 md:p-8">
                                <p className="text-sm font-medium text-gray-600">
                                    আজকের দাম
                                </p>

                                <div className="mt-2 flex flex-wrap items-end gap-3">
                                    <p className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                                        {product.today}
                                    </p>

                                    <p className="pb-1 text-base font-normal text-gray-600">
                                        টাকা / {product.unit}
                                    </p>
                                </div>

                                <div className="mt-3">
                                    {product.change.dir === "up" && (
                                        <span className="font-semibold text-red-500">
                                            ▲ {product.change.pct}%
                                        </span>
                                    )}

                                    {product.change.dir === "down" && (
                                        <span className="font-semibold text-[#05893E]">
                                            ▼ {Math.abs(product.change.pct)}%
                                        </span>
                                    )}

                                    {product.change.dir === "flat" && (
                                        <span className="font-semibold text-gray-500">
                                            — ০.০%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="border-t border-gray-100 px-5 py-6 md:px-8">
                        <h2 className="text-xl font-bold text-gray-900">
                            দামের সারসংক্ষেপ
                        </h2>

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">

                            {/* Lowest */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">
                                    সর্বনিম্ন দাম
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {minimumPrice}{" "}
                                    <span className="text-sm font-normal text-gray-500">
                                        টাকা
                                    </span>
                                </p>
                            </div>

                            {/* Highest */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">
                                    সর্বাধিক দাম
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {maximumPrice}{" "}
                                    <span className="text-sm font-normal text-gray-500">
                                        টাকা
                                    </span>
                                </p>
                            </div>

                            {/* Average */}
                            <div className="rounded-xl bg-[#F0F5F0] p-5">
                                <p className="text-sm text-gray-500">
                                    গড় দাম
                                </p>

                                <p className="mt-2 text-2xl font-bold text-[#05893E]">
                                    {averagePrice.toFixed(2)}{" "}
                                    <span className="text-sm font-normal text-gray-500">
                                        টাকা
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Market Prices */}
                    <div className="border-t border-gray-100 px-5 py-6 md:px-8">
                        <h2 className="text-xl font-bold text-gray-900">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full min-w-[650px]">

                                <thead>
                                    <tr className="border-b border-gray-200 text-left">
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                                            বাজার
                                        </th>

                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                                            বিভাগ
                                        </th>

                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                                            সর্বনিম্ন
                                        </th>

                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                                            সর্বাধিক
                                        </th>

                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {product.markets.map((market, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-100 last:border-0"
                                        >
                                            <td className="px-4 py-4 font-medium text-gray-900">
                                                {market.market}
                                            </td>

                                            <td className="px-4 py-4 text-gray-600">
                                                {market.division}
                                            </td>

                                            <td className="px-4 py-4 text-gray-700">
                                                {market.min}{" "}
                                                <span className="font-normal">
                                                    টাকা
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-gray-700">
                                                {market.max}{" "}
                                                <span className="font-normal">
                                                    টাকা
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-gray-900">
                                                <span className="font-bold">
                                                    {(
                                                        (market.min +
                                                            market.max) /
                                                        2
                                                    ).toFixed(2)}
                                                </span>{" "}
                                                <span className="font-normal">
                                                    টাকা
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>

                </article>
            </div>
        </main>
    );
};

export default ProductDetails;
