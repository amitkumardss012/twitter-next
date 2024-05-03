"use client";
import { useReplyToUser } from "@/zustand/commentState/replyToUser";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { HiXMark } from "react-icons/hi2";
import { postType } from "@/type";
import { useRouter } from "next/navigation";

export const AddComment = ({
  addComment
}: {
  addComment: postType
}) => {
  const { isActive, setIsActive } = useReplyToUser();
  const [file, setFile] = useState<any | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<any>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const router = useRouter()

  const handleClosePreview = () => {
    setFile(null);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const formData = new FormData();
      const des = formData.append("description", description);
      if (image) formData.append("image", image);
      const postID = formData.append("post_id", String(addComment.id));
      const res = await axios.post("/api/comment/create", formData);
      setDescription("");
      setFile(null);
      console.log(res);
      window.location.reload();
    } catch (error: any) {
      console.log("error", error);
      console.log(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="relative">
      <div
        className="fixed md:absolute md:top-0 bottom-0 z-50"
        style={{ width: "100%" }}
      >
        <div
          className="bg-white pt-2 pl-3 pr-3"
          style={{ borderTop: "2px solid grey" }}
        >
          <p className={`${isActive ? "block" : "hidden"}`}>
            Reply to <span className="text-[#1B92E2]">{addComment.user?.username}</span>
          </p>
          {isLoading ? (
            <div className="text-blue-600 text-2xl">uploading.......</div>
          ) : (
            <></>
          )}
          <form action="" onSubmit={handleCommentSubmit} >
            <input
              type="text"
              placeholder="Post your reply"
              className="w-full h-14 outline-none"
              onClick={setIsActive}
              onChange={(e) => setDescription(e.target.value)}
              style={{ borderBottom: "2px solid #1D9BF0" }}
            />

            {file !== null && (
              <div className="w-[70%] ml-24 md:ml-44 lg:ml-32 relative">
                <Image
                  src={file}
                  alt="Uploaded Preview"
                  width={200}
                  height={200}
                  className="w-full rounded-2xl"
                />
                <HiXMark
                  className="text-2xl font-extrabold bg-black text-white rounded-2xl absolute top-2 right-2 cursor-pointer"
                  onClick={handleClosePreview}
                />
              </div>
            )}

            <div
              className="flex items-center mt-1 justify-between pt-2 pb-2"
              style={{ borderBottom: "1px solid grey" }}
            >
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file">
                <CiImageOn
                  height={20}
                  width={20}
                  className="cursor-pointer text-2xl ml-4 text-blue-600 font-extrabold"
                />
              </label>
              <button
                type="submit"
                className="bg-[#1D9BF0] w-20 h-8 rounded-2xl text-white font-semibold mr- disabled:opacity-70"
                disabled={!description && !file}
              >
                Reply
              </button>
            </div>
          </form>
        </div>
        {/* {isLoading ? <div>Loading...</div> : <></>} */}
      </div>
    </div>
  );
};
