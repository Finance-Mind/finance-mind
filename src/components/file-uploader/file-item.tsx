'use client';

import { FileIcon, XIcon } from 'lucide-react';

import type { FileItemProps } from './types';

import { Button } from '@/components/ui/button';

/**
 * Component for displaying individual file items
 */
export function FileItem({ file, onRemove, isProcessing }: FileItemProps) {
  return (
    <li className="flex items-center justify-between bg-muted/50 p-2 text-sm">
      <div className="flex items-center gap-2 flex-1">
        <FileIcon className="h-4 w-4 text-muted-foreground" />

        <span className="truncate max-w-36 flex-1">{file.name}</span>

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
