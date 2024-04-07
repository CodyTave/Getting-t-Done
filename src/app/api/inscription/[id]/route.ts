// pages/api/inscriptions/[id].ts
import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Inscription from "@/models/inscription";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDb();

  const { id } = params;
  try {
    const inscription = await Inscription.findById(id);
    if (!inscription) {
      return new Response(
        JSON.stringify({ message: "Inscription not found" }),
        { status: 404, statusText: "Not Found" }
      );
    }
    return new Response(JSON.stringify(inscription), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Erreur du serveur", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDb();

  const { id } = params;
  try {
    await Inscription.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Erreur de suppression",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
