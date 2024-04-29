import { TrashIcon } from "@heroicons/react/20/solid";
import { Button, Textarea } from "@nextui-org/react";

export default function MultilineInput({
  valuesList,
  onChange,
  label,
  placeholder,
}: {
  valuesList: string[];
  onChange: (values: string[]) => void;
  label: string;
  placeholder?: string;
}) {
  const addNewLine = () => {
    if (valuesList.some((value) => value === "")) return;
    onChange([...valuesList, ""]);
  };

  const handleInputChange = (index: number, newValue: string) => {
    const newValues = [...valuesList];
    newValues[index] = newValue;
    onChange(newValues);
  };

  const clearValue = (index: number) => {
    const newValues = valuesList.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const addButtonDisabled = valuesList.some((value) => value === "");

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-5">
        {valuesList.map((item, index) => (
          <Textarea
            key={index}
            value={item}
            onChange={(e) => handleInputChange(index, e.target.value)}
            endContent={
              index !== 0 && (
                <button onClick={() => clearValue(index)}>
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              )
            }
            variant="bordered"
            label={label}
            placeholder={placeholder}
            autoFocus
            required
          />
        ))}
      </div>
      <Button
        color="secondary"
        disabled={addButtonDisabled}
        className="px-5"
        onClick={addNewLine}
      >
        Ajouter
      </Button>
    </div>
  );
}
