"use client";
import { FilterContext, ModalContext, UserContext } from "@/context/store";
import { getUserName } from "@/services/auth";
import { NextUIProvider, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const username = async () => await getUserName();
    username().then((user) => setUser(user));
  }, []);
  const [user, setUser] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <NextUIProvider>
      <UserContext.Provider value={{ username: user, setUser: setUser }}>
        <ModalContext.Provider
          value={{ isOpen, onOpen, onOpenChange, taskId, setTaskId }}
        >
          <FilterContext.Provider
            value={{ status: filter, setStatus: setFilter }}
          >
            {children}
          </FilterContext.Provider>
        </ModalContext.Provider>
      </UserContext.Provider>
    </NextUIProvider>
  );
}
