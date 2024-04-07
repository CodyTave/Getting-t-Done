// pages/api/contacts/[id].ts
import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Contact from "@/models/contact";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDb();

  const { id } = params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return new Response(JSON.stringify({ message: "Contact not found" }), {
        status: 404,
        statusText: "Not Found",
      });
    }
    return new Response(JSON.stringify(contact), {
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
    await Contact.findByIdAndDelete(id);
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
