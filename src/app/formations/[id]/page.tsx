"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useEffect } from "react";

export default function Formation({ params }: { params: { id: string } }) {
  useEffect(() => {
    const fetchFormation = async () => {};
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          variant="bordered"
          autoFocus
          label="title"
          placeholder="Enter Formation title"
          required
        />
        <Textarea
          name="description"
          variant="bordered"
          autoFocus
          label="title"
          placeholder="Enter Formation title"
          required
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
