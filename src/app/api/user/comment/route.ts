import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/database/DB";

export const GET = async (req: NextRequest) => {
  try {
    const token = await req.cookies.get("token");
    if (!token) {
      return errorHandler(401, "user unauthorized", false);
    }
    const decode: any = await jwt.verify(token?.value, "myNameIsAmitKumar");
    
    const logedInUserID = decode.userID;
    
      if (!logedInUserID) {
          return errorHandler(401, "invaild user", false)
      }
    const userComment = await prisma.comment.findMany({
      where: {
        user_id: logedInUserID,
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            },
            post: {
                select: {
                    user: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    console.log("usercomment", userComment)
    return NextResponse.json({
        logedInUserID,
          userComment,
          success: true,
    },{status: 200,});
  } catch (error) {
      console.log(error)
      return errorHandler(500, error, false)
  }
};
