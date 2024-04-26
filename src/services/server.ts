import { deleteImage, uploadImage } from "@/upload/lib";
import { slugGenerator } from "@/utils/lib";

export async function createCategory(formdata: FormData) {
  const name = formdata.get("name");
  const description = formdata.get("description");
  const imageFile = formdata.get("image");

  if (!name || !description) {
    return Promise.reject(new Error("Missing required fields"));
  }
  try {
    //@ts-ignore
    if (imageFile) {
      const image = await uploadImage(imageFile as File);
      return {
        name: name,
        description: description,
        image,
      };
    } else {
      return {
        name: name,
        description: description,
      };
    }
  } catch (error) {
    throw new Error("Failed to upload image: " + error);
  }
}

export async function updateCategory(formData: FormData, prevImage: string) {
  try {
    const newCategory: Record<string, string> = {};
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key === "image") {
        await deleteImage(prevImage);
        const newImage = await uploadImage(value as File);
        newCategory[key] = newImage!;
      } else {
        newCategory[key] = value!.toString();
      }
    }

    return newCategory;
  } catch (error) {
    throw new Error("Failed to Update Category: " + error);
  }
}

export async function createFormation(formData: FormData) {
  try {
    const formation: Record<string, string> = {};
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key === "image") {
        const imageUrl = await uploadImage(value as File);
        formation[key] = imageUrl!;
      } else if (key === "program") {
        formation[key] = JSON.parse(value.toString());
      } else {
        formation[key] = value.toString();
        if (key === "title") {
          formation["slug"] = slugGenerator(value.toString());
        }
      }
    }

    return formation;
  } catch (error) {
    throw new Error("Failed to create Formation: " + error);
  }
}
export async function updateFormation(formData: FormData, prevImage: string) {
  try {
    const updatedFormation: Record<string, any> = {};
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key === "image" && value instanceof File) {
        await deleteImage(prevImage);
        const newImage = await uploadImage(value);
        updatedFormation[key] = newImage;
      } else if (key === "program") {
        updatedFormation[key] = JSON.parse(value.toString());
      } else {
        updatedFormation[key] = value.toString();
        if (key === "title") {
          updatedFormation["slug"] = slugGenerator(value.toString()); // Update slug based on new title
        }
      }
    }

    return updatedFormation;
  } catch (error) {
    throw new Error("Failed to Update Formation: " + error);
  }
}
