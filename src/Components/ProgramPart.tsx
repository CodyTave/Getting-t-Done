import { Button, Input } from "@nextui-org/react";
import MultilineInput from "./MultilineInput";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function ProgramPart({
  module,
  number,
  onTitleChange,
  onPartsChange,
  removeModule,
}: {
  module: { title: string; parts: string[] };
  number: number;
  onTitleChange: (title: string) => void;
  onPartsChange: (parts: string[]) => void;
  removeModule: () => void;
}) {
  return (
    <div className="space-y-3 grid">
      <div className="flex gap-3">
        <h2 className=" text-gray-700 font-semibold">
          {"Module N° " + number}
        </h2>
        {number !== 1 && (
          <button onClick={removeModule}>
            <TrashIcon className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>
      <Input
        onChange={(e) => onTitleChange(e.target.value)}
        value={module.title}
        name="title"
        variant="bordered"
        autoFocus
        label="Titre du Module"
        placeholder="Saisir le titre du module"
        required
      />
      <MultilineInput
        label="Partie du Module"
        placeholder="Saisir la partie du module"
        valuesList={module.parts}
        onChange={onPartsChange}
      />
    </div>
  );
}
