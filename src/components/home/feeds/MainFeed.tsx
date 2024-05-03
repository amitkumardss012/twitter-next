"use client";
import React, { useEffect, useState } from "react";
import { ForFollowing } from "./ForFollowing";
import { AddTweet } from "../../base/AddTweet";
import { TwitterPost } from "../../base/Post";
import { formatDate } from "@/vailidation/vaildCreatedAt";
import { postType } from "@/type";
import Loading from "@/components/loading";
import { useGetPosts, useGetUserePosts } from "@/zustand/getUserPosts";
import { useRouter } from "next/navigation";
import { useAPI } from "@/hooks/hooks";

export const MainFeed = () => {
  const { feedPost, loginUserID, isLoading, isError } = useAPI("/api/post")
  console.log("loginUserIDd ", loginUserID)

  return (
    <>
      <div className="border-r-2 border-l-2 mb-14 md:mb-0">
        <div>
          {isLoading && <Loading />}
          {isError && <p>something went wrong</p>}
          {feedPost &&
            feedPost.map((tweet) => {
              return (
                <TwitterPost
                  post={tweet} key={tweet.id} loginUserID={loginUserID} />
              );
            })}
        </div>
      </div>
    </>
  );
};
