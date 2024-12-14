import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({
      status: 400,
      msg: "Id not available.",
    });

  const Year = new Date().getFullYear();
  const Month = new Date().getMonth() + 1;

  try {
    let newCount = await prisma.visitors.findFirst({
      where: {
        userId: parseInt(id),
        year: Year,
        month: Month,
      },
    });
    if (newCount) {
      newCount = await prisma.visitors.update({
        where: {
          id: newCount.id
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    } else {
      newCount = await prisma.visitors.create({
        data: {
          year: Year,
          month: Month,
          userProfile: {
            connect: {
              id: parseInt(id),
            },
          },
        },
      });
    }
    return NextResponse.json({
      status: 200,
      newCount,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Server error.",
    });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if(!id) {
    return NextResponse.json({
      status: 400,
      msg: "Id not available.",
    });
  }

  try {
    const visitorsData = await prisma.visitors.findMany({
      where: {
        userId: parseInt(id)
      },
      select: {
        month: true,
        count: true
      }
    })
    return NextResponse.json({
      data: visitorsData
    })
  } catch (error) {
    console.log(error)
  }
}