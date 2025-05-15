// src/components/ConflictTooltip.tsx
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

interface ConflictTooltipProps {
  field: string;
  llmResults: {
    model: string;
    extracted?: Record<string, { entities?: string[] }>;
  }[];
}

const ConflictTooltip: React.FC<ConflictTooltipProps> = ({
  field,
  llmResults,
}) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform">
          ●
        </span>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={5}
          className="z-50 rounded-md bg-white border shadow-md p-3 text-sm text-left space-y-1 max-w-xs"
        >
          {llmResults.map((r) => {
            const modelName = r.model;
            const entityList = r.extracted?.[field]?.entities ?? [];

            return (
              <div key={modelName} className="mb-2">
                <div className="font-semibold text-gray-800">{modelName}</div>
                <ul className="list-disc list-inside text-gray-700 text-sm leading-relaxed ml-2 mt-1">
                  {entityList.length > 0 ? (
                    entityList.map((e, i) => <li key={i}>{e}</li>)
                  ) : (
                    <li className="italic text-gray-400">—</li>
                  )}
                </ul>
              </div>
            );
          })}
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default ConflictTooltip;
