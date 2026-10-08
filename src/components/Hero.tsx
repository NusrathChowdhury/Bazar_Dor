"use client";

import Image from "next/image";

const Hero = () => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="bg-[#F0F5F0]">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* LEFT CONTENT */}
                    <div className="text-center lg:text-left">

                        {/* Current Date */}
                        <p className="mb-4 text-sm font-semibold text-[#05893E] sm:text-base">
                            {currentDate}
                        </p>

                        {/* Main Heading */}
                        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        {/* Subtitle */}
                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base lg:mx-0 lg:text-lg">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                            দামের পরিবর্তন এক জায়গায়।
                        </p>

                        {/* CTA */}
                        <a
                            href="#সব-পণ্য"
                            className="mt-7 inline-block rounded-lg bg-[#05893E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#047735]"
                        >
                            সব পণ্য দেখুন
                        </a>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center lg:justify-end">
                        <Image
                            src="/bazar-hero.png"
                            alt="Bazardor"
                            width={600}
                            height={500}
                            priority
                            className="h-auto w-full max-w-md object-contain sm:max-w-lg lg:max-w-xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
