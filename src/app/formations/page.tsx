import Title from "@/Components/Title";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import FormationCard from "@/Components/FormationCard";

export default async function Page() {
  const formations = await fetch(process.env.API_BASE_URL + "/api/formation", {
    cache: "no-cache",
  }).then((res) => res.json());
  return (
    <div>
      <div className="flex justify-between items-center mt-6 md:mt-0">
        <Title desc="Touts les formations Meritel disponibles ">
          Formations
        </Title>
        <Button
          href="/formation/nouveau"
          endContent={<PlusIcon className="w-5 h-5" />}
          size="md"
          className="bg-indigo-600 text-white px-8 font-medium"
        >
          <Link href="/formations/nouveau">Ajouter</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {formations.map((formation: any) => (
          <Link key={formation._id} href={`/formations/${formation._id}`}>
            <FormationCard {...formation} />
          </Link>
        ))}
      </div>
    </div>
  );
}
