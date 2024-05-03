import prisma from "@/database/DB";
import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return errorHandler(400, "user unauthorized", false)
    }

    const decode: any = jwt.verify(token.value, "myNameIsAmitKumar")

    const logedInUserID = decode.userID

    const postByID = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
            post: {
              select: {
                id: true,
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        logedInUserID,
        message: "success",
        success: true,
        postByID,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return errorHandler(500, error, false);
  }
};

// delet post

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return errorHandler(400, "user unauthorized", false);
    }
  
    const decode: any = jwt.verify(token.value, "myNameIsAmitKumar");
    const decodeID = decode.userID
  
    const findPost = await prisma.post.findFirst({
      where: {
        id: Number(params.id),
        user_id: decodeID
      },
    });
  
    if (!findPost) {
      return errorHandler(400, "you are not the owner of this post so you can't delete this post", false)
    }
  
    // delete image on cloudinary pending

    
    await prisma.post.delete({
      where: {
        id: Number(params.id)
      }
    })
  
    return NextResponse.json({
      message: "post deleted success fully",
      success: true
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return errorHandler(500, "internal server error", false)
  }
};
