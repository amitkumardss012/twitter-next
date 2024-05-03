import prisma from "@/database/DB";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "@/utils/custumError";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { username, password } = data;

    if (!username || !password) {
      return errorHandler(400, "username and password is required", false)
    }
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

     const userID = user?.id

    if (!user) {
      return errorHandler(400, "username not found", false)
    }

    // const validPassword = await bcrypt.compare(password, user.password)

    if (password !== user.password) {
      return errorHandler(400, "invalid password", false)
    }

    const secret: string = process.env.NEXTAUTH_SECRET || "myNameIsAmitKumar";

    const token = jwt.sign({userID} ,secret, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    const seralized = serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return NextResponse.json(
      {
        message: "successfully Logged in",
        success: true,
        user: user,
      },
      { status: 200, headers: {"Set-Cookie": seralized} }
    )

  } catch (error) {
    return errorHandler(500, "internal server error", false)
  }
}


