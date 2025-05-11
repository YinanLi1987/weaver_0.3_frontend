import React from "react";

interface Model {
  id: string;
  name: string;
}

interface Props {
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
}

const availableModels: Model[] = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "claude-3-7-sonnet-20250219", name: "Claude 3" },
  { id: "mistral-small-latest", name: "Mistral 7B" },
];

const LLMSelectionSection: React.FC<Props> = ({
  selectedModels,
  setSelectedModels,
}) => {
  const toggleModel = (id: string) => {
    if (selectedModels.includes(id)) {
      setSelectedModels(selectedModels.filter((mid) => mid !== id));
    } else if (selectedModels.length < 5) {
      setSelectedModels([...selectedModels, id]);
    }
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">3. LLM Selection (max 5)</h2>
      <div className="flex flex-wrap gap-2">
        {availableModels.map((model) => {
          const selected = selectedModels.includes(model.id);
          return (
            <button
              key={model.id}
              onClick={() => toggleModel(model.id)}
              className={`px-3 py-1.5 text-sm rounded-md border ${
                selected
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {model.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default LLMSelectionSection;
