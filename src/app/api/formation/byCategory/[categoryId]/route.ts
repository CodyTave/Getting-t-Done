import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Formation from "@/models/formation";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const categoryId = params.categoryId;
  await ConnectDb();
  try {
    const formations = await Formation.find({ category: categoryId });
    if (!formations || formations.length === 0) {
      return new Response(
        JSON.stringify({
          message: "Aucune formation trouvée pour cette catégorie.",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(JSON.stringify(formations), {
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
