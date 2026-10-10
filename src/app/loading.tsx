const LoadingPage = () => {
    return (
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-8 md:py-12">
            <div className="mx-auto max-w-6xl animate-pulse">

                {/* Breadcrumb Skeleton */}
                <div className="mb-6 flex items-center gap-2">
                    <div className="h-4 w-12 rounded bg-gray-200" />
                    <div className="h-3 w-3 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                </div>

                {/* Page Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                        <div className="h-8 w-8 rounded-lg bg-[#DDEDE1]" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="h-7 w-48 max-w-full rounded-lg bg-gray-200" />
                        <div className="h-4 w-28 rounded bg-gray-200" />
                    </div>
                </div>

                {/* Main Loading Card */}
                <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                    {/* Product Information */}
                    <div className="grid gap-6 p-5 md:grid-cols-2 md:items-center md:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#E5F2E8]">
                                <div className="h-10 w-10 rounded-full bg-[#C6E2CE]" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-24 rounded bg-[#DDEDE1]" />
                                <div className="h-7 w-40 max-w-full rounded-lg bg-gray-200" />
                                <div className="h-4 w-20 rounded bg-gray-200" />
                            </div>
                        </div>

                        {/* Price Skeleton */}
                        <div className="rounded-2xl bg-[#EAF7EF] p-6 md:p-8">
                            <div className="h-4 w-24 rounded bg-[#C6E2CE]" />
                            <div className="mt-4 h-12 w-36 rounded-lg bg-[#C6E2CE]" />
                            <div className="mt-4 h-4 w-20 rounded bg-[#D5EBDD]" />
                        </div>
                    </div>

                    {/* Price Summary Skeleton */}
                    <div className="border-t border-gray-100 px-5 py-6 md:px-8">
                        <div className="h-6 w-48 rounded bg-gray-200" />

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                                >
                                    <div className="h-4 w-24 rounded bg-gray-200" />
                                    <div className="mt-4 h-8 w-32 rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Table Skeleton */}
                    <div className="border-t border-gray-100 px-5 py-6 md:px-8">
                        <div className="h-6 w-56 max-w-full rounded bg-gray-200" />

                        <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-4 bg-[#F7FAF7] p-4 sm:grid-cols-5">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div
                                        key={item}
                                        className={`${item > 3 ? "hidden sm:block" : ""} h-4 rounded bg-gray-200`}
                                    />
                                ))}
                            </div>

                            {/* Table Rows */}
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="grid grid-cols-3 gap-4 border-t border-gray-100 p-4 sm:grid-cols-5"
                                >
                                    {[1, 2, 3, 4, 5].map((cell) => (
                                        <div
                                            key={cell}
                                            className={`${cell > 3 ? "hidden sm:block" : ""} h-4 rounded bg-gray-100`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Loading Indicator */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#05893E]" />
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#05893E] [animation-delay:150ms]" />
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#05893E] [animation-delay:300ms]" />

                    <p className="ml-1 text-sm font-medium text-gray-500">
                        বাজারের তথ্য লোড হচ্ছে...
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoadingPage;
