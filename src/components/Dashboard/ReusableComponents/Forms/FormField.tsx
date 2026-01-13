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
      {label && <Label>{label}</Label>}

      {type === "text" && (
        <Input
          name={name as string}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      )}

      {type === "number" && (
        <Input
          type="number"
          name={name as string}
          defaultValue={defaultValue}
        />
      )}

      {type === "textarea" && (
        <Textarea name={name as string} defaultValue={defaultValue} />
      )}

      {type === "select" && (
        <Select name={name as string} defaultValue={defaultValue}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {type === "file" && (
        <div className="space-y-1">
          <Input
            type="file"
            name={name as string}
            multiple={name === "images"}
          />
        </div>
      )}

      {type === "switch" && (
        <Switch name={name as string} defaultChecked={defaultValue} />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
