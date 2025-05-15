import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

interface SectionTooltipProps {
  description: string;
}

const SectionTooltip: React.FC<SectionTooltipProps> = ({ description }) => {
  return (
    <Tooltip.Root delayDuration={200}>
      <Tooltip.Trigger asChild>
        <span className="ml-2 text-gray-400 hover:text-gray-600 cursor-help">
          <Info className="w-4 h-4 inline-block" />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={5}
          className="z-50 rounded bg-white border shadow-md p-2 text-sm text-gray-800 max-w-xs"
        >
          {description}
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default SectionTooltip;
