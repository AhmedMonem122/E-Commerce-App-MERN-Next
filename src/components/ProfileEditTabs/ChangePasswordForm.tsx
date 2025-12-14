"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  changePasswordAction,
  ProfileFormState,
} from "@/app/actions/profile/profileActions";
import SubmitUpdatePasswordButton from "./SubmitUpdatePasswordButton";

const initialState: ProfileFormState = {};

export default function ChangePasswordForm() {
  const [state, formAction] = useActionState(
    changePasswordAction,
    initialState
  );

  const [show, setShow] = useState({
    current: false,
    password: false,
    confirm: false,
  });

  useEffect(() => {
    if (state?.success) toast.success("Password updated successfully");
    if (state?.message) toast.error(state.message);
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto space-y-6 rounded-2xl border bg-background p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Change Password</h2>
      </div>

      {/* Current Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Current Password</label>
        <div className="relative">
          <Input
            name="passwordCurrent"
            type={show.current ? "text" : "password"}
            placeholder="Enter current password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {state?.validationErrors?.passwordCurrent && (
          <p className="text-sm text-destructive">
            {state.validationErrors.passwordCurrent}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium">New Password</label>
        <div className="relative">
          <Input
            name="password"
            type={show.password ? "text" : "password"}
            placeholder="Enter new password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, password: !s.password }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show.password ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {state?.validationErrors?.password && (
          <p className="text-sm text-destructive">
            {state.validationErrors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Confirm New Password</label>
        <div className="relative">
          <Input
            name="passwordConfirm"
            type={show.confirm ? "text" : "password"}
            placeholder="Confirm new password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {state?.validationErrors?.passwordConfirm && (
          <p className="text-sm text-destructive">
            {state.validationErrors.passwordConfirm}
          </p>
        )}
      </div>

      {/* Submit */}
      <SubmitUpdatePasswordButton />
    </form>
  );
}
