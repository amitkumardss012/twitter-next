import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/database/DB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  try {
    const token = await req.cookies.get("token");
    if (!token) {
      return errorHandler(400, "user unauthorized", false);
    }
    const decode: any = jwt.verify(token.value, "myNameIsAmitKumar");
    const loginUserID = decode?.userID;

    const userByUsernam = await prisma.user.findUnique({
      where: {
        username: params.username,
      },
      include: {
        Post: {
          include: {
            user: true,
          },
          orderBy: {
            id: "desc",
          },
        },
        comments: {
          include: {
            user: {
              select: {
                username: true,
                name: true,
              },
            },
            post: {
              select: {
                user: true,
              },
            },
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    if (!userByUsernam) {
      return errorHandler(400, "no user found", false);
    }
    const postWhichConatinsImage = await prisma.post.findMany({
      where: {
        user: {
          username: params.username,
        },
        NOT: {
          image: "",
        },
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
        id: "desc",
      },
    });

    const likedPost = await prisma.like.findMany({
      where: {
        user: {
          username: params.username,
        },
      },
      select: {
        post: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const userLikedPost = likedPost.map((item) => item.post);

    return NextResponse.json(
      {
        message: "successfully fetched the data of this user.",
        success: true,
        userByUsernam,
        postWhichConatinsImage,
        userLikedPost,
        loginUserID,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return errorHandler(500, "internal server error", false);
  }
};
