import React, { Key } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
  Avatar,
} from "@nextui-org/react";
import {
  ArrowLeftEndOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useModalContext, useUserContext } from "@/context/store";
import Link from "next/link";
import { logout } from "@/utils/lib";
export default function UserProfile() {
  const { username } = useUserContext();
  const { isOpen, onOpen, onOpenChange, setTaskId } = useModalContext();
  const handleAction = async (key: Key) => {
    switch (key) {
      case "new_task":
        setTaskId(null);
        onOpen();
        break;
      case "logout":
        await logout();
        break;
      default:
        break;
    }
  };
  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Avatar
          color="warning"
          className="text-white cursor-pointer"
          name={username || undefined}
        />
        {/*undefines is just for the component Avatar props type*/}
      </DropdownTrigger>
      <DropdownMenu
        onAction={handleAction}
        aria-label="Custom item styles"
        disabledKeys={["help_and_feedback"]}
        className="p-3"
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem isReadOnly key="profile" className=" gap-2">
            <span className="uppercase font-semibold">@{username}</span>
          </DropdownItem>
          <DropdownItem key="dashboard">
            <Link href="/tasks">All Tasks</Link>
          </DropdownItem>
          <DropdownItem
            key="new_task"
            endContent={<PlusIcon className="w-5 h-5" />}
          >
            New Task
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem
            endContent={<ArrowLeftEndOnRectangleIcon className="w-5 h-5" />}
            color="danger"
            key="logout"
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
