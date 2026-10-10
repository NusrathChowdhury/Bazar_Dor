import Link from "next/link";

interface Category {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
}

const API_URL =
    "https://openapi.programming-hero.com/api/bazardor/categories";

async function NavLinks() {
    let categories: Category[] = [];

    try {
        const response = await fetch(API_URL, {
            cache: "no-store",
        });

        if (response.ok) {
            const result = await response.json();

            if (Array.isArray(result)) {
                categories = result;
            } else if (Array.isArray(result.data)) {
                categories = result.data;
            } else if (Array.isArray(result.data?.categories)) {
                categories = result.data.categories;
            } else if (Array.isArray(result.data?.items)) {
                categories = result.data.items;
            } else if (Array.isArray(result.categories)) {
                categories = result.categories;
            }
        } else {
            console.error("Categories API failed:", response.status);
        }
    } catch (error) {
        console.error("Failed to load categories:", error);
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="mx-auto max-w-6xl px-4"
        >
            <div className="flex gap-5 overflow-x-auto border-b border-gray-100 py-3">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-[#05893E]"
                    >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.nameBn}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavLinks;
