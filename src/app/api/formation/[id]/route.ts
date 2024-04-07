import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Formation from "@/models/formation";
import { updateFormation } from "@/services/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await ConnectDb();
  try {
    const formation = await Formation.findById({ _id: id });
    if (!formation) {
      return new Response(JSON.stringify({ message: "Formation not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(formation), {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await ConnectDb();

  try {
    const formation = await Formation.findByIdAndDelete(id);
    if (!formation) {
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 204 });
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
  const id = params.id;
  await ConnectDb();

  try {
    const body = await req.formData();
    const prevFormation = await Formation.findById(id);
    if (!prevFormation) {
      return new Response(JSON.stringify({ message: "Formation not found" }), {
        status: 404,
      });
    }
    const formationData = await updateFormation(body, prevFormation.image);
    const formation = await Formation.findByIdAndUpdate(id, formationData, {
      new: true,
    });
    return new Response(JSON.stringify(formation), {
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
