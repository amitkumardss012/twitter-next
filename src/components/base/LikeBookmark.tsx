"use client"
// import { postType } from '@/type';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { AiOutlineRetweet } from 'react-icons/ai';
// import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export const LikeBookmark = ({ post, loginUserID }: { post: postType, loginUserID: number }) => {
//     const [isBookmarked, setIsBookmarked] = useState(() => {
//         // Retrieve bookmark status from local storage
//         const storedStatus = localStorage.getItem(`bookmark_${loginUserID}_${post.id}`);
//         return storedStatus ? JSON.parse(storedStatus) : false;
//     });
//     const [like, setLike] = useState(post.like_count)
//     const [isLiked, setIsLiked] = useState(() => {
//         const storedLikeStatus = localStorage.getItem(`like_${loginUserID}_${post.id}`);
//         return storedLikeStatus ? JSON.parse(storedLikeStatus) : false;
//     });

//     useEffect(() => {
//         localStorage.setItem(`like_${loginUserID}_${post.id}`, JSON.stringify(isLiked));
//     }, [isLiked, loginUserID, post.id]);

//     useEffect(() => {
//         // Update local storage when bookmark status changes
//         localStorage.setItem(`bookmark_${loginUserID}_${post.id}`, JSON.stringify(isBookmarked));
//     }, [isBookmarked, loginUserID, post.id]);

//     const handleBookmark = async () => {
//         try {
//             const res = await axios.post("/api/user/bookmark", {
//                 user_id: loginUserID,
//                 post_id: post.id
//             });
//             if (res.data.message === 'bookmarked added') {
//                 setIsBookmarked(true);
//                 console.log(res.data)
//             } else if (res.data.message === 'bookmarked removed') {
//                 setIsBookmarked(false);
//                 console.log(res.data)
//             }
//         } catch (error) {
//             // alert(error)
//             console.error('Error toggling bookmark:', error);
//         }
//     };

//     const handleLike = async () => {
//         try {
//             const res = await axios.post('/api/post/like', {
//                 post_id: post.id,
//                 user_id: loginUserID
//             })
//             if (res.data.message === 'Post liked') {
//                 setLike(prev => prev + 1)
//                 setIsLiked(true)
//             } else {
//                 setLike(prev => prev - 1)
//                 setIsLiked(false)
//             }
//         } catch (error) {
//             // alert(error)
//         }
//     }

//     return (
//         <>
//             <div>
//                 <div className="flex justify-between gap-12 pt-2 pl-2 pr-2">
//                     <Link href={`/${post?.user?.username}/status/${post?.id}`}>
//                         <p className="flex gap-2">
//                             <FaRegComment className="text-xl cursor-pointer" />
//                             <span>{post.comment_Count}</span>
//                         </p>
//                     </Link>
//                     {/* <p className="flex gap-2">
//                         <AiOutlineRetweet className="text-xl cursor-pointer" />
//                         <span>16</span>
//                     </p> */}
//                     <p className={`flex gap-2 ${isLiked ? "text-red-600" : ""}`} onClick={handleLike}>
//                         <FaRegHeart className="text-xl cursor-pointer font-black" />
//                         <span>{like}</span>
//                     </p>
//                     <FaRegBookmark
//                         className={`text-xl cursor-pointer font-extrabold ${isBookmarked ? 'text-blue-500' : ''}`}
//                         onClick={handleBookmark}
//                     />
//                 </div>
//             </div>
//         </>
//     );
// };



import { postType } from '@/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/router';

export const LikeBookmark = ({ post, loginUserID }: { post: postType, loginUserID: number }) => {
    const [isBookmarked, setIsBookmarked] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedStatus = localStorage.getItem(`bookmark_${loginUserID}_${post.id}`);
            return storedStatus ? JSON.parse(storedStatus) : false;
        }
        return false;
    });

    const [like, setLike] = useState(post.like_count);

    const [isLiked, setIsLiked] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedLikeStatus = localStorage.getItem(`like_${loginUserID}_${post.id}`);
            return storedLikeStatus ? JSON.parse(storedLikeStatus) : false;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`like_${loginUserID}_${post.id}`, JSON.stringify(isLiked));
        }
    }, [isLiked, loginUserID, post.id]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`bookmark_${loginUserID}_${post.id}`, JSON.stringify(isBookmarked));
        }
    }, [isBookmarked, loginUserID, post.id]);

    const handleBookmark = async () => {
        try {
            const res = await axios.post("/api/user/bookmark", {
                user_id: loginUserID,
                post_id: post.id
            });
            if (res.data.message === 'bookmarked added') {
                setIsBookmarked(true);
                console.log(res.data);
            } else if (res.data.message === 'bookmarked removed') {
                setIsBookmarked(false);
                console.log(res.data);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    const handleLike = async () => {
        try {
            const res = await axios.post('/api/post/like', {
                post_id: post.id,
                user_id: loginUserID
            });
            if (res.data.message === 'Post liked') {
                setLike(prev => prev + 1);
                setIsLiked(true);
            } else {
                setLike(prev => prev - 1);
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between gap-12 pt-2 pl-2 pr-2">
                    <Link href={`/${post.user?.username}/status/${post.id}`}>
                        <p className="flex gap-2">
                            <FaRegComment className="text-xl cursor-pointer" />
                            <span>{post.comment_Count}</span>
                        </p>
                    </Link>
                    {/* <p className="flex gap-2">
                        <AiOutlineRetweet className="text-xl cursor-pointer" />
                        <span>16</span>
                    </p> */}
                    <p className={`flex gap-2 ${isLiked ? "text-red-600" : ""}`} onClick={handleLike}>
                        <FaRegHeart className="text-xl cursor-pointer font-black" />
                        <span>{like}</span>
                    </p>
                    <FaRegBookmark
                        className={`text-xl cursor-pointer font-extrabold ${isBookmarked ? 'text-blue-500' : ''}`}
                        onClick={handleBookmark}
                    />
                </div>
            </div>
        </>
    );
};
