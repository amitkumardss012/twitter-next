"use client";
import React from "react";
import { useUserPost } from "./UserProfileByUserName";
import Loading from "../loading";
import { UserComment } from "../comment/UserComment";
import { CommentsType, postType } from "@/type";
import { formatDate } from "@/vailidation/vaildCreatedAt";
import { useAPI } from "@/hooks/hooks";

export const SpecificUserComment = ({
    params,
}: {
    params: { username: string };
}) => {
    const { comments, isError, isLoading, loginUserID } = useUserPost(
        `/api/user/${params.username}`
    );
    if (isError) return <div>Something went wrong</div>;
    if (isLoading) return <Loading />;
    return (
        <>
            <div className="mb-16 md:mb-0">
                {Array.isArray(comments) &&
                    comments.map((comment: postType) => {
                        return (
                            <UserComment loginUserID={loginUserID} postComment={comment} key={comment.id} />
                        );
                    })}
                {Array.isArray(comments) && comments.length == 0 && (
                    <div className="p-8">
                        <p className="text-4xl font-semibold">
                            {params.username} hasn't posted comment
                        </p>{" "}
                        <span className="text-gray-500">
                            {" "}
                            Once they do, those comments will appear here.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};
