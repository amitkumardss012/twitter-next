import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/database/DB";


export const GET = async (req: NextRequest) => {
    try {
        const token = await req.cookies.get("token")?.value

        if (!token) {
            return errorHandler(400, "user un-autorized", false)
        }
        
    console.log(token)
        const decode: any = jwt.verify(token, "myNameIsAmitKumar")
        const decodeID = decode.userID;
    
        const allUser = await prisma.user.findMany({
            where: {
                NOT: {
                    id: decodeID
                }
            },
            select: {
                name: true,
                username: true
            }
        })
        return NextResponse.json({
            message: "all user here",
            allUser,
            success: true,
            token
        }, {status: 200})
    } catch (error) {
        console.log(error)
    }
}