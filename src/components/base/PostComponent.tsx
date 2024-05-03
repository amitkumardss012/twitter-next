import x from "../../../public/images/X.png";
import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { postType } from "@/type";
import Link from "next/link";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { formatDate } from "@/vailidation/vaildCreatedAt";

export const PostComponent = ({ post }: { post: postType }) => {
    return (
        <>
            <div className="cursor-pointer p-4 border-b border-neutral-600 flex">
                <div className="w-16 shrink-0 grow-0 mr-2 flex flex-col items-center">
                    <Link href={`${post.username}`}>
                        <Image
                            height={1000}
                            width={1000}
                            src={x}
                            alt="userProfile"
                            className="rounded-full h-8 w-8"
                        />
                    </Link>
                </div>

                <div className="flex-grow">
                    <div className="flex justify-between">
                        <p className="font-bold">
                            {post.user?.name}{" "}
                            <span className="font-normal text-neutral-500 ml-2">
                                @{post.user?.username}
                            </span>
                            <span className="ml-4 text-neutral-500">
                                {formatDate(post.createdAt || "")}
                            </span>
                        </p>
                        <PiDotsThreeOutlineVerticalFill className="cursor-pointer" />
                    </div>

                    <div className="mb-2">
                        {post.contet && <p className="w-full">{post.contet}</p>}
                        {post.image && (
                            <img src={post.image} alt="" className="h-64 w-full rounded-lg" />
                        )}
                    </div>
                    <div className="flex justify-between gap-12 pt-2 pl-2 pr-2">
                        <p className="flex gap-2">
                            <FaRegComment className="text-xl cursor-pointer" />
                            <span>{post.comment_Count}</span>
                        </p>
                        <p className="flex gap-2">
                            <AiOutlineRetweet className="text-xl cursor-pointer" />
                            <span>16</span>
                        </p>
                        <p className="flex gap-2">
                            <FaRegHeart className="text-xl cursor-pointer" />
                            <span>16</span>
                        </p>
                        <FaRegBookmark className="text-xl cursor-pointer" />
                    </div>
                </div>
            </div>
        </>
    );
};
