// pages/api/inscriptions/index.ts
import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Inscription from "@/models/inscription";

export async function GET() {
  await ConnectDb();

  try {
    const inscriptions = await Inscription.find({});
    return new Response(JSON.stringify(inscriptions), {
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

export async function POST(req: NextRequest) {
  await ConnectDb();

  try {
    const body = await req.json();
    const newInscription = new Inscription(body);
    await newInscription.save();
    return new Response(JSON.stringify(newInscription), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Erreur de création d'inscription",
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
