import { utapi } from "./uploadthing";

export async function uploadImage(file: File) {
  try {
    const { data } = await utapi.uploadFiles(file);
    const imageUrl = data?.url;
    return imageUrl;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function deleteImage(imageUrl: string) {
  const image = imageUrl.split("/").pop() || "";
  try {
    const resp = await utapi.deleteFiles(image!);
    Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
