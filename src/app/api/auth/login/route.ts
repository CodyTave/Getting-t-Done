import connectDB from "@/database/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { encrypt, decrypt } from "@/utils/lib";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { username, password } = await req.json();

  try {
    if (!username || !password) {
      return NextResponse.json({
        message: "Please fill all the fields",
        status: 400,
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        {
          status: 400,
          message: "Username does not exist",
        },
        {
          status: 400,
        }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          status: 400,
          message: "Wrong password",
        },
        {
          status: 400,
        }
      );
    }

    const authToken = await encrypt({ id: user._id, username: user.username }); //payload with user data so i can use it in the verif
    const expires = new Date(Date.now() + 10 * 3600000); //  expires in 10 seconds

    cookies().set("session", authToken, {
      httpOnly: true,
      expires: expires,
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Utilisateur connecté avec succes",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Une erreur est survenue. Veuillez reessayer ulterieurement.",
      },
      {
        status: 500,
      }
    );
  }
};
