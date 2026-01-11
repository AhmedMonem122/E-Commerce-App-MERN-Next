export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "switch"
  | "hidden";

export type FormFieldConfig<T> = {
  name: keyof T;
  label?: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: T[keyof T];
};

export type ActionState<T> = {
  success?: boolean;
  message?: string;
  errors?: Partial<Record<keyof T, string>>;
};
