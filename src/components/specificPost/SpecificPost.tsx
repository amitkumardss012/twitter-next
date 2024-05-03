
import React from "react";
import { postType } from "@/type";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { extractDateWithMonthName, extractTime } from "@/vailidation/vaildCreatedAt";
import Link from "next/link";
import { DropDown } from "../base/DropDown";
import { LikeBookmark } from "../base/LikeBookmark";

export const SpecificPost = ({ post, loginUserID, }: { post: postType, loginUserID: number; }) => {
  return (
    <>
      <div>
        <div className="mt-3">
          <div className="flex justify-between w-full items-center">
            <Link href={`/${post.user?.username}`}>
              <div className="flex pl-2 items-center">
                <img
                  src="https://pbs.twimg.com/media/GKzmsm9XgAEK1Zp?format=jpg&name=small"
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                <div className="ml-3">
                  <p className="font-bold">{post.user?.name}</p>
                  <span className="text-gray-500">{post.user?.username}</span>
                  <span className="text-gray-500">{loginUserID}fdfds</span>
                </div>
              </div>
            </Link>
            <div className="flex items-center mr-3 gap-2">
              {/* <button className="bg-black text-white w-28 text-sm h-7 rounded-full">
                Follow
              </button> */}
              <DropDown post={post} loginUserID={loginUserID} />
            </div>
          </div>
          <div className="p-3">{post.contet && <p>{post.contet}</p>}</div>
          <div className="p-3">
            {post.image && <img className="rounded-xl" src={post.image} alt="" />}
          </div>
          <div className="flex pl-3 pr-3 gap-5">
            <p className="text-gray-600">{extractTime(post.createdAt)}</p>
            <p className="text-gray-600">{extractDateWithMonthName(post.createdAt)}</p>
          </div>
          <div className="pl-3 flex gap-4 border-b-2 border-gray-300 border-t-2 py-2">
            {/* <div className="flex gap-2 cursor-pointer">
              <p className="font-bold">28</p>
              <span className="text-gray-500 font-semibold">Reposts</span>
            </div> */}
            <div className="flex gap-2 cursor-pointer">
              <p className="font-bold">{post.like_count}</p>
              <span className="text-gray-500 font-semibold">Likes</span>
            </div>
            <div className="flex gap-2 cursor-pointer">
              <p className="font-bold">{post.bookmark_count}</p>
              <span className="text-gray-500 font-semibold">Bookmarks</span>
            </div>
          </div>
          <LikeBookmark post={post} loginUserID={loginUserID} />
        </div>
      </div>
    </>
  );
};
