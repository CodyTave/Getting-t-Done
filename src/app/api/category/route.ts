import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Category from "@/models/category";
import { createCategory } from "@/services/server";

export async function POST(req: NextRequest) {
  await ConnectDb();
  try {
    const body = await req.formData();
    const categoryData = await createCategory(body);
    const category = new Category(categoryData);
    await category.save();
    return new Response(JSON.stringify(category), {
      status: 201,
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

export async function GET() {
  await ConnectDb();

  try {
    const categories = await Category.find({});
    return new Response(JSON.stringify(categories), {
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
