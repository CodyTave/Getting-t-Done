import type { NextRequest } from "next/server";
import ConnectDb from "@/database/db";
import Task from "@/models/task";
import { Auth, userHasAccess } from "@/services/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDb();
    await Auth(req);
    const id = params.id;
    const task = await Task.findById(id);
    if (!task) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }
    const hasAccess = await userHasAccess(req, task.user.toString());
    if (!hasAccess) {
      return new Response(JSON.stringify({ message: "Access Denied" }), {
        status: 401,
      });
    }
    return new Response(JSON.stringify(task), {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDb();
    await Auth(req);
    const id = params.id;
    const body = await req.json();
    const prevTask = await Task.findById(id);
    if (!prevTask) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }
    const hasAccess = await userHasAccess(req, prevTask.user.toString());
    if (!hasAccess) {
      return new Response(JSON.stringify({ message: "Access Denied" }), {
        status: 401,
      });
    }

    const task = await Task.findByIdAndUpdate(id, body, {
      new: true,
    });
    return new Response(JSON.stringify(task), {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await ConnectDb();
  try {
    const prevTask = await Task.findById(id);
    if (!prevTask) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }

    const hasAccess = await userHasAccess(req, prevTask.user.toString());
    if (!hasAccess) {
      return new Response(JSON.stringify({ message: "Access Denied" }), {
        status: 401,
      });
    }
    await Task.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
