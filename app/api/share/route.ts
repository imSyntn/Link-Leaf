import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({
        status: 400,
        msg: 'ID not available.'
    })

    try {
        const userData = await prisma.user.findMany({
            where: {
                id: parseInt(id)
            },
            select: {
                email: true,
                isVarified: true,
                name: true,
                links: true,
                profilePic: true,
                description: true
            }
        })
        if (userData) {
            return NextResponse.json({
                status: 200,
                userData,
                msg: 'Ok.'
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 400,
            msg: 'Error.'
        })
    }
}