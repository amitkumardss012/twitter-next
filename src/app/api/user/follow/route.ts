import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/database/DB";

export const POST = async (req: NextRequest) => {
    const token = await req.cookies.get("token")?.value;
    if (!token) {
        return errorHandler(400, "user un-authorized",false)
    }

    const decode: any = jwt.verify(token, "myNameIsAmitKumar")

    const logedInUserID = decode.userID

    try {
        const { targerUser_id, followerID } = await req.json()
        
        const existingFollow = await prisma.follows.findFirst({
            where: {
                followerId: Number(followerID),
                followingId: Number(targerUser_id)
            }
        })
    
        if (existingFollow) {
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: Number(followerID),
                        followingId: Number(targerUser_id)
                    }
                }
            })
    
            await prisma.user.update({
                where: {
                    id: Number(logedInUserID)
                },
                data: {
                    following_count: {
                        decrement: 1
                    }
                }
            })
    
            await prisma.user.update({
                where: {
                    id: Number(targerUser_id)
                },
                data: {
                    follower_count: {
                        decrement: 1
                    }
                }
            })
            return NextResponse.json({message: "unfollowed success",success: true}, {status: 200})
        } else {
            await prisma.follows.create({
                data: {
                    followerId: Number(followerID),
                    followingId: Number(targerUser_id)
                }
            })
    
            await prisma.user.update({
                where: {
                    id: Number(logedInUserID),
                },
                data: {
                    following_count: {
                        increment: 1
                    }
                }
            })
    
            await prisma.user.update({
                where: {
                    id: Number(targerUser_id),
                },
                data: {
                    follower_count: {
                        increment: 1
                    }
                }
            })
    
            return NextResponse.json({
                message: "Followed Successfully!",
                success: true
            },{status: 200})
        }
    
    } catch (error) {
        console.log("error",error)
        return errorHandler(500, "internal server error", false)
    }
}