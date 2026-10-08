import Link from "next/link";
import React from "react";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    const nav: Category[] = await res.json();

    return (
        <div className="mx-auto max-w-6xl px-4">
            <div className="flex gap-5 overflow-x-auto py-3">
                {nav.map((n) => (
                    <Link
                        key={n.id}
                        href={`/category/${n.slug}`}
                        className="flex shrink-0 items-center gap-2"
                    >
                        <span>{n.icon}</span>
                        <span>{n.nameBn}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavLinks;
