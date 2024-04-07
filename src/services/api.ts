"use server";

import { utapi } from "@/upload/uploadthing";

export async function uploadFiles(formData: FormData) {
  const image = formData.get("image");
  console.log("image", image);

  //@ts-ignore
  const response = await utapi.uploadFiles(image);
  console.log("response", response);

  //    ^? UploadedFileResponse[]
}
