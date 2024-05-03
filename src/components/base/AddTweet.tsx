"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import x from "../../../public/images/X.png";
import { HiXMark } from "react-icons/hi2";
import axios from "axios";
import { ForFollowing } from "../home/feeds/ForFollowing";

export const AddTweet = () => {
  const [file, setFile] = useState<any | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<any>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleClosePreview = () => {
    setFile(null);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const formData = new FormData();
      const des = formData.append("description", description);
      if (image) formData.append("image", image);
      const res = await axios.post("/api/post/create", formData, {
        onDownloadProgress: (event) => {
          console.log(event)
          console.log(event.loaded, event.total)
        }
      });
      setDescription("")
      setFile(null);
      console.log(res);
      window.location.reload()
    } catch (error) {
      setError(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="border-b-2">
        <form action="" onSubmit={handlePostSubmit}>
          <div className="flex justify-start items-start space-x-4 px-3">
            <Image src={x} alt="" className="h-6 w-6 mt-3" />
            <textarea
              name=""
              id=""
              className="w-full h-2/4 text-md p-2  outline-none resize-none rounded-lg placeholder:font-semibold"
              placeholder="What is happening?!"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

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
          {isLoading ? <div className="text-blue-600 text-2xl">uploading.......</div> : <></>}
          <div className="mt-3 flex justify-between items-center pb-2">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={previewImage}
            />
            <label htmlFor="file">
              <CiImageOn
                height={20}
                width={20}
                className="cursor-pointer text-2xl ml-4 font-extrabold text-blue-700"
              />
            </label>
            <button
              className={`bg-[#1D9BF0] w-20 h-8 rounded-2xl text-white font-semibold mr-3 disabled:opacity-70`}
              disabled={!description && !file}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
