import { useRouter } from 'next/navigation'
import React from 'react'
import { LuMoveLeft } from 'react-icons/lu'

export const ProfileHeader = ({ name }: { name: string }) => {
  const token = document.cookie
  console.log("token", token)
  const router = useRouter()
  return (
    <>
      <div
        className="flex space-x-4 items-center fixed top-0 bg-black/20 p-2 font-bold w-full lg:w-[668px] z-50"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <LuMoveLeft size={20} width={20} className="cursor-pointer" onClick={() => router.back()} />
        <div>
          <h1>{name}</h1>
          <p>2071 posts</p>
        </div>
      </div>
    </>
  )
}
