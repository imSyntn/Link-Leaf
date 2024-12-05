import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        status: 200,
        msg: 'Logged out successfully.'
    })    
    response.cookies.set('token', '')
    return response;
}