"use client";
import Card from "@/Components/Card";
import CategoryModal from "@/Components/CategoryModal";
import Title from "@/Components/Title";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button, Skeleton, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const response = await fetch("/api/category", {
      cache: "no-cache",
    });
    const data = await response.json();
    setCategories(data);
    setLoaded(true);
  };
  const handleOpen = (id: string | null) => {
    setOpenCategory(id);
    onOpen();
  };
  return (
    <div>
      <div className="flex justify-between items-center mt-6 md:mt-0">
        <Title desc="Touts les categories des formations Meritel">
          Categories
        </Title>
        <Button
          endContent={<PlusIcon className="w-5 h-5" />}
          onClick={() => handleOpen(null)}
          size="md"
          className="bg-indigo-600 text-white px-8 font-medium"
        >
          Ajouter
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loaded
          ? categories.map((category: any) => (
              <button
                onClick={() => handleOpen(category._id)}
                key={category._id}
              >
                <Card key={category._id} idx={category._id} item={category} />
              </button>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="px-4 py-5 flex items-center gap-5">
                <Skeleton className="flex rounded-full w-12 h-12" />
                <Skeleton className="h-10 w-3/5 rounded-lg" />
              </div>
            ))}
      </div>

      {isOpen && (
        <CategoryModal
          categoryId={openCategory}
          onSubmit={fetchCategories}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
}
