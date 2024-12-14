import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({
      status: 400,
      msg: "Invalid email or password",
    });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    const isValid = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!isValid) {
      return NextResponse.json({
        status: 400,
        msg: "Invalid user.",
      });
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        otp: otp,
        userName: pass,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: '"Link Leaf" <otp@linkleaf.work.gd>',
        // to: email,
        to: email,
        subject: "OTP Varification",
        // text: otp.toString(),
        html: `<body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Poppins', sans-serif; color: #ffffff;">
        <div style="max-width: 600px; margin: auto; background-color: #1c1c1c; border-radius: 8px; overflow: hidden; border: 1px solid #252525;">
            <header style="padding: 20px; text-align: center; background-color: #1f1f1f;">
                <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/Screenshot%202024-11-27%20180817.png" alt="Link Leaf Logo" style="height: 40px; border-radius: 9px;">
            </header>
            <main style="padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-weight: 600; margin-bottom: 10px;">Welcome to Link Leaf!</h1>
                <p style="color: #bdbdbd; margin-bottom: 20px;">Your all-in-one hub to organize and share links effortlessly.</p>
                <div style="background-color: #252525; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p style="color: #ffffff; margin: 0;">Here’s your special access code:</p>
                    <p style="font-size: 32px; font-weight: 600; color: #7c4dff; letter-spacing: 4px; margin: 10px 0;">${otp}</p>
                    <p style="color: #bdbdbd; margin: 0;">Please don’t share this code with anyone.</p>
                </div>
                <a href="" style="display: inline-block; margin-top: 30px; padding: 10px 30px; background-color: #7c4dff; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600;">
                    Get Started
                </a>
            </main>
        </div>
    </body>
    `,
      });
      if (info.messageId) {
        return NextResponse.json({
          status: 200,
          msg: info,
        });
      } else {
        return NextResponse.json({
          status: 500,
          msg: "Error in sending message",
          // msg: error,
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        status: 500,
        msg: "Error in sending message",
        // msg: error,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Server Error.",
      // msg: error,
    });
  }
}

export async function PATCH(request: NextRequest) {
  const { email, otp } = await request.json();

  if (!otp || !email) {
    return NextResponse.json({
      status: 400,
      msg: "Invalid email.",
    });
  }

  try {
    const isValid = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!isValid) {
      return NextResponse.json({
        status: 400,
        msg: "Invalid user.",
      });
    }

    if (isValid.otp == otp) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          otp: otp,
          password: isValid.userName!,
          userName: "",
        },
      });
      return NextResponse.json({
        status: 200,
        msg: "Successful",
        ChangePass: true,
      });
    } else {
      return NextResponse.json({
        status: 400,
        msg: "Error.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Error",
    });
  }
}
