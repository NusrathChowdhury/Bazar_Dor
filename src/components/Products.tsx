import Link from "next/link";

interface Product {
    id: number;
    nameBn: string;
    categoryNameBn: string;
    image: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const Products = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

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
                <div>
                    <h2 className="mb-5 text-2xl font-bold">
                        আজ দাম বেড়েছে{" "}
                        <span className="text-[#05893E]">▲</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {risers.map((product) => (
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                            >
                                <article className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">
                                                {product.image}
                                            </span>

                                            <div>
                                                <h3 className="font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {product.categoryNameBn}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-sm font-semibold text-[#05893E]">
                                            ▲ {Math.abs(product.change.pct)}%
                                        </span>
                                    </div>

                                    <div className="mt-4 border-t border-gray-100 pt-3">
                                        <p className="text-xs text-gray-500">
                                            আজকের দাম
                                        </p>

                                        <p className="text-xl font-bold text-gray-900">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                </article>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Price Decreased */}
                <div className="mt-12">
                    <h2 className="mb-5 text-2xl font-bold">
                        আজ দাম কমেছে{" "}
                        <span className="text-red-500">▼</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {fallers.map((product) => (
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                            >
                                <article className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">
                                                {product.image}
                                            </span>

                                            <div>
                                                <h3 className="font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {product.categoryNameBn}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-sm font-semibold text-red-500">
                                            ▼ {Math.abs(product.change.pct)}%
                                        </span>
                                    </div>

                                    <div className="mt-4 border-t border-gray-100 pt-3">
                                        <p className="text-xs text-gray-500">
                                            আজকের দাম
                                        </p>

                                        <p className="text-xl font-bold text-gray-900">
                                            {product.today} টাকা
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
                    <h2 className="mb-2 text-2xl font-bold">
                        সব পণ্য
                    </h2>

                    <p className="mb-5 text-sm text-gray-500">
                        বাজারের সব পণ্যের আজকের দাম দেখুন
                    </p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                            >
                                <article className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">
                                                {product.image}
                                            </span>

                                            <div>
                                                <h3 className="font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {product.categoryNameBn}
                                                </p>
                                            </div>
                                        </div>

                                        {product.change.dir === "up" && (
                                            <span className="text-sm font-semibold text-[#05893E]">
                                                ▲ {Math.abs(product.change.pct)}%
                                            </span>
                                        )}

                                        {product.change.dir === "down" && (
                                            <span className="text-sm font-semibold text-red-500">
                                                ▼ {Math.abs(product.change.pct)}%
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

                                        <p className="text-xl font-bold text-gray-900">
                                            {product.today} টাকা
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
