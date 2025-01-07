import { z } from "zod";

// Schema for image data
export const ImageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    public_id: z.string().min(1,"Public ID  is required")
})


// Schema for creating a blog
export const CreateBlogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters"),
    content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must not exceed 10000 characters'),
    image: ImageSchema
})

// Schema for updating a blog
export const UpdateBlogSchema = CreateBlogSchema.partial()

// Type definitions
export type CreateBlogInput = z.infer<typeof CreateBlogSchema>
export type BlogFormData = z.infer<typeof CreateBlogSchema>
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>
export type ImageData = z.infer<typeof ImageSchema>