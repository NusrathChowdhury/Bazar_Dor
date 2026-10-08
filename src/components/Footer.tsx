const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

                {/* Left */}
                <p>
                    <span className="font-semibold ">
                        বাজার দর
                    </span>{" "}
                    — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right */}
                <p className="max-w-xl md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </footer>
    );
};

export default Footer;
