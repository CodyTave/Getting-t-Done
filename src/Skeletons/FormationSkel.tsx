import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function FormationSkel() {
  return (
    <div className="space-y-3 flex flex-col">
      <Skeleton className="flex rounded-full w-48 h-48" />
      <Skeleton className="h-8 w-48 rounded-lg" />
      <div className="space-y-8 mt-10">
        <div className="grid md:grid-cols-2 gap-5">
          <Skeleton className="h-8 w-16 rounded-lg " />
          <Skeleton className="h-8 w-16 rounded-lg " />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Skeleton className="h-8 w-16 rounded-lg " />
          <Skeleton className="h-8 w-16 rounded-lg " />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Skeleton className="h-8 w-16 rounded-lg " />
          <Skeleton className="h-8 w-16 rounded-lg " />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 ">
        <Skeleton className="h-16 w-16 rounded-lg " />
        <Skeleton className="h-16 w-16 rounded-lg " />
      </div>
      <div className="grid md:grid-cols-2 gap-5 ">
        <Skeleton className="h-16 w-16 rounded-lg " />
        <Skeleton className="h-16 w-16 rounded-lg " />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Skeleton className="h-8 w-16 rounded-lg " />
        <Skeleton className="h-8 w-16 rounded-lg " />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Skeleton className="h-8 w-16 rounded-lg " />
        <Skeleton className="h-8 w-16 rounded-lg " />
      </div>
    </div>
  );
}
