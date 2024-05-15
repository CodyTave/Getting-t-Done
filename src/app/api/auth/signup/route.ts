import connectDB from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();
  await connectDB();
  try {
    if (!username || !password) {
      return NextResponse.json({
        message: "Please fill all the fields",
        status: 400,
      });
    } else {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return NextResponse.json(
          {
            message: "User already exists",
            status: 409,
          },
          {
            status: 409,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          password: hashedPassword,
        });
        if (user) {
          return NextResponse.json(
            {
              status: 201,
              message: "User created successfully",
            },
            {
              status: 201,
            }
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
};
