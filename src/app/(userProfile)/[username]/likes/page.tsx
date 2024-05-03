'use client'
import { postType } from '@/type'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import { TwitterPost } from '@/components/base/Post'

const Likes = ({
    params,
}: {
    params: { username: string };
}) => {
    const [post, setPost] = useState<postType[]>([])
    const [loginUserID, setLoggedInUserID] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    useEffect(() => {
        const fetchBookmarked = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/user/${params.username}`)
                console.log(res.data.userLikedPost)
                console.log(res.data.loginUserID)
                setLoggedInUserID(res.data.loginUserID)
                setPost(res.data.userLikedPost)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchBookmarked()
    }, [])
    return (
        <div className='mb-14'>
            {isLoading && <Loading />}
            {isError && <p>something went wrong</p>}
            {post && post.map((like) => {
                return (
                    <>
                        <TwitterPost post={like} loginUserID={loginUserID} />
                    </>
                )
            })}
        </div>
    )
}

export default Likes