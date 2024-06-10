import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn("p-2", className)}
            onClick={handleCopy}
          >
            {copied ? (
              <ClipboardDocumentCheckIcon className="w-4 h-4" />
            ) : (
              <ClipboardIcon className="w-4 h-4 opacity-50" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
