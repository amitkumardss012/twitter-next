import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/database/DB";

export const GET = async (req: NextRequest) => {
    try {
        const token = await req.cookies.get("token")?.value;
        if (!token) {
            return errorHandler(400, "user un-authorized", false)
        }
    
        const decode: any = jwt.verify(token, "myNameIsAmitKumar");
    
        const loggedInUserID = decode.userID;
    
        const likedPost = await prisma.like.findMany({
            where: {
                user_id: Number(loggedInUserID)
            },
            select: {
                post: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })
    
        const userLikedPost = likedPost.map(item => item.post);
    
        return NextResponse.json({
            success: true,
            userLikedPost,
            loggedInUserID
        },{status: 200})
    } catch (error) {
        return errorHandler(500, "internal server error", false)
    }
}