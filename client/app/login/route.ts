import { NextRequest, NextResponse } from "next/server";
type RequestBody = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();
  const value = {
    email: body.email,
    password: body.password,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const data = await res.json();
  if (data.success) {
    // Then set a cookie
    const response = NextResponse.json(
      {
        success: data.success,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "login",
      value: "true",
      httpOnly: true,
    });
    response.cookies.set({
      name: "access_token",
      value: data.access_token, //token value here
      httpOnly: true,
      maxAge: data.expires_in,
    });
    return response;
  }
  return new NextResponse(null, {
    status: 404,
    statusText: "Bad request",
    headers: {
      "Content-Type": "text/plain",
    },
  });
}