import React from 'react';
import { LeftSidebar } from "@/components/home/LeftSidebar";
import { RightSidebar } from "@/components/home/RightSidebar";
import { SpecificUserProfle } from "@/components/SpecificUserProfile/SpecificUserProfle";
import NextTopLoader from 'nextjs-toploader';
import { BottomNav } from '@/components/home/BottomNav';

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    return (
        <>
            <NextTopLoader />
            <div className="md:container lg:p-5">
                <div className="flex">
                    <LeftSidebar />
                    <div className="h-screen w-full lg:w-2/4 md:w-3/4 overflow-auto">
                        <SpecificUserProfle params={params} />
                        {children}
                        <BottomNav />
                    </div>
                    <RightSidebar />
                </div>
            </div>
        </>
    );
}
