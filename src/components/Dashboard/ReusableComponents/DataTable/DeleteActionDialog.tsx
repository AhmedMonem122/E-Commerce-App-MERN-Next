"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/api/apiClient";

type DeleteActionDialogProps = {
  /** Either provide onDelete OR resource + id */
  onDelete?: () => Promise<unknown>;

  /** REST-style fallback */
  resource?: string;
  id?: string;

  /** React Query */
  invalidateKey?: unknown[];

  /** UI */
  title?: string;
  description?: string;
  onSuccessMessage?: string;

  /** Button customization */
  icon?: React.ReactNode;
  variant?: "ghost" | "destructive";
};

export default function DeleteActionDialog({
  onDelete,
  resource,
  id,
  invalidateKey,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onSuccessMessage = "Deleted successfully",
  icon = <Trash2 className="h-4 w-4" />,
  variant = "ghost",
}: DeleteActionDialogProps) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (onDelete) return onDelete();
      if (!resource || !id)
        throw new Error("DeleteActionDialog: missing delete handler");
      return apiClient.delete(`/${resource}/${id}`);
    },
    onSuccess: () => {
      toast.success(onSuccessMessage);
      if (invalidateKey) {
        qc.invalidateQueries({ queryKey: invalidateKey });
      }
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant={variant}
          className={variant === "ghost" ? "text-red-600" : ""}
        >
          {icon}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
