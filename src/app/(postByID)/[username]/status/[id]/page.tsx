// import { AddComment } from "@/components/comment/AddComment";
// import { UserComment } from "@/components/comment/UserComment";
// import { Navbar } from "@/components/specificPost/Navbar";
// import { SpecificPost } from "@/components/specificPost/SpecificPost";
// import { CommentsType, postType } from "@/type";
// import {
//   extractDateWithMonthName,
//   extractTime,
//   formatDate,
// } from "@/vailidation/vaildCreatedAt";
// import axios from "axios";
// import React from "react";

// async function fetch(id: number) {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`
//     );
//     return res.data.postByID;
//   } catch (error) {
//     console.log(error);
//   }
// }

// const page = async ({ params }: { params: { id: number } }) => {
//   const post: postType = await fetch(params.id);
//   console.log("ans", post);
//   return (
//     <>
//       <div className="border-r-2 border-l-2 border-gray-600 w-full">
//         <Navbar />
//         <SpecificPost
//           username={post?.user?.username || ""}
//           name={post.user?.name || ""}
//           contet={post.contet}
//           image={post.image}
//           comment_Count={post.comment_Count}
//           createdAt={extractTime(post?.createdAt || "")}
//           createdAtDate={extractDateWithMonthName(post?.createdAt || "")}
//         />
//         <AddComment username={post.user?.username || ""} post_id={post.id || ""} />
//         <div className="md:mb-0 md:mt-36">
//           <div className="md:mb-0 md:mt-36">
//             {Array.isArray(post.comments) &&
//               post.comments.map((comment: CommentsType) => {
//                 return (
//                   <UserComment
//                     ReplyTo={comment.post?.user.username}
//                     key={comment.id}
//                     username={comment.user?.username || ""}
//                     name={comment.user?.name || ""}
//                     contet={comment.contet}
//                     image={comment.image}
//                     createdAt={formatDate(comment.createdAt || "")}
//                     comment_Count={comment.comment_Count}
//                   />
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;

"use client";
import { AddComment } from "@/components/comment/AddComment";
import { UserComment } from "@/components/comment/UserComment";
import { Navbar } from "@/components/specificPost/Navbar";
import { SpecificPost } from "@/components/specificPost/SpecificPost";
import { postType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./loading";

const page = ({ params }: { params: { id: number } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetails] = useState<postType[]>([]);
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

export default page;
