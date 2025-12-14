"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteAccountAction,
  ProfileFormState,
} from "@/app/actions/profile/profileActions";

const initialState: ProfileFormState = {};

export default function DeleteAccountForm() {
  const [state, formAction] = useActionState(deleteAccountAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("Your account has been permanently deleted");
      window.location.href = "/";
    }

    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="max-w-lg mx-auto border-destructive/40 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3 text-destructive">
        <AlertTriangle className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Delete Account</h2>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Warning message */}
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive leading-relaxed">
          <p className="font-medium mb-1">This action is irreversible.</p>
          <p>
            Deleting your account will permanently remove your profile, orders,
            and all associated data. You will not be able to recover it.
          </p>
        </div>

        {/* Delete form */}
        <form action={formAction}>
          <Button
            type="submit"
            variant="destructive"
            size="lg"
            className="w-full flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete My Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
