import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AlertCircle, Upload, X, Eye, FileIcon, ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type FileItem = {
    id: string;
    file: File;
    progress: number;
    preview?: string;
};

type FileUploaderProps = {
    onUpload: (files: File[]) => void;
    onRemove?: (id: string) => void;
    maxSize?: number;
    accept?: string[];
    multiple?: boolean;
    maxFiles?: number;
    className?: string;
};

export const FileUploader = ({
    onUpload,
    onRemove,
    maxSize = 5 * 1024 * 1024, // 5MB default
    accept = ["image/*", "application/pdf"],
    multiple = false,
    maxFiles = 5,
    className = "",
}: FileUploaderProps) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [error, setError] = useState("");
    const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

    // Cleanup previews on unmount
    useEffect(() => {
        return () => files.forEach((file) => file.preview && URL.revokeObjectURL(file.preview));
    }, []);

    const handleDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setError("");

            if (!multiple) {
                acceptedFiles = [acceptedFiles[0]];
                files.forEach((file) => file.preview && URL.revokeObjectURL(file.preview));
                setFiles([]);
            }

            if (files.length + acceptedFiles.length > maxFiles) {
                setError(`Maximum ${maxFiles} files allowed`);
                return;
            }

            const newFiles = acceptedFiles.map((file) => ({
                id: crypto.randomUUID(),
                file,
                progress: 0,
                preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
            }));

            setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
            simulateUpload(newFiles);
        },
        [files.length, maxFiles, multiple, onUpload]
    );

    const simulateUpload = (newFiles: FileItem[]) => {
        newFiles.forEach(({ id }) => {
            let progress = 0;
            const interval = setInterval(() => {
                if (progress >= 100) {
                    clearInterval(interval);
                    onUpload(newFiles.map((f) => f.file));
                    return;
                }
                progress += 10;
                setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)));
            }, 100);
        });
    };

    const removeFile = useCallback(
        (id: string) => {
            setFiles((prev) => {
                const file = prev.find((f) => f.id === id);
                file?.preview && URL.revokeObjectURL(file.preview);
                return prev.filter((f) => f.id !== id);
            });
            onRemove?.(id);
        },
        [onRemove]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        multiple,
        maxFiles,
        maxSize,
        accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
        onDropRejected: (fileRejections) => {
            setError(fileRejections[0]?.errors[0]?.message || "Upload failed");
        },
    });

    const renderPreview = ({ file, preview }: FileItem) => {
        if (file.type.startsWith("image/") && preview) {
            return <img src={preview} alt={file.name} className="max-h-[70vh] w-auto object-contain rounded-lg" />;
        }

        if (file.type === "application/pdf") {
            return <iframe src={URL.createObjectURL(file)} className="w-full h-[70vh] rounded-lg" title={file.name} />;
        }

        return (
            <div className="text-center p-8 flex flex-col items-center gap-4">
                <p className="text-muted-foreground">Preview not available</p>
                <Button
                    onClick={() => {
                        const url = URL.createObjectURL(file);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = file.name;
                        link.click();
                        URL.revokeObjectURL(url);
                    }}
                >
                    Download file
                </Button>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-muted"} ${className}`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className={`w-8 h-8 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-sm text-muted-foreground">{isDragActive ? "Drop files here" : "Drag & drop files or click to browse"}</p>
                    <p className="text-xs text-muted-foreground">
                        Max size: {maxSize / (1024 * 1024)}MB {multiple && `• Max files: ${maxFiles}`}
                    </p>
                </div>
            </div>

            {files.map((fileItem) => (
                <div key={fileItem.id} className="p-4 bg-muted/50 rounded-md border flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            {fileItem.file.type.startsWith("image/") ? <ImageIcon className="size-5 text-primary shrink-0" /> : <FileIcon className="size-5 text-primary shrink-0" />}
                            <span className="text-sm truncate">{fileItem.file.name}</span>
                            <span className="text-xs text-muted-foreground">({Math.round(fileItem.file.size / 1024)}KB)</span>
                        </div>
                        {fileItem.progress < 100 && <Progress value={fileItem.progress} className="h-1 mt-1" />}
                    </div>
                    <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm" onClick={() => setPreviewFile(fileItem)}>
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeFile(fileItem.id)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{previewFile?.file.name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">{previewFile && renderPreview(previewFile)}</div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
