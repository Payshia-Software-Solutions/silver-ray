
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText: string;
  cancelText: string;
  variant?: 'default' | 'destructive';
}

export function ConfirmationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  variant = 'destructive',
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="text-center p-8 sm:p-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">{title}</AlertDialogTitle>
          {description && (
            <p
              className={cn(
                'font-semibold text-lg py-2',
                variant === 'destructive' && 'text-red-500'
              )}
            >
              {description}
            </p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3 pt-4">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:w-auto px-8 py-2 h-auto text-base">
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              className={cn(
                'w-full sm:w-auto px-8 py-2 h-auto text-base',
                variant === 'destructive'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary hover:bg-primary/90'
              )}
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
