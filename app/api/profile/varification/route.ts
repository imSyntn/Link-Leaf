import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";
import * as nodemailer from 'nodemailer'
import {MailtrapTransport} from 'mailtrap'
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
            const TOKEN = process.env.MAILTRAP!
            const transporter = nodemailer.createTransport(
                MailtrapTransport({
                  token: TOKEN,
                })
              );
            const info = await transporter.sendMail({
                from: '"Link Leaf"',
                // to: email,
                to: 'imsyntn@gmail.com',
                subject: "OTP Varification",
                // text: otp.toString(),
                html: `<body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Poppins', sans-serif; color: #ffffff;">
                <div style="max-width: 600px; margin: auto; background-color: #1c1c1c; border-radius: 8px; overflow: hidden;">
                  <header style="padding: 20px; text-align: center; background-color: #1f1f1f;">
                    <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/Screenshot%202024-11-27%20180817.png" alt="Link Leaf Logo" style="height: 40px;">
                  </header>
                  <main style="padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; font-weight: 600;">Welcome to Link Leaf!</h1>
                    <p style="color: #bdbdbd;">Your all-in-one hub to organize and share links effortlessly.</p>
                    <div style="background-color: #252525; padding: 20px; border-radius: 8px; margin-top: 20px;">
                      <p style="color: #ffffff;">Here’s your special access code:</p>
                      <p style="font-size: 32px; font-weight: 600; color: #7c4dff; letter-spacing: 4px;">${otp}</p>
                      <p style="color: #bdbdbd;">Valid for 5 minutes. Please don’t share this code.</p>
                    </div>
                    <a href="" style="display: inline-block; margin-top: 30px; padding: 10px 30px; background-color: #7c4dff; color: #ffffff; text-decoration: none; border-radius: 4px;">Get Started</a>
                  </main>
                </div>
              </body>`
            });

            if (info) {
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