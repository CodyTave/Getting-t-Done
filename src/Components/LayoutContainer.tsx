"use client";
import { NextUIProvider } from "@nextui-org/react";
import Sidebar from "./Sidebar";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <Sidebar>{children}</Sidebar>
    </NextUIProvider>
  );
}
