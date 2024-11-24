import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token) {
        const { id } = jwt.verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        if (id) {
            try {
                const userData = await prisma.link.findMany({
                    where: {
                        userId: id
                    }
                })
                return NextResponse.json(userData)

            } catch (e) {
                return NextResponse.json({
                    status: 400,
                    msg: 'User not valid.'
                })
            }
        } else {
            return NextResponse.json({
                status: 400,
                msg: "Token not valid."
            })
        }

    } else {
        return NextResponse.json({
            status: 400,
            msg: "Log in first."
        })
    }
}

export async function POST(request: NextRequest) {
    const { siteName, siteURL, description } = await request.json()
    const cookieStore = await cookies();
    const token = cookieStore.get('token')

    if (token) {
        const { id } = jwt.verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        if (id) {
            try {
                const userData = await prisma.link.create({
                    data: {
                        siteName,
                        siteURL,
                        description,
                        author: {
                            connect: {id}
                        }
                    }
                })
                return NextResponse.json(userData)

            } catch (e) {
                return NextResponse.json({
                    status: 400,
                    msg: 'User not valid.'
                })
            }
        } else {
            return NextResponse.json({
                status: 400,
                msg: "Token not valid."
            })
        }
    } else {
        return NextResponse.json({
            status: 400,
            msg: "Log in first."
        })
    }
}

export async function DELETE(request: NextRequest) {
    
}