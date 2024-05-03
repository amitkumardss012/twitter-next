
import { AddTweet } from "@/components/base/AddTweet";
import { BottomNav } from "@/components/home/BottomNav";
import { LeftSidebar } from "@/components/home/LeftSidebar";
import { MobileNav } from "@/components/home/MobileNav";
import { RightSidebar } from "@/components/home/RightSidebar";
import { ForFollowing } from "@/components/home/feeds/ForFollowing";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='md:container lg;p-5'>
            <div className='flex'>
                <LeftSidebar />
                <div className='h-screen w-full lg:w-2/4 md:w-3/4 overflow-auto'>
                    <div className="hidden lg:block">
                    </div>
                    <Toaster />
                    {children}
                    <BottomNav />
                </div>
                <RightSidebar />
            </div>
        </div>
    );
}