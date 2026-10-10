import MarqueeText from "react-marquee-text";
import Link from "next/link";
import "react-marquee-text/dist/styles.css";

interface ProductChange {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Product {
    id: string | number;
    slug: string;
    nameBn: string;
    categoryIcon?: string;
    image?: string;
    unit: string;
    today: number;
    change?: ProductChange;
    yesterday?: number;
}

interface ApiResponse {
    data?: Product[] | {
        products?: Product[];
        items?: Product[];
    };
    products?: Product[];
}

const API_URL =
    "https://openapi.programming-hero.com/api/bazardor/products";

const getProducts = (result: ApiResponse | Product[]): Product[] => {
    if (Array.isArray(result)) {
        return result;
    }

    if (Array.isArray(result.data)) {
        return result.data;
    }

    return (
        result.data?.products ??
        result.data?.items ??
        result.products ??
        []
    );
};

const Marquee = async () => {
    let products: Product[] = [];

    try {
        const res = await fetch(API_URL, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Failed to fetch marquee products:", res.status);
            return null;
        }

        const result: ApiResponse | Product[] = await res.json();
        products = getProducts(result);
    } catch (error) {
        console.error("Error fetching marquee products:", error);
        return null;
    }

    return (
        <div className="mt-5 w-full">
            <div className="h-9 w-full overflow-hidden">
                <MarqueeText
                    direction="right"
                    loop={true}
                    className="text-sm font-semibold leading-9 text-gray-700"
                >
                    {products.map((product) => {
                        const change =
                            product.change ??
                            (product.yesterday !== undefined
                                ? {
                                      dir:
                                          product.today > product.yesterday
                                              ? "up"
                                              : product.today < product.yesterday
                                                ? "down"
                                                : "flat",
                                      pct:
                                          product.yesterday === 0
                                              ? 0
                                              : Number(
                                                    (
                                                        ((product.today -
                                                            product.yesterday) /
                                                            product.yesterday) *
                                                        100
                                                    ).toFixed(1)
                                                ),
                                  }
                                : { dir: "flat" as const, pct: 0 });

                        return (
                            <span
                                key={product.id}
                                className="inline-flex items-center"
                            >
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="transition hover:text-[#05893E]"
                                >
                                    {product.categoryIcon ?? product.image ?? "🛒"}{" "}
                                    {product.nameBn}
                                </Link>

                                <span className="mx-2">
                                    {product.today} টাকা/{product.unit}
                                </span>

                                {change.dir === "up" && (
                                    <span className="text-red-500">
                                        ▲ {Math.abs(change.pct)}%
                                    </span>
                                )}

                                {change.dir === "down" && (
                                    <span className="text-green-600">
                                        ▼ {Math.abs(change.pct)}%
                                    </span>
                                )}

                                {change.dir === "flat" && (
                                    <span className="text-gray-500">
                                        — 0%
                                    </span>
                                )}

                                <span className="mx-5 text-gray-300">
                                    •
                                </span>
                            </span>
                        );
                    })}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;
