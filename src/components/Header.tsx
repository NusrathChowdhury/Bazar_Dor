import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const categories = [
    { name: "চাল", icon: "🍚", slug: "chal" },
    { name: "ডাল", icon: "🍲", slug: "dal" },
    { name: "তেল", icon: "🛢️", slug: "tel" },
    { name: "সবজি", icon: "🥬", slug: "shobji" },
    { name: "মাছ", icon: "🐟", slug: "mach" },
    { name: "মাংস", icon: "🍗", slug: "mangsho" },
    { name: "ডিম-দুধ", icon: "🥛", slug: "dim-dudh" },
    { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

const Header = () => {
    return (
        <header className="w-full bg-white">

            {/* Main Header */}
            <div className="border-b border-gray-100">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:py-6">

                    {/* Logo + Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 sm:gap-4"
                    >
                        {/* Green Cart Icon */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#07883F] shadow-sm sm:h-16 sm:w-16">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="1.8"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
                                />
                                <circle
                                    cx="10"
                                    cy="20"
                                    r="1.3"
                                    fill="white"
                                />
                                <circle
                                    cx="18"
                                    cy="20"
                                    r="1.3"
                                    fill="white"
                                />
                            </svg>
                        </div>

                        {/* Brand */}
                        <div>
                            <h1 className="text-[28px] font-black leading-none tracking-tight text-black  sm:text-[36px]">
                                বাজার দর
                            </h1>

                            <p className="mt-2 text-[11px] font-medium text-gray-500 sm:text-sm">
                                {new Date().toLocaleDateString("bn-BD", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    timeZone: "Asia/Dhaka",
                                })}
                            </p>
                        </div>
                    </Link>

                    {/* Authentication */}
                    <UserInfo/>
                </div>
            </div>

            {/* Category Navigation */}
            <NavLinks />

        </header>
    );
};

export default Header;