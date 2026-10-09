"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
        }
    }, [session?.user]);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/signin");
        }
    }, [isPending, session, router]);

    const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedName = name.trim();

        if (!updatedName) {
            toast.error("আপনার নাম লিখুন।");
            return;
        }

        if (!session?.user) {
            toast.error("তথ্য আপডেট করতে প্রথমে সাইন ইন করুন।");
            router.replace("/signin");
            return;
        }

        if (updatedName === session.user.name) {
            toast.info("আপনার নামে কোনো পরিবর্তন হয়নি।");
            return;
        }

        setIsUpdating(true);

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                toast.error(
                    error.message || "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");

            window.setTimeout(() => {
                router.replace("/profile");
                router.refresh();
            }, 700);
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে।");
            router.replace("/");
            router.refresh();
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending || !session?.user) return null;

    const user = session.user;
    const initial = user.name?.charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-[70vh] bg-[#FAFBFA] px-4 py-8 sm:py-12">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                theme="light"
            />

            <div className="mx-auto max-w-3xl">
                {/* Profile Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt=""
                                className="h-12 w-12 shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-lg font-bold text-white">
                                {initial}
                            </div>
                        )}

                        <div className="min-w-0">
                            <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                                {user.name}
                            </h1>

                            <p className="truncate text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 sm:self-auto"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
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

                {/* Update Information */}
                <section className="pt-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        তথ্য
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
                    </p>

                    <form onSubmit={handleUpdate} className="mt-7">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            maxLength={100}
                            required
                            placeholder="আপনার নাম লিখুন"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/10"
                        />

                        <button
                            type="submit"
                            disabled={isUpdating || isSigningOut}
                            className="mt-8 flex w-full items-center justify-center rounded-lg bg-[#05893E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#047735] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>

                    <Link
                        href="/profile"
                        className="mt-5 inline-block text-sm text-gray-500 transition hover:text-[#05893E]"
                    >
                        ← প্রোফাইলে ফিরে যান
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default UpdateProfilePage;
