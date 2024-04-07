import ConnectDb from "@/database/db";
import Newsletter from "@/models/newsletter";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  await ConnectDb();
  try {
    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const newSubscription = new Newsletter({ email: email });
    await newSubscription.save();
    return new Response(
      JSON.stringify({ message: "Subscription successful" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ message: "Email already subscribed" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  await ConnectDb();
  try {
    const subscription = await Newsletter.findOneAndDelete({ email: email });
    if (!subscription) {
      return new Response(JSON.stringify({ message: "Email not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: `Email ${email} deleted` }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
