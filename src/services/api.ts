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
export async function getCategories() {
  const response = await fetch(process.env.API_BASE_URL + "/api/category", {
    cache: "no-cache",
  });
  console.log("response", response);
  return response;
}
