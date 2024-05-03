"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import x from "../../../public/images/X.png";
import Link from "next/link";
import { MdHomeFilled, MdOutlineSearch } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LeftSidebar = () => {
  const router = useRouter()
  const [username, setUserName] = useState<string>('')
  const fetchUser = async () => {
    const res = await axios.get("/api/user/");
    setUserName(res.data.userDetails.username)
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
      <div className="h-screen hidden border-r-2 md:w-1/4 lg:p-10 md:pt-5 md:block">
        <div className="flex justify-start items-center">
          <Image src={x} alt="X" width={50} height={50} />
        </div>
        <ul className="mt-10">
          <LeftSidebarComp
            icon={<MdHomeFilled className=" h-10 w-7" />}
            title="Home"
            router="/home"
          />
          <LeftSidebarComp
            icon={<MdOutlineSearch className=" h-10 w-7" />}
            title="Explore"
            router="/explore"
          />
          <LeftSidebarComp
            icon={<IoPersonOutline className="h-10 w-7" />}
            title="Notification"
            router="/notification"
          />
          <LeftSidebarComp
            icon={<IoPersonOutline className="h-10 w-7" />}
            title="Profile"
            router={`${username}`}
          />
          <LeftSidebarComp icon={<IoBookmarkOutline className="h-10 w-7" />} title="bookmark" router="/bookmark" />
          <div className="mt-2 flex items-center gap-3 cursor-pointer" onClick={handleLogout}>
            <IoLogOutOutline className="text-3xl" />
            <p className="text-xl">Log out</p>
          </div>
        </ul>
      </div>
    </>
  );
};

export const LeftSidebarComp = ({ icon, title, router }: LeftSidebarType) => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <>
      <li className="list-none">
        <Link
          href={router}
          className={`flex justify-start items-center space-x-4 mt-2 ${pathName == router ? "font-extrabold" : ""
            }`}
        >
          {icon}
          <h3 className="text-lg lg:text-xl">{title}</h3>
        </Link>
      </li>
    </>
  );
};

interface LeftSidebarType {
  icon: any;
  title: string;
  router: string;
}