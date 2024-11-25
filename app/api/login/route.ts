import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import * as jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    try {
        const isAvailable = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (isAvailable) {
            const isValid = await bcrypt.compare(password, isAvailable.password)

            if (isValid) {
                const token = jwt.sign({
                    name: isAvailable.name,
                    id: isAvailable.id,
                    userName: isAvailable.userName,
                    email: isAvailable.email
                }, process.env.JWT_SECRET!)
                
                const response = NextResponse.json({
                    name: isAvailable.name,
                    id: isAvailable.id,
                    userName: isAvailable.userName,
                    email: isAvailable.email
                })
                response.cookies.set('token', token, { secure: true, httpOnly: true })
                return response
            } else {
                return NextResponse.json({
                    status: 400,
                    msg: 'Incorrect email or password.'
                })
            }
        } else {
            return NextResponse.json({
                status: 400,
                msg: 'User not Available'
            })
        }
        // await prisma.$disconnect()

    } catch (error: any) {
        console.log(0)
        console.log(error)
        await prisma.$disconnect()
        return NextResponse.json({
            status: 400,
            msg: 'Error Occured.'
        })
    } finally {
        console.log(1111)
        await prisma.$disconnect()
    }
}