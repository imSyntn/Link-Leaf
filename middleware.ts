import { NextRequest, NextResponse } from "next/server";

interface RateLimitStoreType {
  [key: string]: {
    count: number;
    time: number;
  };
}

const rateLimitStore: RateLimitStoreType = {};
const limit = 20;
const timeFrame = 60 * 1000;

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";

  for(let item in rateLimitStore) {
    if((Date.now() - rateLimitStore[item].time) > (timeFrame*3) ) {
      delete rateLimitStore[item]
    }
  }

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      count: 1,
      time: Date.now(),
    };
    return NextResponse.next();
  }

  const timeElapsed = Date.now() - rateLimitStore[ip].time;

  if (timeElapsed > timeFrame) {
    rateLimitStore[ip] = {
      count: 1,
      time: Date.now(),
    };
    return NextResponse.next();
  }

  if (rateLimitStore[ip].count >= limit) {
    return NextResponse.json(
      {
        status: 429,
        error: "Too many requests.",
      },
      { status: 429 }
    );
  }

  rateLimitStore[ip].count += 1;
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};