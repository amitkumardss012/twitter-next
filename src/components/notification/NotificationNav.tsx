import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import PopUpContent from '../home/MobileNav'
import { LuMoveLeft } from 'react-icons/lu'
import { useRouter } from 'next/navigation'

export default function NotificationNav() {
    const router = useRouter()
    return (
        <>
            <div>
                <div className='flex items-center gap-5 p-3 bg-black/20 w-full' style={{ backdropFilter: "blur(10px)" }}>
                    <Sheet>
                        <SheetTrigger className='md:hidden'>
                            <img
                                src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
                                alt=""
                                className="w-9 h-9 rounded-full"
                            />
                        </SheetTrigger>
                        <SheetContent side="left">
                            <PopUpContent />
                        </SheetContent>
                    </Sheet>
                    <LuMoveLeft className='text-2xl hidden md:block cursor-pointer font-bold' onClick={() => router.back()} />
                    <h1 className='font-extrabold text-xl'>Notification</h1>
                </div>
            </div>
        </>
    )
}
