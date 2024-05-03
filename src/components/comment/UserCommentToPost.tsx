"use client"
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import { UserComment } from './UserComment'
import { postType } from '@/type'
import axios from 'axios'

export const UserCommentToPost = () => {
    const [reply, setReply] = useState<postType[]>([])
    const [isLoading, setIsloading] = useState(false)
    const [loginUserID, setLoginUserId] = useState<number>(0);

    useEffect(() => {
        const fetchUserReply = async () => {
            try {
                setIsloading(true)
                const res = await axios.get("/api/user/comment")
                setReply(res.data.userComment)
                setLoginUserId(res.data.logedInUserID);
            } catch (error) {
                console.log(error)
            } finally {
                setIsloading(false)
            }
        }
        fetchUserReply()
    }, [])

    if (isLoading) return <Loading />

    console.log("reply", reply)
    return (
        <>
            {isLoading ? <Loading /> : <></>}
            {
                Array.isArray(reply) && reply.map((userReply) => {
                    return (
                        <UserComment
                            key={userReply.id}
                            loginUserID={loginUserID}
                            postComment={userReply}
                        />
                    )
                })
            }

            {reply.length == 0 && <div className="p-8">
                <p className="text-4xl font-semibold">
                    you hasn&apos;t posted comment
                </p>{" "}
                <span className="text-gray-500">
                    {" "}
                    Once they do, those comments will appear here.
                </span>
            </div>}
        </>
    )
}
