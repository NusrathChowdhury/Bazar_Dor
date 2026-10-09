"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUPPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "")
            .trim()
            .toLowerCase();
        const password = String(formData.get("password") || "");

        if (!name) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                const code = error.code || "";
                const message = error.message || "";

                if (
                    code === "USER_ALREADY_EXISTS" ||
                    /already exists|already registered|use another email/i.test(
                        message
                    )
                ) {
                    toast.error(
                        "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে। সাইন ইন করুন।"
                    );
                } else if (code === "PASSWORD_TOO_SHORT") {
                    toast.error(
                        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
                    );
                } else {
                    toast.error(
                        message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন"
                    );
                }

                return;
            }

            if (!data) {
                toast.error(
                    "রেজিস্ট্রেশন নিশ্চিত করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            // Keep the Better Auth session; do not sign the user out.
            toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

            window.setTimeout(() => {
                router.replace("/");
                router.refresh();
            }, 800);
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-[#F7FAF7] to-[#EDF5EF] px-4 py-10 sm:py-14">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                theme="light"
            />

            <div className="w-full max-w-md">
                <div className="rounded-2xl bg-white p-6 shadow-[0_16px_50px_-20px_rgba(5,137,62,0.20)] sm:p-8">

                    {/* Brand and Heading */}
                    <div className="mb-7 text-center">
                        <Link
                            href="/"
                            className="mb-5 inline-flex items-center justify-center gap-3"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#05893E] text-2xl">
                                🛒
                            </span>

                            <span className="text-2xl font-black tracking-tight text-gray-900">
                                বাজার দর
                            </span>
                        </Link>

                        <p className="mb-2 text-sm font-semibold text-[#05893E]">
                            নিবন্ধন
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            নতুন অ্যাকাউন্ট তৈরি করুন
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            অ্যাকাউন্ট তৈরি করে প্রতিদিনের বাজারদর দেখুন।
                        </p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={onSubmit} noValidate>
                        {/* Name */}
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                পূর্ণ নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="আপনার নাম লিখুন"
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#05893E] focus:bg-white focus:ring-4 focus:ring-[#05893E]/10"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                ইমেইল ঠিকানা
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="name@example.com"
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#05893E] focus:bg-white focus:ring-4 focus:ring-[#05893E]/10"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                পাসওয়ার্ড
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#05893E] focus:bg-white focus:ring-4 focus:ring-[#05893E]/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-3 my-auto h-fit text-xs font-semibold text-gray-500 transition hover:text-[#05893E]"
                                >
                                    {showPassword ? "লুকান" : "দেখুন"}
                                </button>
                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
                            </p>
                        </div>

                        {/* Register */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-5 w-full rounded-xl bg-[#05893E] px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-[#05893E]/15 transition hover:bg-[#047735] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting
                                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                                : "অ্যাকাউন্ট তৈরি করুন"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-100" />
                        <span className="text-xs text-gray-400">অথবা</span>
                        <div className="h-px flex-1 bg-gray-100" />
                    </div>

                    {/* Social Login — enable after configuring providers */}
                    <button
                        type="button"
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-400 opacity-75"
                    >
                        <span className="font-bold">G</span>
                        Google দিয়ে চালিয়ে যান
                        <span className="text-xs">(শীঘ্রই)</span>
                    </button>

                    <button
                        type="button"
                        disabled
                        className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-400 opacity-75"
                    >
                        <span className="font-bold">GH</span>
                        GitHub দিয়ে চালিয়ে যান
                        <span className="text-xs">(শীঘ্রই)</span>
                    </button>

                    {/* Sign In */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="font-bold text-[#05893E] transition hover:text-[#047735] hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>

                    {/* Home */}
                    <div className="mt-5 text-center">
                        <Link
                            href="/"
                            className="text-xs font-medium text-gray-400 transition hover:text-[#05893E]"
                        >
                            ← হোম পেজে ফিরে যান
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignUPPage;
