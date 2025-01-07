import connectToDB from "@/database/config";
import { RegisterSchema } from "@/lib/validations/auth";
import User from "@/models/User.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          error: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const { name, email, password, role } = result.data;

    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
