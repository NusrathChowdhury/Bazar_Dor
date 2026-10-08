import MarqueeText from "react-marquee-text";
import Link from "next/link";
import "react-marquee-text/dist/styles.css";

interface ProductChange {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: ProductChange;
}

const Marquee = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    const products: Product[] = await res.json();

    return (
        <div className="mt-5 w-full">
            <div className="h-9 w-full overflow-hidden">
                <MarqueeText
                    direction="right"
                    loop={true}
                    className="text-sm font-semibold leading-9 text-gray-700"
                >
                    {products.map((product) => (
                        <span
                            key={product.id}
                            className="inline-flex items-center"
                        >
                            <Link
                                href={`/products/${product.slug}`}
                                className="transition hover:text-[#05893E]"
                            >
                                {product.categoryIcon} {product.nameBn}
                            </Link>

                            <span className="mx-2">
                                {product.today} টাকা/{product.unit}
                            </span>

                            {product.change.dir === "up" && (
                                <span className="text-red-500">
                                    ▲ {product.change.pct}%
                                </span>
                            )}

                            {product.change.dir === "down" && (
                                <span className="text-green-600">
                                    ▼ {Math.abs(product.change.pct)}%
                                </span>
                            )}

                            {product.change.dir === "flat" && (
                                <span className="text-gray-500">
                                    — 0%
                                </span>
                            )}

                            <span className="mx-5 text-gray-300">
                                •
                            </span>
                        </span>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;
