import connectToDB from "@/database/config";
import { verifyCredentials } from "@/lib/auth";
import { signToken } from "@/lib/jwt";
import { LoginSchema } from "@/lib/validations/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await verifyCredentials(email, password);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const accessToken = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user,
        accessToken,
      },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return response;
  } catch (error) {
    console.error("Login error: ", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
