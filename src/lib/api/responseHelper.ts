import { NextResponse } from "next/server";
import { ZodError } from "zod";

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  errors?: Record<string, string[]>;
}

export function successResponse(
  data: any,
  status = 200
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string | ZodError,
  status = 500
): NextResponse<ApiResponse> {
  if (message instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    message.errors.forEach((error) => {
      const path = error.path.join(".");
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(error.message);
    });

    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
