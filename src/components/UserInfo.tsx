
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserInfo = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে।");
            router.refresh();
            router.push("/");
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
    };

    if (isPending) {
        return (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
        );
    }

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            {session?.user ? (
                <>
                    <span className="hidden text-sm font-semibold text-gray-700 sm:inline">
                        {session.user.name}
                    </span>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-[#EAF7EF] hover:text-[#05893E] sm:px-5"
                    >
                        সাইন আউট
                    </button>
                </>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-[#EAF7EF] hover:text-[#05893E] sm:px-5"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl bg-[#05893E] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#067535] sm:px-6"
                    >
                        সাইন আপ
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserInfo;
