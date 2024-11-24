"use client";

import { useCallback, useMemo, useReducer, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/ui/file-uploader";
import { RichEditor } from "@/components/ui/rich-editor";
import { TaskStatus } from "@/components/common/task/task-status";
import { MOCK_TASK } from "@/lib/mocks";
import { useRouterStuff } from "@/hooks";

interface State {
    fileContent: File | null;
    textContent: string | null;
    status: "idle" | "submitting" | "success";
}

type Action =
    | { type: "SET_FILE_CONTENT"; payload: File | null }
    | { type: "SET_TEXT_CONTENT"; payload: string }
    | { type: "SUBMIT" }
    | { type: "SUBMIT_SUCCESS" }
    | { type: "RESET" }
    | { type: "REMOVE_FILE" };

// Components
const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
);

const SuccessMessage = () => (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="flex flex-col items-center justify-center space-y-4 py-8">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >
            <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-green-500">Tugas Berhasil Dikirim!</h3>
            <p className="text-secondary-foreground">Anda akan dialihkan ke dashboard mata kuliah...</p>
        </motion.div>
    </motion.div>
);

// Reducer
const submissionReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_FILE_CONTENT":
            return {
                ...state,
                fileContent: action.payload,
            };
        case "SET_TEXT_CONTENT":
            return {
                ...state,
                textContent: action.payload,
            };
        case "SUBMIT":
            return { ...state, status: "submitting" };
        case "SUBMIT_SUCCESS":
            return { ...state, status: "success", fileContent: null, textContent: null };
        case "RESET":
            return { status: "idle", fileContent: null, textContent: null };
        default:
            return state;
    }
};

export function TaskSubmissionForm() {
    const { router, pathname } = useRouterStuff();
    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useReducer(submissionReducer, {
        fileContent: null,
        textContent: null,
        status: "idle",
    });

    // File handlers
    const formatFileName = useCallback((file: File) => {
        if (!MOCK_TASK.fileNameFormat) return file.name;

        const replacements = {
            "{{task_title}}": MOCK_TASK.title,
            "{{student_id}}": "123456",
            "{{student_name}}": "John Doe",
        };

        return Object.entries(replacements).reduce((name, [key, value]) => name.replace(key, value), MOCK_TASK.fileNameFormat);
    }, []);

    const handleFileSelect = useCallback(
        (files: File[]) => {
            if (files.length > 0) {
                const formattedFile = new File([files[0]], formatFileName(files[0]), {
                    type: files[0].type,
                });
                dispatch({ type: "SET_FILE_CONTENT", payload: formattedFile });
            }
        },
        [formatFileName]
    );

    const handleTextChange = useCallback((content: unknown) => {
        dispatch({ type: "SET_TEXT_CONTENT", payload: JSON.stringify(content) });
    }, []);

    // Get current content based on task type
    const currentContent = useMemo(() => {
        return MOCK_TASK.type === "file" ? (state.fileContent ? [state.fileContent] : null) : state.textContent;
    }, [state.fileContent, state.textContent]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!currentContent) return;

            try {
                dispatch({ type: "SUBMIT" });
                await new Promise((resolve) => setTimeout(resolve, 1000));

                console.log("Submitting task with content:", currentContent);

                startTransition(() => {
                    dispatch({ type: "SUBMIT_SUCCESS" });
                    setTimeout(() => {
                        router.push(pathname.replace(/\/task\/.*/, ""));
                    }, 2000);
                });
            } catch (error) {
                console.error("Error submitting task:", error);
                dispatch({ type: "RESET" });
            }
        },
        [currentContent, router, pathname]
    );

    // Memoized file upload component
    const FileUploadComponent = useMemo(
        () => (
            <>
                <FileUploader onUpload={handleFileSelect} multiple={false} />
            </>
        ),
        [handleFileSelect]
    );

    // Memoized rich editor component
    const RichEditorComponent = useMemo(() => <RichEditor onChange={handleTextChange} />, [handleTextChange, state.textContent]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>{MOCK_TASK.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="wait">
                        {state.status === "success" ? (
                            <SuccessMessage />
                        ) : (
                            <motion.form id="taskSubmissionForm" onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="space-y-4">{isPending ? <LoadingSpinner /> : MOCK_TASK.type === "file" ? FileUploadComponent : RichEditorComponent}</div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </CardContent>
                {state.status !== "success" && (
                    <CardFooter>
                        <Button
                            type="submit"
                            form="taskSubmissionForm"
                            disabled={!currentContent || state.status === "submitting" || isPending}
                            className="w-full"
                            loading={state.status === "submitting"}
                        >
                            {isPending ? "Memproses..." : "Kirim Tugas"}
                        </Button>
                    </CardFooter>
                )}
            </Card>

            <aside className="lg:col-span-1">
                <TaskStatus {...MOCK_TASK} />
            </aside>
        </div>
    );
}
