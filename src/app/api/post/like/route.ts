
import { errorHandler } from "@/utils/custumError"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prisma from "@/database/DB"

export const POST = async (req: NextRequest) => {
    try {
        const token = await req.cookies.get("token")?.value
        if (!token) {
            return errorHandler(401, "Unauthorized", false);
        }
        const decode: any = jwt.verify(token, "myNameIsAmitKumar")
        const loggedInUserID = decode.userID;
        if (!loggedInUserID) {
            return errorHandler(401, "Invalid user", false)
        }
    
        const { post_id, user_id } = await req.json();
        if (!post_id || !user_id) {
            return errorHandler(400, "Missing post_id or user_id", false)
        }
        
        const existingLike = await prisma.like.findFirst({
            where: {
                user_id: loggedInUserID,
                post_id: Number(post_id)
            }
        })
    
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
    
            await prisma.post.update({
                where: {
                    id: Number(post_id)
                },
                data: {
                    like_count: {
                        decrement: 1
                    }
                }
            })
            return NextResponse.json({
                message: "Post disliked",
                success: true
            }, { status: 200 })
        } else {
            await prisma.like.create({
                data: {
                    user_id: loggedInUserID,
                    post_id: Number(post_id)
                }
            })
    
            await prisma.post.update({
                where: {
                    id: Number(post_id)
                },
                data: {
                    like_count: {
                        increment: 1
                    }
                }
            })
            return NextResponse.json({
                message: "Post liked",
                success: true
            }, { status: 200 })
        }
    } catch (error) {
        console.error(error)
        return errorHandler(500, "Internal server error", false)
    }
}
