import Image from 'next/image'
import React from 'react'
import profile from "../../../public/images/profile.png"
import Link from 'next/link'
import { userType } from '@/type'

export const UserSugg = ({ user }: { user: userType }) => {
    return (
        <>
            <div className='w-full shadow-sm p-4 rounded-md mb-3'>
                <div className='flex jc items-center'>
                    <Image src={profile} width={25} className='h-8 w-8 rounded-full' alt="" />
                    <div className='flex justify-between items-start w-full'>
                        <div className='flex flex-col ml-2'>
                            <strong className='text-md font-bold ml-2'>{user.name}</strong>
                            <span className='ml-2 font-light text-xs'>{user.username}</span>
                        </div>
                        <Link href={`/${user.username}`}>
                            <button className='bg-black text-white w-20 h-8 rounded-2xl'>Profile</button>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

