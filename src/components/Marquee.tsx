import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface ProductChange {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Product {
    id: number;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: ProductChange;
}

const Marquee = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const products: Product[] = await res.json();

    return (
        <div className="w-full mt-5">
            <div className="w-full h-9 overflow-hidden">

                <MarqueeText
                    direction="right"
                    loop={true}
                    className="text-gray-700 text-sm font-semibold leading-9"
                >
                    {products.map((product) => (
                        <span
                            key={product.id}
                            className="inline-flex items-center"
                        >
                            <span>
                                {product.categoryIcon} {product.nameBn}
                            </span>

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
