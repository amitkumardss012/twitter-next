"use client";
import { postType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { TwitterPost } from "../base/Post";

const UserMediaPost = () => {
    const [media, setMedia] = useState<postType[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchUserMediaPost = async () => {
        try {
            setIsloading(true);
            const res = await axios.get("/api/user/media");
            console.log("mediaData", res.data.userPostsWithImages);
            setMedia(res.data.userPostsWithImages);
        } catch (error) {
            setIsError(true);
            console.log(error);
        } finally {
            setIsloading(false);
        }
    };

    useEffect(() => {
        fetchUserMediaPost();
    }, []);
    return (
        <>
            {isLoading && <Loading />}
            {isError && <p>something went wrong</p>}
            {Array.isArray(media) && media.length > 0 ? (
                media.map((media) => {
                    return <TwitterPost loginUserID={media.user.id} post={media} key={media.id} />;
                })
            ) : (
                <div className="p-8">
                    <p className="text-4xl font-semibold">
                        Lights, camera... attchments!
                    </p>{" "}
                    <span className="text-gray-500">
                        {" "}
                        Yout photos video posts will appear here
                    </span>
                </div>
            )}
        </>
    );
};

export default UserMediaPost;
