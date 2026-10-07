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
        "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    const nav: Category[] = await res.json();

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-5">
                {nav.map((n) => (
                    <Link
                        key={n.id}
                        href={`/category/${n.slug}`}
                        className="flex items-center gap-2"
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