import { useEffect, useState } from "react";
import { fetchProgress } from "../api/analyze";

export function useProgressTracker(taskId: string | null, intervalMs = 2000) {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const data = await fetchProgress(taskId);
        setProgress(data);

        const total = data.total;
        const allModels = Object.keys(data).filter((k) => k !== "total");
        const allDone = allModels.every((model) => data[model] >= total);

        if (allDone) {
          clearInterval(interval);
          setDone(true);
        }
      } catch (err) {
        console.error("Progress fetch error:", err);
        clearInterval(interval);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [taskId]);

  return { progress, done };
}
