import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/database/DB";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return errorHandler(400, "user Un-authorized", false);
    }
    const decode: any = jwt.verify(token?.value, "myNameIsAmitKumar");

    const logedInUserID = decode.userID;

    const query = req.nextUrl.searchParams.get("query");
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query ?? "",
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: query ?? "",
              mode: "insensitive",
            },
          },
        ],
        NOT: {
          id: Number(logedInUserID),
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    return NextResponse.json(
      {
        message: "success",
        user,
        logedInUserID,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return errorHandler(500, "internal server error", false);
  }
};
