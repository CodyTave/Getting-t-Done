"use server";
import { jwtVerify } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Auth(req: Request): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const bearerToken = req.headers.get("authorization")?.split(" ")[1];

    if (!bearerToken) {
      return reject(Response.json({}, { status: 401 }));
    }
    try {
      const validToken = await verifyToken(
        bearerToken,
        process.env.JWT_SECRET as string
      );
      validToken ? resolve() : reject(Response.json({}, { status: 401 }));
    } catch (error) {
      reject(Response.json({ error: error }, { status: 401 }));
    }
  });
}

export async function getUserName(): Promise<string | null> {
  const token = cookies().get("session");
  if (!token) {
    return null;
  }
  try {
    const validToken = await verifyToken(
      token?.value,
      process.env.JWT_SECRET as string
    );
    return (validToken?.payload?.username as string) || null;
  } catch (error) {
    return null;
  }
}
export async function getUser(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    const validToken = await verifyToken(
      token,
      process.env.JWT_SECRET as string
    );
    return validToken?.payload?.id;
  } catch (error) {
    return null;
  }
}

export async function userHasAccess(req: Request, taskUser: string) {
  try {
    const userId = await getUser(req);
    return userId === taskUser;
  } catch (error) {
    return null;
  }
}

function verifyToken(token: string, secret: string) {
  try {
    return jwtVerify(token, new TextEncoder().encode(secret));
  } catch (error) {
    return null;
  }
}

export async function getAuthHeader() {
  const token = cookies().get("session");
  if (!token) {
    return null;
  }
  return `Bearer ${token.value}`;
}
