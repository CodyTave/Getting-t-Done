import { Input, Textarea } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  label?: string;
  placeholder?: string;
  textarea?: boolean;
  textStyles?: string;
  create?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  placeholder,
  label,
  textarea = false,
  textStyles,
  create = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(currentValue);
  };

  return isEditing || currentValue === "" || create ? (
    textarea ? (
      <Textarea
        radius="none"
        classNames={{
          inputWrapper: "brutal-shadow-input transall border-2 border-black ",
        }}
        label={label}
        placeholder={placeholder}
        className={textStyles}
        variant="bordered"
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
      />
    ) : (
      <Input
        radius="none"
        classNames={{
          inputWrapper: "brutal-shadow-input transall border-2 border-black ",
        }}
        placeholder={placeholder}
        label={label}
        className={textStyles}
        variant="bordered"
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
      />
    )
  ) : (
    <span className={textStyles} onClick={() => setIsEditing(true)}>
      {currentValue}
    </span>
  );
};

export default EditableText;
