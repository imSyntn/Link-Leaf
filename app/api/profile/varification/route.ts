import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";
import * as nodemailer from 'nodemailer'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const cookieBucket = await cookies()
    const token = cookieBucket.get('token')

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    if (token) {
        const { id, email } = await jwt.verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        try {
            await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    otp: otp
                }
            })
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.PASS
                }
            });
            const info = await transporter.sendMail({
                from: '"Link Leaf"',
                to: email,
                subject: "Hello!",
                text: otp.toString()
            });

            if (info.messageId) {
                console.log(info)
                return NextResponse.json({
                    status: 200,
                    msg: info
                })
            } else {
                return NextResponse.json({
                    status: 400,
                    msg: info
                })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                status: 400,
                msg: error
            })
        }
    }

}

export async function POST(request: NextRequest) {
    const cookieBucket = await cookies()
    const token = cookieBucket.get('token')
    const { otp } = await request.json()

    if (token) {
        const { id } = await jwt.verify(token?.value, process.env.JWT_SECRET!) as JwtPayload
        if (id && otp) {
            try {
                const user = await prisma.user.findFirst({
                    where: {
                        id: parseInt(id)
                    }
                })

                // return NextResponse.json({
                //     status: 400,
                //     msg: user,
                //     otp: otp
                // })

                if (user) {
                    if (user.otp === otp) {
                        const updateUser = await prisma.user.update({
                            where: {
                                id: parseInt(id)
                            },
                            data: {
                                isVarified: true
                            }
                        })

                        if (updateUser) {
                            return NextResponse.json({
                                status: 200,
                                msg: 'Varified.',
                                varified: true
                            })
                        } else {
                            return NextResponse.json({
                                status: 400,
                                msg: 'Error while updating.'
                            })
                        }
                    } else {
                        return NextResponse.json({
                            status: 400,
                            msg: 'Invalid OTP.'
                        })
                    }
                } else {
                    throw new Error('user not exist.')
                }

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    status: 400,
                    msg: 'Error Occured.'
                })
            }
        } else {
            return NextResponse.json({
                status: 400,
                msg: 'ID not valid.'
            })
        }
    } else {
        return NextResponse.json({
            status: 400,
            msg: 'ID not valid.'
        })
    }
}