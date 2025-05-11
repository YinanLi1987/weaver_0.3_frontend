import React from "react";

interface PromptDefinition {
  id: string;
  name: string;
  description: string;
  examples: string;
}

interface Props {
  prompts: PromptDefinition[];
  setPrompts: (prompts: PromptDefinition[]) => void;
}

const PromptDefinitionSection: React.FC<Props> = ({ prompts, setPrompts }) => {
  const handleAdd = () => {
    const newPrompt: PromptDefinition = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      examples: "",
    };
    setPrompts([...prompts, newPrompt]);
  };

  const handleDelete = (id: string) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  const handleChange = (
    id: string,
    field: keyof PromptDefinition,
    value: string
  ) => {
    setPrompts(
      prompts.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">2. Prompt Definitions</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-50 text-gray-700 border-b">
            <tr>
              <th className="p-2 border w-[12.5%]">Entity Category</th>
              <th className="p-2 border w-[37.5%]">Description</th>
              <th className="p-2 border w-[37.5%]">Examples</th>
              <th className="p-2 border w-[12.5%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((item) => (
              <tr key={item.id} className="bg-white border-t">
                <td className="p-2 border">
                  <textarea
                    value={item.name}
                    onChange={(e) =>
                      handleChange(item.id, "name", e.target.value)
                    }
                    rows={2}
                    className="w-full border rounded px-2 py-2 resize-none overflow-hidden"
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                </td>
                <td className="p-2 border">
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      handleChange(item.id, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full border rounded px-2 py-2 resize-none overflow-hidden"
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                </td>
                <td className="p-2 border">
                  <textarea
                    value={item.examples}
                    onChange={(e) =>
                      handleChange(item.id, "examples", e.target.value)
                    }
                    rows={2}
                    className="w-full border rounded px-2 py-2 resize-none overflow-hidden"
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-sm hover:underline"
                    title="Delete"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={handleAdd}
          className="bg-neutral-800 text-white px-3 py-1.5 text-sm rounded-md hover:bg-neutral-900"
        >
          Add Prompt
        </button>
      </div>
    </section>
  );
};

export default PromptDefinitionSection;
