'use client';

import { FileIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface FileItemProps {
  file: File;
  onRemove: () => void;
  isProcessing: boolean;
}

/**
 * Component for displaying individual file items
 */
export function FileItem({ file, onRemove, isProcessing }: FileItemProps) {
  return (
    <li className="bg-muted/50 dark:bg-muted/30 flex items-center justify-between p-2 text-sm">
      <div className="flex flex-1 items-center gap-2">
        <FileIcon className="text-muted-foreground h-4 w-4" />

        <span className="max-w-36 flex-1 truncate">{file.name}</span>

        <span className="text-muted-foreground min-w-10">({Math.round(file.size / 1024)} KB)</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={isProcessing}
        onClick={e => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <XIcon className="h-4 w-4" />

        <span className="sr-only">Remove file</span>
      </Button>
    </li>
  );
}
