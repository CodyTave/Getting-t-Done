import connectDB from "@/database/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { email, password } = await req.json();
  try {
    if (!email || !password) {
      return NextResponse.json({
        message: "Please fill all the fields",
        status: 400,
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({
          status: 400,
          message: "User not found",
        });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return NextResponse.json({
            status: 400,
            message: "Invalid password",
          });
        } else {
          const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
          cookies().set("authToken", authToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
          });
        }
        return NextResponse.json({
          status: 201,
          message: "User login successfully",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
    });
  }
};
