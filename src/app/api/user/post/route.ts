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
    const loginUserID = decode.userID
      if (!loginUserID) {
          return errorHandler(401, "invaild user", false)
      }
    const userPosts = await prisma.post.findMany({
      where: {
        user_id: loginUserID,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json({
        loginUserID,
          userPosts,
          success: true,
    },{status: 200,});
  } catch (error) {
      console.log(error)
      return errorHandler(500, error, false)
  }
};
