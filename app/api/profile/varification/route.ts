import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cookieBucket = await cookies();
  const token = cookieBucket.get("token");

  if (!token)
    return NextResponse.json({
      status: 400,
      msg: "token not available",
    });

  const { id, email } = (await jwt.verify(
    token.value,
    process.env.JWT_SECRET!
  )) as JwtPayload;
  let otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const availableOTP = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        otp: true,
      },
    });

    if (!availableOTP?.otp) {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          otp: otp,
        },
      });
    } else {
      otp = availableOTP.otp
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Link Leaf" <link-leaf@sayantan.site>',
      to: email,
      subject: "OTP Verification",
      html: `
        <body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Poppins', sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: auto; background-color: #1c1c1c; border-radius: 8px; overflow: hidden;">
            <header style="padding: 20px; text-align: center; background-color: #1f1f1f;">
              <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/Screenshot%202024-11-27%20180817.png" alt="Link Leaf Logo" style="height: 40px; border-radius: 9px;">
            </header>
            <main style="padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-weight: 600;">Welcome to Link Leaf!</h1>
              <p style="color: #bdbdbd;">Your all-in-one hub to organize and share links effortlessly.</p>
              <div style="background-color: #252525; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p style="color: #ffffff;">Here’s your special access code:</p>
                <p style="font-size: 32px; font-weight: 600; color: #7c4dff; letter-spacing: 4px;">${otp}</p>
                <p style="color: #bdbdbd;">Please don’t share this code with anyone.</p>
              </div>
              <a href="#" style="display: inline-block; margin-top: 30px; padding: 10px 30px; background-color: #7c4dff; color: #ffffff; text-decoration: none; border-radius: 4px;">Get Started</a>
            </main>
          </div>
        </body>
      `,
    });
    if (info.messageId) {
      return NextResponse.json({
        status: 200,
        msg: "Otp sent.",
      });
    } else {
      console.log(info);
      return NextResponse.json({
        status: 500,
        msg: "Error in sending message",
        // msg: error,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      msg: "Internal server error.",
      error: error,
    });
  }
}

export async function POST(request: NextRequest) {
  const cookieBucket = await cookies();
  const token = cookieBucket.get("token");
  const { otp } = await request.json();

  if (!token)
    return NextResponse.json({
      status: 400,
      msg: "ID not valid.",
    });

  const { id } = (await jwt.verify(
    token?.value,
    process.env.JWT_SECRET!
  )) as JwtPayload;

  if (!id || !otp)
    return NextResponse.json({
      status: 400,
      msg: "ID not valid.",
    });

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) throw new Error("user not exist.");

    if (user.otp === otp) {
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          isVarified: true,
        },
      });

      if (updateUser) {
        return NextResponse.json({
          status: 200,
          msg: "Varified.",
          varified: true,
        });
      }
    } else {
      return NextResponse.json({
        status: 400,
        msg: "Invalid OTP.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Error Occured.",
    });
  }
}
