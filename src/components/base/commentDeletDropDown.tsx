import { postType } from '@/type'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useToast } from "../ui/use-toast"
import { HiOutlineUserPlus } from 'react-icons/hi2';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const CommentDeletDropDown = ({ comment, logedInUserID }: { comment: postType, logedInUserID: number }) => {

    const { toast } = useToast()

    const router = useRouter()

    const isAuth = logedInUserID === comment.user_id;

    const handleDeleteComment = async () => {
        const res = await axios.delete(`/api/comment/delete/${comment.id}`)
        toast({
            description: res.data.message
        })
        router.refresh()
        window.location.reload()
    }

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <PiDotsThreeOutlineVerticalFill className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent>
                    {isAuth ? (
                        <div
                            className="flex items-center gap-3 cursor-pointer text-red-600"
                            onClick={handleDeleteComment}
                        >
                            <MdDelete />
                            <p>Delete</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 cursor-pointer">
                            <HiOutlineUserPlus className="font-bold text-2xl" />
                            <p>Follow @{comment.user?.username}</p>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </>
    )
}
