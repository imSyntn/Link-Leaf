import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
    console.log(11)
    const { name, description } = await request.json()
    const cookieStore = await cookies();
    const token = cookieStore.get('token')

    const obj:any = {}

    if (name) {obj.name = name}
    if (description) {obj.description = description}

    if (token) {
        const { id } = jwt.verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        if (id) {
            try {
                const userData = await prisma.user.update({
                    where: {
                        id: id
                    },
                    data: obj
                })
                return NextResponse.json(userData)

            } catch (e) {
                console.log(e)
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