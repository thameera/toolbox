import { Button } from "@/components/ui/button";
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
  );
}
