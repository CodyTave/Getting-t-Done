import { useFilterContext } from "@/context/store";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";

export default function StatusFilter({
  onStatusChange,
}: {
  onStatusChange: () => void;
}) {
  const { setStatus, status } = useFilterContext();
  const onChange = (e: any) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    onStatusChange();
  }, [status]);
  return (
    <Select
      aria-label="Status"
      onChange={onChange}
      value={status!}
      placeholder="Status"
      classNames={{
        mainWrapper: "brutal-shadow-sm transall w-40",
      }}
      radius="none"
      className="w-40"
    >
      <SelectItem value="notStarted" key="notStarted">
        Todo
      </SelectItem>
      <SelectItem value="inProgress" key="inProgress">
        Doing
      </SelectItem>
      <SelectItem value="completed" key="completed">
        Done
      </SelectItem>
    </Select>
  );
}
