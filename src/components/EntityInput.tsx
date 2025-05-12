import React, { useState } from "react";

interface Props {
  onAdd: (value: string) => void;
  placeholder?: string;
}

const EntityInput: React.FC<Props> = ({ onAdd, placeholder }) => {
  const [value, setValue] = useState("");

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      onAdd(value);
      setValue("");
    }
  };

  return (
    <input
      type="text"
      className="mt-1 px-2 py-1 border rounded text-sm"
      placeholder={placeholder || "Add value..."}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKey}
    />
  );
};

export default EntityInput;
