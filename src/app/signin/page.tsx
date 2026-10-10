"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SocialProvider = "google" | "github";

const SignInPage = () => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLoading, setSocialLoading] =
        useState<SocialProvider | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting || socialLoading) return;

        const formData = new FormData(event.currentTarget);

        const email = String(formData.get("email") || "")
            .trim()
            .toLowerCase();

        const password = String(formData.get("password") || "");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
            return;
        }

        if (!password) {
            toast.error("আপনার পাসওয়ার্ড লিখুন");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                const message = error.message || "";

                if (
                    /invalid email or password|invalid credentials|incorrect password/i.test(
                        message
                    )
                ) {
                    toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
                } else {
                    toast.error(
                        message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন"
                    );
                }

                return;
            }

            if (!data) {
                toast.error("সাইন ইন নিশ্চিত করা যায়নি। আবার চেষ্টা করুন");
                return;
            }

            toast.success("সাইন ইন সফল হয়েছে!");

            window.setTimeout(() => {
                router.replace("/");
                router.refresh();
            }, 700);
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        if (isSubmitting || socialLoading) return;

        setSocialLoading(provider);

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(
                    error.message ||
                        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি`
                );

                setSocialLoading(null);
            }
        } catch {
            toast.error(
                `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি। OAuth configuration পরীক্ষা করুন।`
            );

            setSocialLoading(null);
        }
    };

    const isLoading = isSubmitting || socialLoading !== null;

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
                            স্বাগতম
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            আপনার অ্যাকাউন্টে সাইন ইন করুন
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            আপনার ইমেইল ও পাসওয়ার্ড দিয়ে এগিয়ে যান।
                        </p>
                    </div>

                    {/* Email and Password Form */}
                    <form onSubmit={onSubmit} noValidate>
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
                                    autoComplete="current-password"
                                    required
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
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
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-5 w-full rounded-xl bg-[#05893E] px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-[#05893E]/15 transition hover:bg-[#047735] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting
                                ? "সাইন ইন হচ্ছে..."
                                : "সাইন ইন করুন"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-100" />
                        <span className="text-xs text-gray-400">অথবা</span>
                        <div className="h-px flex-1 bg-gray-100" />
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleSocialLogin("google")}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="font-bold text-base">G</span>
                        {socialLoading === "google"
                            ? "Google-এ সংযোগ হচ্ছে..."
                            : "Google দিয়ে সাইন ইন করুন"}
                    </button>

                    {/* GitHub Sign In */}
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleSocialLogin("github")}
                        className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="text-xs font-bold">GH</span>
                        {socialLoading === "github"
                            ? "GitHub-এ সংযোগ হচ্ছে..."
                            : "GitHub দিয়ে সাইন ইন করুন"}
                    </button>

                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-[#05893E] transition hover:text-[#047735] hover:underline"
                        >
                            নতুন অ্যাকাউন্ট তৈরি করুন
                        </Link>
                    </p>

                    {/* Home Link */}
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

export default SignInPage;
