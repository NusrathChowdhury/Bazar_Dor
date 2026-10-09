"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSignOut = async () => {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            setIsOpen(false);
            toast.success("সফলভাবে সাইন আউট হয়েছে।");
            router.replace("/");
            router.refresh();
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) return null;

    if (!session?.user) {
        return (
            <div className="flex items-center gap-2 sm:gap-3">
                <Link
                    href="/signin"
                    className="rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-[#EAF7EF] hover:text-[#05893E] sm:px-5"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="rounded-xl bg-[#05893E] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#047735] sm:px-6"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const user = session.user;
    const userName = user.name || "ব্যবহারকারী";
    const initial = userName.charAt(0).toUpperCase();

    return (
        <div ref={menuRef} className="relative">
            {/* Account Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="flex max-w-[220px] items-center gap-2 rounded-full border border-gray-100 bg-white p-1.5 pr-3 transition hover:border-[#D6E9DB] hover:bg-[#F8FBF8] sm:gap-3 sm:pr-4"
            >
                {user.image ? (
                    <img
                        src={user.image}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-sm font-bold text-white">
                        {initial}
                    </span>
                )}

                <span className="min-w-0 truncate text-sm font-semibold text-gray-800">
                    {userName}
                </span>

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]"
                >
                    {/* User Summary */}
                    <div className="border-b border-gray-100 px-3 py-4">
                        <p className="truncate text-sm font-semibold text-gray-600">
                            {userName}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-400">
                            {user.email}
                        </p>
                    </div>

                    {/* My Profile */}
                    <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#F0F7F1] hover:text-[#05893E]"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-5 w-5"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 21v-2a8 8 0 0 1 16 0v2"
                            />
                        </svg>

                        আমার প্রোফাইল
                    </Link>

                    {/* Sign Out */}
                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 17l5-5-5-5m5 5H3"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"
                            />
                        </svg>

                        {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
