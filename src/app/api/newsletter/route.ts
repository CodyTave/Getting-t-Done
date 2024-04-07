import ConnectDb from "@/database/db";
import Newsletter from "@/models/newsletter";

export async function GET() {
  await ConnectDb();
  try {
    const subscriptions = await Newsletter.find({}, { _id: 0 });
    const emails = subscriptions.map((subscription) => subscription.email);
    return new Response(JSON.stringify(emails), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
