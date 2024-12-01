import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import sharp from 'sharp'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

interface CloudinaryUploadResult {
    public_id: string,
    url: string
    [key: string]: any
}

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const formData = await request.formData()
    const img = formData.get("image") as File

    console.log(id)

    if (!img || !id) {
        return NextResponse.json({
            status: 400,
            msg: "No files available"
        })
    }
    try {
        const bytes = await img.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const compressedBuffer = await sharp(buffer)
            .resize({ width: 300 })
            .jpeg({ quality: 70 })
            .toBuffer();

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: "Link_Leaf"
            }, (error, result) => {
                if (error) reject(error)
                else resolve(result as CloudinaryUploadResult)
            })
            uploadStream.end(compressedBuffer)
        })

        await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                profilePic: result.url
            }
        })

        return NextResponse.json({
            status: 200,
            url: result.url,
            id: id
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, msg: 'Error' })
    }
}