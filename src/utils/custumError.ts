import { NextResponse } from "next/server"

export const errorHandler = (statusCode: number, message: any, success: boolean) => { 
    return NextResponse.json({
        message,
        success
    },{status: statusCode})
}