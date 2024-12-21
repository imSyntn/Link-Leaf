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
        if (!isAvailable) return NextResponse.json({
            status: 400,
            msg: 'User not Available'
        })

        const isValid = await bcrypt.compare(password, isAvailable.password)

        if (!isValid) return NextResponse.json({
            status: 400,
            msg: 'Incorrect email or password.'
        })

        const token = jwt.sign({
            name: isAvailable.name,
            id: isAvailable.id,
            userName: isAvailable.userName,
            email: isAvailable.email
        }, process.env.JWT_SECRET!)

        const response = NextResponse.json({
            status: 200,
            name: isAvailable.name,
            id: isAvailable.id,
            userName: isAvailable.userName,
            email: isAvailable.email,
            isVarified: isAvailable.isVarified,
            profilePic: isAvailable.profilePic
        })
        response.cookies.set('token', token, { secure: true, httpOnly: true })
        return response;
        // await prisma.$disconnect()

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 400,
            msg: 'Error Occured.'
        })
    } finally {
        await prisma.$disconnect()
    }
}