import profile from "../../../public/images/profile.png";
import Image from "next/image";
import React from "react";
import { postType } from "@/type";
import Link from "next/link";
import { formatDate } from "@/vailidation/vaildCreatedAt";
import { DropDown } from "./DropDown";
import { LikeBookmark } from "./LikeBookmark";

export const TwitterPost = ({ post, loginUserID }: {
  post: postType, loginUserID: number
}) => {
  return (
    <>
      <div className="cursor-pointer p-4 border-b border-neutral-600 flex">
        <Link href={`/${post.user?.username}/status/${post.id}`}>
          <div className="w-16 shrink-0 grow-0 mr-2 flex flex-col items-center">
            <Link href={`/${post.user?.username}`}>
              <Image
                height={1000}
                width={1000}
                src={profile}
                alt={post.user?.name || 'User profile'}
                className="rounded-full h-8 w-8"
              />
            </Link>
          </div>
        </Link>
        <div className="flex-grow">
          <div className="flex justify-between">
            <Link href={`/${post.user?.username}`}>
              <p className="font-bold">
                {post.user?.name}{" "}
                <span className="font-normal text-neutral-500 ml-2">
                  @{post.user?.username}
                </span>
                <span className="ml-4 text-neutral-500">
                  {formatDate(post.createdAt)}
                </span>
              </p>
            </Link>
            <DropDown post={post} loginUserID={loginUserID} />
          </div>
          <Link href={`/${post.user?.username}/status/${post.id}`}>
            <div className="mb-2">
              {post.contet && <p className="w-full">{post.contet}</p>}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post image"
                  className="h-64 w-[90%] md:w-full rounded-lg"
                />
              )}
            </div>
          </Link>
          <LikeBookmark post={post} loginUserID={loginUserID} />
        </div>
      </div>
    </>
  );
};
