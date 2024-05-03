'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { LuMoveLeft } from 'react-icons/lu'

export const Navbar = () => {
  const router = useRouter()
  return (
    <div className='sticky top-0 z-10 bg-black/40 bg-opacity-20' style={{ backdropFilter: "blur(10px)" }}>
      <div className="flex items-center gap-4 p-2 font-bold w-full h-14">
        <LuMoveLeft size={20} width={20} className="cursor-pointer" onClick={() => router.back()} />
        <h1 className="font-extrabol">Post</h1>
      </div>
    </div>
  )
}