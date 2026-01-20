import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFieldConfig } from "@/types/form";

export function FileInput<T>({ field }: { field: FormFieldConfig<T> }) {
  const [files, setFiles] = useState<File[]>([]);
  const { name } = field;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      name === "images" || name === "imageCover"
        ? { "image/*": [] }
        : undefined,
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "group relative grid h-52 w-full cursor-pointer place-items-center rounded-xl border-2 border-dashed transition-all duration-200",
          // Base Style (Indigo Gray)
          "border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-400",
          // Dark Mode adjustments
          "dark:border-indigo-900/50 dark:bg-indigo-950/10 dark:hover:bg-indigo-950/20",
          // Drag Active State
          isDragActive &&
            "border-indigo-600 bg-indigo-100/50 ring-4 ring-indigo-500/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600",
        )}
      >
        <input
          {...getInputProps()}
          type="file"
          name={name as string}
          multiple={name === "images"}
          accept={
            name === "images" || name === "imageCover" ? "image/*" : "file"
          }
        />

        <div className="flex flex-col items-center justify-center gap-3">
          {/* Animated Icon Container */}
          <div
            className={cn(
              "rounded-full border border-indigo-100 bg-white p-3 shadow-sm transition-transform duration-200 group-hover:scale-110",
              "dark:bg-indigo-950 dark:border-indigo-800",
            )}
          >
            <UploadCloud className="h-8 w-8 text-indigo-600" />
          </div>

          <div className="space-y-1 text-center">
            <p className="text-sm font-semibold text-indigo-950 dark:text-indigo-100">
              {isDragActive
                ? "Drop the files here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 font-medium">
              {name === "images" || name === "imageCover"
                ? "PNG, JPG or WebP (max 3MB)"
                : "Any file up to 3MB"}
            </p>
          </div>
        </div>
      </div>

      {/* File Preview List */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50/30 p-3 dark:border-indigo-900/50 dark:bg-indigo-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-indigo-600 p-1.5 text-white">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-indigo-950 dark:text-indigo-100 truncate max-w-[180px]">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-indigo-600/60 uppercase font-bold">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(files.filter((_, index) => index !== i));
                }}
                className="rounded-full p-1 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
