import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
    const seralized = serialize("token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now())
      });

  return NextResponse.json(
    {
        message: "loged out successfully",
        success: true
    },
    {
        status: 201,
        headers: {"Set-Cookie": seralized}
    },
  )
}
