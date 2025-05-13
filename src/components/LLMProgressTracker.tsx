import { useEffect, useState } from "react";
import { fetchProgress } from "../api/progress";

interface Props {
  totalRows: number;
}
interface ProgressMap {
  [model: string]: number;
}
const LLMProgressTracker: React.FC<Props> = ({ totalRows }) => {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchProgress()
        .then(({ progress, total }) => {
          setProgress(progress);
          setTotal(total);
        })
        .catch(console.error);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Model Progress</h2>
      {Object.entries(progress).map(([model, done]) => (
        <div key={model}>
          <div className="text-sm mb-1">
            {model} ({done}/{totalRows})
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${(done / totalRows) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LLMProgressTracker;
