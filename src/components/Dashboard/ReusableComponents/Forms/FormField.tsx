import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormFieldConfig } from "@/types/form";
import { FileInput } from "./FileInput";

export default function FormField<T>({
  field,
  error,
}: {
  field: FormFieldConfig<T>;
  error?: string;
}) {
  const { name, label, type, placeholder, options, defaultValue } = field;

  return (
    <div className="space-y-1">
      {label && <Label className="text-indigo-600">{label}</Label>}

      {type === "text" && (
        <Input
          name={name as string}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/50 focus-visible:border-indigo-600/50"
        />
      )}

      {type === "number" && (
        <Input
          type="number"
          name={name as string}
          defaultValue={defaultValue}
          className="border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/50 focus-visible:border-indigo-600/50"
        />
      )}

      {type === "textarea" && (
        <Textarea
          name={name as string}
          defaultValue={defaultValue}
          className="border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/50 focus-visible:border-indigo-600/50"
        />
      )}

      {type === "select" && (
        <Select name={name as string} defaultValue={defaultValue || undefined}>
          <SelectTrigger className="border-indigo-600 data-[placeholder]:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/50 focus-visible:border-indigo-600/50">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((o) => (
              <SelectItem
                key={o.value}
                value={o.value}
                className="data-[state=checked]:bg-indigo-100 data-[state=checked]:text-indigo-900 data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900"
              >
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {type === "file" && (
        <div className="space-y-1">
          <FileInput<T> field={field} />
        </div>
      )}

      {type === "switch" && (
        <Switch name={name as string} defaultChecked={defaultValue} />
      )}

      {type === "hidden" && (
        <input
          name={name as string}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          className="border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/50 focus-visible:border-indigo-600/50"
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
