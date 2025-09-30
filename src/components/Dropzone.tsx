import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { Button } from "./ui/button";

type DropzoneProps = {
  value?: File[];
  onChange: (files: File[]) => void;
};

export function Dropzone({ value, onChange }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => onChange(acceptedFiles),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition",
        isDragActive ? "border-teal-500 bg-teal-50" : "border-gray-300"
      )}
    >
      <input {...getInputProps()} />
      {value && value.length > 0 ? (
        <p className="text-sm text-gray-700">{value[0].name}</p>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center">
          <FileText className="text-gray-500" size={24} />
          <p className="text-sm text-gray-500">
            Upload PDF, DOC, TXT,or CSV file
          </p>
          <Button variant="outline">Choose File</Button>
        </div>
      )}
    </div>
  );
}
