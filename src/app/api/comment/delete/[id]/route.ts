import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/database/DB";

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
    try {
        const token = req.cookies.get("token")
        if (!token) {
            return errorHandler(400, "user unauthorized", false)
        }

        const decode: any = jwt.verify(token.value, "myNameIsAmitKumar")
        const logedInUserID = decode.userID;

        const commentById = await prisma.comment.findFirst({
            where: {
                id: Number(params.id),
                user_id: logedInUserID

            }
        })

        if (!commentById) {
            return  errorHandler(404, 'This comment has been deleted', false);
        }

        const post = await prisma.post.findFirst({
            where: {
                id: commentById.post_id
            }
        })

        await prisma.comment.delete({
            where: {
                id: Number(params.id)
            }
        })

        await prisma.post.update({
            where: {
                id: Number(post?.id)
            },
            data: {
                comment_Count: {
                    decrement: 1
                }
            }
        })


        return NextResponse.json({
            message: "comment deleted successfull",
            success: true
        },{status: 200})

    } catch (error) {
        console.log(error)
        return errorHandler(500, `internal server error ${error}`,false);
    }
};
