import React, { Key } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface StatusCardProps {
  status: string;
  onChange: (newStatus: string) => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, onChange }) => {
  const statusOptions = [
    {
      key: "notStarted",
      label: "Not Started",
      color: "#f39c12",
      bgColor: "#f8edc8b2",
    },
    {
      key: "inProgress",
      label: "In Progress",
      color: "#2980b9",
      bgColor: "#c7e9f7",
    },
    {
      key: "completed",
      label: "Completed",
      color: "#27ae60",
      bgColor: "#c8f8cd",
    },
  ];

  const currentStatus =
    statusOptions.find((option) => option.key === status) || statusOptions[0];

  return (
    <Dropdown>
      <DropdownTrigger>
        <div
          style={{ backgroundColor: currentStatus.bgColor }}
          className="flex items-center gap-2 brutal-shadow-md border-black border-2 transall w-fit px-3 py-1 cursor-pointer"
        >
          <span
            style={{ background: currentStatus.color }}
            className="h-2 w-2 rounded-full"
          />
          <span
            style={{ color: currentStatus.color }}
            className="text-sm capitalize"
          >
            {currentStatus.label}
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => onChange(key as string)}
        aria-label="Status options"
      >
        {statusOptions.map((option) => (
          <DropdownItem textValue={option.key} key={option.key}>
            <div className="flex items-center gap-2">
              <span
                style={{ background: option.color }}
                className="h-2 w-2 rounded-full"
              />
              <span
                style={{ color: option.color }}
                className="text-sm capitalize"
              >
                {option.label}
              </span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default StatusCard;
