import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-[60vh] flex-1 items-center justify-center bg-[#F0F5F0] px-4 py-12 sm:py-16">
            <div className="w-full max-w-lg text-center">

                {/* Illustration */}
                <div className="relative mx-auto mb-7 flex h-40 w-40 items-center justify-center rounded-full bg-[#E1F0E5]">
                    <div className="absolute inset-4 rounded-full border border-[#C9E3D0]" />

                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#05893E"
                            strokeWidth="1.6"
                            className="h-12 w-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
                            />
                            <circle cx="10" cy="20" r="1.3" fill="#05893E" />
                            <circle cx="18" cy="20" r="1.3" fill="#05893E" />
                        </svg>
                    </div>

                    <span className="absolute -right-1 top-2 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#F0F5F0] bg-[#05893E] text-xl font-bold text-white">
                        !
                    </span>
                </div>

                {/* Error Code */}
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#05893E]">
                    Error 404
                </p>

                {/* Heading */}
                <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                    পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
                </h1>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                    দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি এখানে নেই।
                    ঠিকানাটি ভুল হতে পারে অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#05893E] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#047735] hover:shadow-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z"
                            />
                        </svg>
                        হোম পেজে ফিরে যান
                    </Link>

                    <Link
                        href="/#সব-পণ্য"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-[#05893E] hover:text-[#05893E]"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                {/* Brand */}
                <p className="mt-10 text-sm text-gray-400">
                    <span className="font-bold text-[#05893E]">বাজার দর</span>
                    {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
            </div>
        </main>
    );
};

export default NotFound;
