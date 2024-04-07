import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Contact from "@/models/contact";

export async function GET() {
  await ConnectDb();

  try {
    const contacts = await Contact.find({});
    return new Response(JSON.stringify(contacts), {
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
    const newContact = new Contact(body);
    await newContact.save();
    return new Response(JSON.stringify(newContact), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Erreur de création de contact",
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
