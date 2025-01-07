import connectToDB from "@/database/config";
import { errorResponse, successResponse } from "@/lib/api/responseHelper";
import { uploadImage } from "@/lib/cloudinaryHelper";
import { CreateBlogSchema } from "@/lib/validations/blog";
import { authenticateUser } from "@/middleware/auth";
import Blog from "@/models/Blog.model";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    return successResponse(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return errorResponse("Error fetching blogs");
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    await connectToDB();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // Validate required fields
    if (!file || !title || !content) {
      return errorResponse("All files are required", 400);
    }
    // Upload image
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const { url, public_id } = await uploadImage(buffer);

    // Validate blog data with Zod
    try {
      const validatedData = CreateBlogSchema.parse({
        title,
        content,
        image: { url, public_id },
      });
      const blog = await Blog.create({ ...validatedData, author: user._id });
      return successResponse(blog, 201);
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(error.errors[0].message, 400);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Error creating blog" },
      { status: 500 }
    );
  }
}
