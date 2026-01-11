"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ActionState, FormFieldConfig } from "@/types/form";
import SubmitButton from "./SubmitButton";
import FormField from "./FormField";

export function ActionForm<T>({
  action,
  fields,
  initialData,
  submitLabel,
}: {
  action: (prev: ActionState<T>, formData: FormData) => Promise<ActionState<T>>;
  fields: FormFieldConfig<T>[];
  initialData?: Partial<T>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState<ActionState<T>>(action, {});

  useEffect(() => {
    if (state.success) toast.success(state.message ?? "Saved successfully");
    if (!state.success && state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={String(field.name)}
            field={{
              ...field,
              defaultValue: initialData?.[field.name] ?? field.defaultValue,
            }}
            error={state.errors?.[field.name]}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
