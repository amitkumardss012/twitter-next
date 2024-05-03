import prisma from "@/database/DB";
import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return errorHandler(400, "user unauthorized", false);
    }
    const decode: any = jwt.verify(token.value, "myNameIsAmitKumar");
    const decodeID = decode.userID;
    console.log("decode", decode);

    const userPostsWithImages = await prisma.post.findMany({
      where: {
        user_id: decodeID,
            NOT: {
              image: '',
          }
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
          },
        },
        },
        orderBy: {
          id: 'desc'
      }
    });

    return NextResponse.json(
      {
        message: "all post which contains image",
        userPostsWithImages,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return errorHandler(500, "Internal Server Error", false);
  }
};
