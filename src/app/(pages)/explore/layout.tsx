
import { BottomNav } from "@/components/home/BottomNav";
import { LeftSidebar } from "@/components/home/LeftSidebar";
import { MobileNav } from "@/components/home/MobileNav";
import { RightSidebar } from "@/components/home/RightSidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='md:container lg;p-5'>
      <div className='flex'>
        <LeftSidebar />
        <div className='h-screen w-full lg:w-2/4 md:w-3/4'>
          {children}
          <BottomNav />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
