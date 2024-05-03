import { registerSchema } from "@/vailidation/registerValidation";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/database/DB";
import { customErrorMap } from "@/vailidation/custumError";
import jwt from "jsonwebtoken";
import { errorHandler } from "@/utils/custumError";
import { serialize } from "cookie";
import { headers } from "next/headers";
import { use } from "react";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, username, password } = data;
    const validData = registerSchema.parse({ name, email, username, password });

    // const salt = await bcrypt.genSalt(5);
    // const hashedPassword = await bcrypt.hash(validData.password, salt);
    // validData.password = hashedPassword;

    const emailExist = await prisma.user.findUnique({
      where: {
        email: validData.email,
      },
    });

    if (emailExist) {
      return errorHandler(400, "email already exist try another one", false);
    }

    const userExist = await prisma.user.findUnique({
      where: {
        username: validData.username,
      },
    });

    if (userExist) {
      return errorHandler(400, "username already exist try another", false);
    }

    const user = await prisma.user.create({
      data: validData,
    });

    const userID = user?.id
    const secret: string = process.env.NEXTAUTH_SECRET || "myNameIsAmitKumar";

    const token = jwt.sign({ userID }, secret, {
      expiresIn: 60 * 60 * 1000,
    });

    const seralized = serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return NextResponse.json(
      {
        token,
        message: "account created succefully",
        success: true,
        user,
      },
      {
        status: 201,
        headers: {"Set-Cookie": seralized},
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = Object.values(customErrorMap(error));
      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    } else {
      console.log(error)
      return errorHandler(500, "internal server error", false);
    }
  }
}
