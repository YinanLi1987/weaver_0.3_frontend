//src/components/FinalEntityEditor.tsx
import React from "react";
import EntityInput from "./EntityInput";

interface Props {
  entities: Record<string, string[]>;
  onUpdate: (entities: Record<string, string[]>) => void;
}

const FinalEntityEditor: React.FC<Props> = ({ entities, onUpdate }) => {
  const handleRemove = (field: string, value: string) => {
    onUpdate({
      ...entities,
      [field]: entities[field].filter((e) => e !== value && e.trim() !== ""),
    });
  };

  const handleAdd = (field: string, value: string) => {
    if (!value.trim()) return;
    if (entities[field].includes(value.trim())) return;
    onUpdate({
      ...entities,
      [field]: [...new Set([...entities[field], value])],
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(entities).map(([field, values]) => (
        <div key={field}>
          <label className="font-semibold">{field}</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {values.map((v) => (
              <span key={v} className="bg-blue-100 px-2 py-1 rounded text-sm">
                {v}{" "}
                <button
                  className="text-red-500 ml-1"
                  onClick={() => handleRemove(field, v)}
                >
                  ×
                </button>
              </span>
            ))}
            <EntityInput onAdd={(val) => handleAdd(field, val)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinalEntityEditor;
