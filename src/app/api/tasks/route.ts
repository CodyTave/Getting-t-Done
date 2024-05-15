import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Task from "@/models/task";
import { paginateModel } from "@/services/server";
import { Auth, getUser } from "@/services/auth";

export async function POST(req: NextRequest) {
  try {
    await ConnectDb();
    await Auth(req);
    const userId = await getUser(req);
    const body = await req.json();
    const taskData = {
      ...body,
      status: "notStarted",
      user: userId,
    };
    const task = new Task(taskData);
    await task.save();
    return new Response(JSON.stringify(task), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error.status === 401) {
      return Response.json({ Status: "Access Unauthorized" }, { status: 401 });
    }
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await ConnectDb();
    await Auth(req);
    const Status = req.nextUrl.searchParams.get("status");
    const query = ["notStarted", "inProgress", "completed"].includes(Status!)
      ? { status: Status }
      : {};
    const userId = await getUser(req);
    const tasks = await paginateModel(Task, req, {
      user: userId,
      ...query,
    }); // this  only fetches tasks of the user logged in
    return new Response(JSON.stringify(tasks), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error.status === 401) {
      return Response.json({ Status: "Access Unauthorized" }, { status: 401 });
    }
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
