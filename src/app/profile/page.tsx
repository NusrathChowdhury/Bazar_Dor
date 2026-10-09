"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/signin");
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) return null;

    const user = session.user;
    const initial = user.name?.charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-[70vh] bg-[#F8FAF8] px-4 py-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-[#05893E]">
                        আমার অ্যাকাউন্ট
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                </div>

                <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                    {/* User Summary */}
                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt=""
                                className="h-16 w-16 shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-xl font-bold text-white">
                                {initial}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-lg font-bold text-gray-900">
                                {user.name}
                            </h2>

                            <p className="mt-1 break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        <Link
                            href="/profile/update"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#05893E] hover:text-[#05893E]"
                        >
                            তথ্য আপডেট করুন
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    {/* Account Information */}
                    <div className="border-t border-gray-100 px-6 py-5 sm:px-8">
                        <h3 className="text-sm font-semibold text-gray-500">
                            অ্যাকাউন্টের তথ্য
                        </h3>

                        <div className="mt-4 rounded-xl bg-[#F8FAF8] p-4">
                            <p className="text-xs text-gray-500">নাম</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {user.name}
                            </p>
                        </div>

                        <div className="mt-3 rounded-xl bg-[#F8FAF8] p-4">
                            <p className="text-xs text-gray-500">
                                ইমেইল ঠিকানা
                            </p>
                            <p className="mt-1 break-all font-medium text-gray-900">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 px-6 py-4 sm:px-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-500 transition hover:text-[#05893E]"
                        >
                            ← হোম পেজে ফিরে যান
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProfilePage;
