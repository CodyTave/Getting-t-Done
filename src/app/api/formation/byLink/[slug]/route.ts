import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Formation from "@/models/formation";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  await ConnectDb();
  try {
    const formation = await Formation.find({ slug: slug });
    if (!formation) {
      return new Response(
        JSON.stringify({
          message: "Formation non trouvee.",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(JSON.stringify(formation), {
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
