import { deleteImage, uploadImage } from "@/upload/lib";

export async function createCategory(formdata: FormData) {
  const name = formdata.get("name");
  const description = formdata.get("description");
  const imageFile = formdata.get("image");

  if (!name || !description || !imageFile) {
    return Promise.reject(new Error("Missing required fields"));
  }
  try {
    //@ts-ignore
    const image = await uploadImage(imageFile as File);
    return {
      name: name,
      description: description,
      image: image,
    };
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
  /// slug generator needed and program manoeuver
  try {
    const formation: Record<string, string> = {};
    const entries = Array.from(formData.entries());

    for (const [key, value] of entries) {
      if (key === "image") {
        const imageUrl = await uploadImage(value as File);
        formation[key] = imageUrl!;
      } else {
        formation[key] = value.toString();
      }
    }

    return formation; // Return the formation object with all form data and the image URL.
  } catch (error) {
    throw new Error("Failed to create Formation: " + error);
  }
}
export async function updateFormation(formData: FormData, prevImage: string) {
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
