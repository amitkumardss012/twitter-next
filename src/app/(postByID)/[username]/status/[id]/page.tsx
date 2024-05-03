
"use client";
import { AddComment } from "@/components/comment/AddComment";
import { UserComment } from "@/components/comment/UserComment";
import { Navbar } from "@/components/specificPost/Navbar";
import { SpecificPost } from "@/components/specificPost/SpecificPost";
import { postType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./loading";

const Page = ({ params }: { params: { id: number } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetails] = useState<postType>();
  const [postComment, setPostComment] = useState<postType[]>([]);
  const [isError, setIsError] = useState(false);
  const [loginUserID, setLoginUserId] = useState<number>(0);

  const postDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/post/${params.id}`);
      setPostDetails(res.data.postByID);
      setPostComment(res.data.postByID.comments);
      setLoginUserId(res.data.logedInUserID);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    postDetails();
  }, []);

  if (isLoading) {
    return <Loading />
  }
  console.log("loginuseID", loginUserID);

  if (!postDetail) return <><Navbar />
    <div className="text-gray-500 text-2xl p-4">this post has been deleted</div></>;

  return (
    <>
      <Navbar />
      {isError && <p>something went wrong</p>}
      {postDetail && <SpecificPost post={postDetail} loginUserID={loginUserID} />}
      <AddComment addComment={postDetail} />
      <div className="md:mt-40">
        {postComment.map((comment) => <UserComment postComment={comment} key={comment.id} loginUserID={loginUserID} />)}
      </div>
    </>
  );
};

export default Page;
