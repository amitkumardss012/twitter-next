import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/database/DB";


export const GET = async (req: NextRequest) => {
    try {
        const token = await req.cookies.get("token");
        if (!token) {
            return errorHandler(400, "user unauthorized", false)
        }
        const decode: any = jwt.verify(token?.value, "myNameIsAmitKumar")
        const userDetails = await prisma.user.findUnique({
            where: {
                id: decode?.userID
            },
            select: {
                name: true,
                username: true,
                createdAt: true,
                follower_count: true,
                following_count: true,
            }
        })
        console.log(userDetails)
        return NextResponse.json({
            message: "success",
            userDetails,
            success: true
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return errorHandler(500, error, false)
    }

}