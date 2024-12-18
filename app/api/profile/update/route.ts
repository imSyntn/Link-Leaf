import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { urlType } from "@/components/UrlContainer";

const prisma = new PrismaClient();

interface ObjType {
  name?: string;
  description?: string;
}

export async function PATCH(request: NextRequest) {
  const { name, description } = await request.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const obj: ObjType = {};

  if (name) {
    obj.name = name;
  }
  if (description) {
    obj.description = description;
  }

  if (!token)
    return NextResponse.json({
      status: 400,
      msg: "Log in first.",
    });

  const { id } = jwt.verify(token.value, process.env.JWT_SECRET!) as JwtPayload;

  if (!id)
    return NextResponse.json({
      status: 400,
      msg: "Token not valid.",
    });

  try {
    const userData = await prisma.user.update({
      where: {
        id: id,
      },
      data: obj,
      select: {
        name: true,
        isVarified: true,
        id: true,
        profilePic: true,
      },
    });
    return NextResponse.json(userData);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      msg: "Error occured.",
    });
  }
}


export async function PUT(request: NextRequest) {
  const userLinks = await request.json();
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);

  // const caseStatements = userLinks.map((item: urlType, index:number) => `WHEN $${index + 1} THEN $${index + 2}`)
  // .join(' ');
  // console.log(cases);
  // const ids = userLinks.map((item: urlType) => item.id);
  // console.log(ids);

  if(!id) {
    return NextResponse.json({
      status: 400,
      msg: 'Id is not available.'
    });
  }

  try {
    await prisma.$queryRawUnsafe(`
    UPDATE "Link"
    SET "sortOrder" = CASE "id"
    ${userLinks
      .map((item: urlType) => `WHEN ${item.id} THEN ${item.sortOrder}`)
      .join(" ")}
    ELSE "sortOrder"
    END
    WHERE "userId" = ${id};
  `);

  return NextResponse.json({
    status: 200,
    msg: 'updated'
  });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Error occured.",
    });
  }
}
