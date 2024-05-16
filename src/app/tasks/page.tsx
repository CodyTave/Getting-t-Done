"use client";
import StatusFilter from "@/Components/StatusFilter";
import TaskCard from "@/Components/TaskCard";
import TaskModal from "@/Components/TaskModal";
import UserProfile from "@/Components/UserProfile";
import {
  useFilterContext,
  useModalContext,
  useUserContext,
} from "@/context/store";
import { getAuthHeader } from "@/services/auth";
import { BeakerIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { isOpen, onOpen, onOpenChange, taskId, setTaskId } = useModalContext();
  const { status } = useFilterContext();
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    const authToken = await getAuthHeader();
    const response = await fetch(`/api/tasks?status=${status}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
    });
    if (response.status === 401) {
      redirect("/login");
    }
    const data = await response.json();
    setTasks(data.elements);
    setLoaded(true);
  };
  const handleOpen = (id: string | null) => {
    setTaskId(id);
    onOpen();
  };
  return (
    <div className="p-5 space-y-5">
      <div className="flex justify-between items-center mt-6 md:mt-0">
        <Link href="/">
          <Image
            priority
            className="w-20"
            src="/logo.png"
            alt="logo"
            sizes="100%"
            width={0}
            height={0}
          />
          <p className="text-xs text-default-500 mt-2">
            A new way to handle your business
          </p>
        </Link>
        <div>
          <UserProfile />
        </div>
      </div>
      <div className="flex justify-start items-center gap-3">
        <Button
          endContent={<BeakerIcon className="w-5 h-5" />}
          onClick={() => handleOpen(null)}
          className="bg-orange-500 text-white px-5 font-medium rounded-none brutal-shadow-sm transall "
        >
          New Task
        </Button>
        <StatusFilter onStatusChange={fetchTasks} />
      </div>
      <div className="flex flex-wrap items-start gap-4">
        {loaded ? (
          tasks.length > 0 ? (
            tasks.map((task: any) => (
              <button onClick={() => handleOpen(task._id)} key={task._id}>
                <TaskCard task={task} />
              </button>
            ))
          ) : (
            <div className="h-[70vh] w-full flex flex-col justify-center items-center text-center text-default-400">
              <div>No Tasks yet!</div>
              <div>It seems You have some work to do here ...</div>
            </div>
          )
        ) : (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="flex  w-80 h-40" />
          ))
        )}
      </div>

      {isOpen && <TaskModal onSubmit={fetchTasks} />}
    </div>
  );
}
