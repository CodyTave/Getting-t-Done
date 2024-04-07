import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Formation from "@/models/formation";
import { slugGenerator } from "@/utils/lib";
import { createFormation } from "@/services/server";

export async function GET() {
  await ConnectDb();
  try {
    const formations = await Formation.find({});
    return new Response(JSON.stringify(formations), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      statusText: "Server Error",
    });
  }
}

export async function POST(req: NextRequest) {
  await ConnectDb();

  try {
    const body = await req.formData();
    const formationData = await createFormation(body);
    const formation = new Formation(formationData);
    await formation.save();
    return new Response(JSON.stringify(formation), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      statusText: "Bad Request",
    });
  }
}
