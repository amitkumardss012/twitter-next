
import { LeftSidebar } from "@/components/home/LeftSidebar";
import { RightSidebar } from "@/components/home/RightSidebar";
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NextTopLoader />
            <div className='md:container lg;p-5'>
                <div className='flex'>
                    <LeftSidebar />
                    <div className='h-screen w-full lg:w-2/4 md:w-3/4 overflow-auto'>
                        {children}
                    </div>
                    <RightSidebar />
                </div>
            </div>
        </>

    );
}
