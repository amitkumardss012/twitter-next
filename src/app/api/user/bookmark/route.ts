import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/database/DB";

export const POST = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token");
        if (!token) {
            return errorHandler(400, "user un-authorized", false)
        }
    
        const decode: any = jwt.verify(token.value, "myNameIsAmitKumar")
        const logedInUserID = decode.userID
    
        const { post_id, user_id } = await req.json()
        
        if (!post_id || !user_id) {
            return errorHandler(400, "missing user_id and post_id", false)
        }
    
        const existingBookmarked = await prisma.bookmark.findFirst({
            where: {
                post_id: Number(post_id),
                user_id: logedInUserID
            }
        })
        if (existingBookmarked) {
            await prisma.bookmark.delete({
                where: {
                    id: existingBookmarked.id
                }
            })
            await prisma.post.update({
                where: {
                    id: Number(post_id),
                },
                data: {
                    bookmark_count: {
                        decrement: 1
                    },
                }
            });
            return NextResponse.json({
                message: "bookmarked removed",
                success: true,
            })
        } else {
            await prisma.bookmark.create({
                data: {
                    post: {
                        connect: {
                            id: Number(post_id)
                        }
                    },
                    user: {
                        connect: {
                            id: logedInUserID
                        }
                    }
                }
            })

            await prisma.post.update({
                where: {
                    id: Number(post_id),
                },
                data: {
                    bookmark_count: {
                        increment: 1
                    },
                }
            });
            return NextResponse.json({
                message: "bookmarked added",
                success: true
            })
        }
    } catch (error) {
        console.log(error)
        return errorHandler(500, "internal server error", false)
    }
    
}



export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token");
        if (!token) {
            return errorHandler(400, "User unauthorized", false);
        }

        const decode: any = jwt.verify(token.value, "myNameIsAmitKumar");
        const loggedInUserID = decode.userID;

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                user_id: loggedInUserID
            },
            select: {
                post: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                            }
                        },
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })



        // Extract the posts from the bookmarks
        const bookmarkedPosts = bookmarks.map(bookmark => bookmark.post);

        return NextResponse.json({
            success: true,
            bookmarkedPosts,
            loggedInUserID
        }, { status: 200});
    } catch (error) {
        console.error('Error fetching bookmarked posts:', error);
        return errorHandler(500, "Internal server error", false);
    }
};
