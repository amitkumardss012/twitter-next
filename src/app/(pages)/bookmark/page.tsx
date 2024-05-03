"use client"
import { TwitterPost } from '@/components/base/Post'
import Loading from '@/components/loading'
import { postType } from '@/type'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LuMoveLeft } from 'react-icons/lu'


const Page = () => {
    const router = useRouter()
    const [post, setPost] = useState<postType[]>([])
    const [loggedInUserID, setLoggedInUserID] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    useEffect(() => {
        const fetchBookmarked = async () => {
            try {
                setLoading(true)
                const res = await axios.get("/api/user/bookmark")
                console.log(res.data)
                setLoggedInUserID(res.data.loggedInUserID)
                setPost(res.data.bookmarkedPosts)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchBookmarked()
    }, [])
    return (
        <>
            <div
                className="flex space-x-4 items-center fixed top-0 bg-black/20 p-2 font-bold w-full lg:w-[668px] z-50"
                style={{ backdropFilter: "blur(10px)" }}
            >
                <LuMoveLeft size={20} width={20} className="cursor-pointer" onClick={() => router.back()} />
                <div>
                    <h1>Bookmarks</h1>
                    <p>20 bookmarks</p>
                </div>

            </div>
            <div className='mt-20'>
                {isLoading && <Loading />}
                {isError && <p>something went wrong</p>}
                {post && post.map((bookmarkPost) => {
                    return (
                        <>
                            <TwitterPost post={bookmarkPost} loginUserID={loggedInUserID} />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Page