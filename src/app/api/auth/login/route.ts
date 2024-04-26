import connectDB from "@/database/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { username, password } = await req.json();
  try {
    if (!username || !password) {
      return NextResponse.json({
        message: "Please fill all the fields",
        status: 400,
      });
    } else {
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json(
          {
            status: 400,
            message: "Nom d'utilisateur n'existe pas",
          },
          { status: 400 }
        );
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return NextResponse.json(
            {
              status: 400,
              message: "Mot de passe incorrect",
            },
            { status: 400 }
          );
        } else {
          const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
          cookies().set("session", authToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
          });
        }
        return NextResponse.json(
          {
            status: 201,
            message: "Utilisateur connecté avec succes",
          },
          {
            status: 201,
          }
        );
      }
    }
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
