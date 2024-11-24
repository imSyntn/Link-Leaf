import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import * as jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const { firstName, lastName, email, password } = await request.json()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userName = lastName + '-' + firstName + Math.floor(Math.random() * 100)

    try {
        const newUser = await prisma.user.create({
            data: {
                name: firstName + lastName,
                email,
                userName,
                password: hashedPassword
            }
        })

        const token = jwt.sign({
            name: firstName,
            id: newUser.id,
            isVarified: newUser.isVarified,
            userName: newUser.userName,
            email: newUser.email

        }, process.env.JWT_SECRET!)

        const response = NextResponse.json(newUser)
        response.cookies.set('token', token, { secure: true, httpOnly: true })

        await prisma.$disconnect()

        return response;

    } catch (error: any) {
        console.log(0)
        console.log(error)
        await prisma.$disconnect()
        return NextResponse.json({
            status: 400,
            msg: error.message
        })
    }
}