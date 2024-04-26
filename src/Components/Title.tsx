import React from "react";

export default function Title({
  children,
  desc,
}: {
  children: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="mb-5">
      <div className="text-3xl font-black text-gray-800 ">{children}</div>
      <p className="mt-2 text-gray-400 text-base sm:text-sm font-medium">
        {desc}
      </p>
    </div>
  );
}
