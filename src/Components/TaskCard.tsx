import { timeAgo } from "@/utils/functions";
import { ClockIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function TaskCard({ task }: { task: any }) {
  return (
    <div
      style={{
        backgroundColor:
          task.status === "notStarted"
            ? "#f8edc8"
            : task.status === "inProgress"
            ? "#c7e9f7"
            : task.status === "completed"
            ? "#c8f8cd"
            : "#eeeeee",
      }}
      className="w-80 border border-black brutal-shadow transall p-5 flex flex-col space-y-2 justify-start text-start"
    >
      <div className="font-semibold text-2xl line-clamp-2">{task.title}</div>
      <p className="text-sm text-default-400 line-clamp-3">
        {task.description}
      </p>
      <div className="flex justify-end">
        <div className="text-default-400 text-sm ">
          <span>{timeAgo(task.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
