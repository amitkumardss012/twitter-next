import prisma from "@/database/DB";
import { errorHandler } from "@/utils/custumError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest){
    try {
      const cookie = await req.cookies;
      const cookieToken = cookie.get("token");
      if(!cookieToken){
        return errorHandler(400, "userr unauthorized", false)
      }

      const decode:any = jwt.verify(cookieToken.value, "myNameIsAmitKumar")

      const loginUserID = decode.userID

      const post = await prisma.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            }
          }
        },
        orderBy:{
            id: "desc"
        }
      })
  
      return NextResponse.json(
        { message: "success", post, loginUserID},
        { status: 200 }
      )
    } catch (error) {
      return errorHandler(500, error, false);
    }
  }