import Link from "next/link";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const Products = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <section className="bg-[#F0F5F0] px-5 py-12">
                <div className="mx-auto max-w-6xl text-center">
                    <p className="text-gray-500">
                        পণ্যের তথ্য লোড করা যায়নি।
                    </p>
                </div>
            </section>
        );
    }

    const products: Product[] = await res.json();

    const risers = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const fallers = products
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <section className="bg-[#F0F5F0] px-5 py-12">
            <div className="mx-auto max-w-6xl">

                {/* Price Increased */}
                <div id="আজ-দাম-বেড়েছে">
                    <h2 className="mb-5 text-2xl font-bold text-gray-900">
                        আজ দাম বেড়েছে{" "}
                        <span className="text-red-500">▲</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {risers.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="block"
                            >
                                <article className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="shrink-0 text-3xl">
                                                {product.image}
                                            </span>

                                            <div className="min-w-0">
                                                <h3 className="truncate font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    প্রতি {product.unit}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="shrink-0 text-sm font-semibold text-red-500">
                                            ▲ {Math.abs(product.change.pct)}%
                                        </span>
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

                {/* Price Decreased */}
                <div className="mt-12">
                    <h2 className="mb-5 text-2xl font-bold text-gray-900">
                        আজ দাম কমেছে{" "}
                        <span className="text-[#05893E]">▼</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {fallers.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                className="block"
                            >
                                <article className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="shrink-0 text-3xl">
                                                {product.image}
                                            </span>

                                            <div className="min-w-0">
                                                <h3 className="truncate font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    প্রতি {product.unit}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="shrink-0 text-sm font-semibold text-[#05893E]">
                                            ▼ {Math.abs(product.change.pct)}%
                                        </span>
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

                {/* All Products */}
                <div
                    id="সব-পণ্য"
                    className="mt-12"
                >
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        সব পণ্য
                    </h2>

                    <p className="mb-5 text-sm text-gray-500">
                        বাজারের সব পণ্যের আজকের দাম দেখুন
                    </p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                className="block"
                            >
                                <article className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="shrink-0 text-3xl">
                                                {product.image}
                                            </span>

                                            <div className="min-w-0">
                                                <h3 className="truncate font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h3>

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

            </div>
        </section>
    );
};

export default Products;
