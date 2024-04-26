// pages/api/categories/[id].ts
import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Category from "@/models/category";
import { updateCategory } from "@/services/server";
import { deleteImage } from "@/upload/lib";
import Formation from "@/models/formation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDb();
  const id = params.id;
  const count = req.nextUrl.searchParams.get("count");

  try {
    if (count?.toLowerCase() === "true") {
      const formationsCount = await Formation.countDocuments({ category: id });
      return new Response(JSON.stringify({ formationsCount }));
    }
    const category = await Category.findById(id);
    if (!category) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(category), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDb();
  const id = params.id;

  try {
    const body = await req.formData();
    const prevCategory = await Category.findById(id);
    if (!prevCategory) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }
    const categoryData = await updateCategory(body, prevCategory.image);
    const category = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    return new Response(JSON.stringify(category), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await ConnectDb();
  try {
    const category = Category.findById(id);
    if (!category) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }
    const formationsCount = await Formation.countDocuments({ category: id });
    if (formationsCount > 0) {
      return new Response(
        JSON.stringify({ message: "Category has formations" }),
        {
          status: 400,
        }
      );
    }
    //@ts-ignore
    if (category.image) {
      //@ts-ignore
      await deleteImage(category.image);
    }
    await Category.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
