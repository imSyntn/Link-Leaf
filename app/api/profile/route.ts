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
                    status: 500,
                    msg: 'Error occured.'
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
                            connect: { id }
                        }
                    }
                })
                return NextResponse.json(userData)

            } catch (e) {
                return NextResponse.json({
                    status: 500,
                    msg: 'Error occured.'
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

const checkFields = (siteName: string, siteURL: string, description: string) => {
    const obj : {
        siteName?: string,
        siteURL?: string,
        description?: string
    } = {}
    if (siteName != '') {
        obj.siteName = siteName
    }
    if (siteURL != '') {
        obj.siteURL = siteURL
    }
    if (description != '') {
        obj.description = description
    }
    return obj;
}

export async function PATCH(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('linkId')

    const { siteName, siteURL, description } = await request.json()
    const updates = checkFields(siteName, siteURL, description);

    if (!id) {
        return NextResponse.json({
            status: 200,
            msg: 'Id not valid.'
        })
    } else {
        try {
            const updatedLink = await prisma.link.update({
                where: {
                    id: parseInt(id)
                },
                data: updates
            })
            return NextResponse.json({
                status: 200,
                msg: 'Updated Successfully.'
            })

        } catch (error: any) {
            console.log(error.message)
            return NextResponse.json({
                status: 500,
                msg: 'Error occured.'
            })
        }
    }
}

export async function DELETE(request: NextRequest) {
    const seatchParams = request.nextUrl.searchParams
    const id = seatchParams.get('id')

    if (!id) {
        return NextResponse.json({
            status: 200,
            msg: 'Id not valid.'
        })
    } else {
        try {
            const deletedLink = await prisma.link.delete({
                where: {
                    id: parseInt(id)
                }
            })
            console.log(deletedLink)
            return NextResponse.json({
                status: 200,
                msg: 'Deleted Successfully.'
            })

        } catch (error: any) {
            console.log(error.message)
            return NextResponse.json({
                status: 500,
                msg: 'Error occuted'
            })
        }
    }
}