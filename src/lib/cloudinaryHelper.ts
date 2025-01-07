import cloudinary from "@/config/cloudinary";

export interface UploadImageResult {
  url: string;
  public_id: string;
}

export async function uploadImage(buffer: Buffer): Promise<UploadImageResult> {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "blog-images" }, (error: any, result: any) => {
          if (error) reject(error);
          if (result) {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        })
        .end(buffer);
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
}

export async function deleteImage(publicId: string):Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Failed to delete image");
  }
}
