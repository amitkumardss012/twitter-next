"use client"

import React, { useEffect, useState } from 'react'
import { postType } from '@/type';
import axios from 'axios';
import { TwitterPost } from '../base/Post';
import Loading from '../loading';
import { useAPI } from '@/hooks/hooks';
export const UserProfileByUserName = ({ params }: { params: { username: string } }) => {
  const { posts, isError, isLoading, loginUserID } = useUserPost(`/api/user/${params.username}`)
  if (isError) return <div>Something went wrong</div>
  return (
    <>
      <div className='mb-14'>
        {isLoading && <Loading />}
        {Array.isArray(posts) && posts.map((post: postType) => {
          return (
            <TwitterPost post={post} key={post.id} loginUserID={loginUserID} />
          )
        })}
      </div>
    </>
  )
}


export const useUserPost = (url: string) => {
  const [posts, setData] = useState<postType | []>([]);
  const [comments, setComment] = useState<postType | []>([]);
  const [postMedia, setPostMedia] = useState<postType | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [SpecificPost, SetspecificPost] = useState<postType | []>([])
  const [loginUserID, setLoginUserId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(url);
        setData(response.data.userByUsernam.Post);
        setComment(response.data.userByUsernam.comments);
        setPostMedia(response.data.postWhichConatinsImage);
        SetspecificPost(response.data)
        setLoginUserId(response.data.loginUserID);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { posts, isLoading, isError, comments, postMedia, SpecificPost, loginUserID };
};
