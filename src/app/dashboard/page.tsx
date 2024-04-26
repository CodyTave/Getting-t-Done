import { SoonVector } from "@/assets";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[90vh]">
      <div>
        <Image className="w-96" src={SoonVector} alt="Soon" />
      </div>
      <div className="text-3xl font-bold  text-primary-0">Soon...</div>
    </div>
  );
}
