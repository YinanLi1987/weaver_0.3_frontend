import React from "react";

type ProgressData = Record<string, number>;

interface ModelProgressPanelProps {
  progress: ProgressData;
  done: boolean;
}

const ModelProgressPanel: React.FC<ModelProgressPanelProps> = ({
  progress,
  done,
}) => {
  const total = progress.total || 1;
  const models = Object.entries(progress).filter(([key]) => key !== "total");

  return (
    <div className="mb-4 p-4 bg-gray-50 border rounded-lg">
      <h2 className="font-semibold mb-2">Model Processing Progress</h2>

      {models.map(([model, count]) => (
        <div key={model} className="mb-3">
          <div className="flex justify-between text-sm">
            <span>{model}</span>
            <span>
              {count} / {total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${(count / total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}

      {done && <p className="text-green-600 mt-2">✅ All models finished!</p>}
    </div>
  );
};

export default ModelProgressPanel;
