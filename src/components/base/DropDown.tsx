"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { postType } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

export const DropDown = ({
    post,
    loginUserID,
}: {
    post: postType;
    loginUserID: number;
}) => {
    const { toast } = useToast()
    const handleDeletePost = async () => {
        const res = await axios.delete(`/api/post/${post.id}`);
        toast({
            description: res.data.message
        })
        window.location.reload()
    };
    const isAuth = loginUserID === post.user_id;


    return (
        <Popover>
            <PopoverTrigger>
                <PiDotsThreeOutlineVerticalFill className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
                {isAuth ? (
                    <div
                        className="flex items-center gap-3 cursor-pointer text-red-600"
                        onClick={handleDeletePost}
                    >
                        <MdDelete />
                        <p>Delete</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 cursor-pointer">
                        <Link href={`/${post?.user?.username}`}>
                            <p className="font-semibold">View Profile</p>
                        </Link>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

