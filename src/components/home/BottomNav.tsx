"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import x from "../../../public/images/X.png";
import Link from "next/link";
import { MdHomeFilled, MdOutlineSearch } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";


export const BottomNav = () => {
    const [username, setUserName] = useState<string>('')
    const fetchUser = async () => {
        const res = await axios.get("/api/user/");
        setUserName(res.data.userDetails.username)
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <div className="md:hidden flex justify-center items-center fixed bottom-0 w-full" style={{ backdropFilter: "blur(10px)" }}>
                <BottomNavComponent icon={<MdHomeFilled />} router="/home" />
                <BottomNavComponent icon={<MdOutlineSearch />} router="/explore" />
                <BottomNavComponent icon={<FaPlus />} router="/compose/post" />
                <BottomNavComponent icon={<IoMdNotificationsOutline />} router="/notification" />
                <BottomNavComponent icon={<IoPersonOutline />} router={`${username}`} />
            </div>
        </>
    );
};

export const BottomNavComponent = ({ icon, router }: BottomNavType) => {
    const pathName = usePathname();
    console.log(pathName);
    return (
        <>
            <Link href={router} className="w-full">
                <div className="bg-black/20 w-full h-14 flex justify-center items-center text-3xl">
                    {icon}
                </div>
            </Link>
        </>
    );
};

interface BottomNavType {
    icon: any;
    router: string;
}
