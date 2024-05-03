import Image from "next/image";
import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { CommentsType, postType } from "@/type";
import { formatDate } from "@/vailidation/vaildCreatedAt";
import { DropDown } from "../base/DropDown";
import { CommentDeletDropDown } from "../base/commentDeletDropDown";

export const UserComment = ({
  postComment,
  loginUserID,
}: { postComment: postType, loginUserID: number; }) => {
  return (
    <div className="relative">
      <div style={{ borderBottom: "1px solid grey" }} className="">
        <div className="flex items-center w-full">
          <div className="flex w-full justify-between items-center pr-2 pl-2">
            <div className="flex">
              <img
                height={1000}
                width={1000}
                src="https://pbs.twimg.com/media/GKyi_z2XUAM7JTL?format=jpg&name=900x900"
                alt="userProfile"
                className="rounded-full h-8 w-8 mt-2"
              />
              <div className="ml-3">
                <div className="flex gap-2">
                  <p className="font-bold">{postComment.user?.name}</p>
                  <p className="text-gray-500">{postComment.user?.username}</p>
                  <p className="text-gray-500">{formatDate(postComment.createdAt)}</p>
                </div>
                <p className="text-gray-500 text-sm">
                  reply to{" "}
                  <span className="text-[#1D9BF0] font-bold">{postComment.post.user.username}</span>
                </p>
              </div>
            </div>
            <CommentDeletDropDown comment={postComment} logedInUserID={loginUserID} />
          </div>
        </div>
        <div className="p-2">
          {postComment.contet && <p className="ml-5">{postComment.contet}</p>}
          {postComment.image && <img src={postComment.image} alt="" className="rounded-2xl" />}
        </div>
      </div>
    </div>
  );
};
