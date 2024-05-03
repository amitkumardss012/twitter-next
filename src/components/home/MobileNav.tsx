"use client"
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoBookmarkOutline, IoPersonOutline } from "react-icons/io5";
import Image from "next/image";
import x from "../../../public/images/X.png"
import Link from "next/link";
import axios from "axios";
import { LeftSidebarComp } from "./LeftSidebar";
import { MdOutlineSearch } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { userType } from "@/type";
import { useRouter } from "next/navigation";

export const MobileNav = () => {
  const [user, setUser] = useState<userType>()
  const fetchUser = async () => {
    const res = await axios.get("/api/user/");
    setUser(res.data.userDetails)
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <nav className="md:hidden flex justify-between items-center border-b-2 p-2 w-full fixed top-0 left-0 z-50 h-16 bg-black/20" style={{ backdropFilter: "blur(10px)" }}>
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
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
      </div>

      <Image src={x} alt="" className="h-7 w-7" />
      <Link href={`${user?.username}`} >
        <IoPersonOutline height={50} width={50} className="font-extrabold text-3xl" />
      </Link>
    </nav>
  );
};






export default function PopUpContent() {
  const router = useRouter()
  const [user, setUser] = useState<userType>()
  const fetchUser = async () => {
    const res = await axios.get("/api/user/");
    setUser(res.data.userDetails)
  }
  useEffect(() => {
    fetchUser()
  }, [])
  const handleLogout = async () => {
    console.log("jfidj")
    try {
      const res = await axios.get("/api/auth/logout")
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <>

        <div style={{ borderBottom: "1px solid gray" }}>
          <Link href={`${user?.username}`} >
            <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png" className="h-8 w-8 rounded-full" alt="" />
          </Link>

          <Link href={`${user?.username}`} >

            <h1 className="mt-3 font-extrabold text-md">{user?.name}</h1>
            <p className="text-gray-600 mt-1">@{user?.username}</p>
          </Link>

          <div className="flex mt-2 mb-2 gap-3">
            <p className="cursor-pointer hover:underline">{user?.following_count} <span>Following</span> </p>
            <p className="cursor-pointer hover:underline">{user?.follower_count} <span>Followers</span> </p>
          </div>
        </div>
        <div className="mt-5 ml-3">
          <LeftSidebarComp
            icon={<IoPersonOutline className=" h-10 w-7" />}
            title="profile"
            router={`${user?.username}`}
          />
          <LeftSidebarComp
            icon={<MdOutlineSearch className=" h-10 w-7" />}
            title="Explore"
            router="/explore"
          />
          <LeftSidebarComp icon={<IoBookmarkOutline className="h-10 w-7" />} title="bookmark" router="/bookmark" />

          <div className="mt-2 flex items-center gap-3 cursor-pointer" onClick={handleLogout}>
            <IoLogOutOutline className="text-3xl" />
            <p className="text-xl font-bold">Log out</p>
          </div>
        </div>
      </>
    </>
  )
}
