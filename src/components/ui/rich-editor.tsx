"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

interface RichEditorProps {
    onChange: (data: any) => void;
}

export function RichEditor({ onChange }: RichEditorProps) {
    const editorRef = useRef<EditorJS | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (isMounted && !editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                placeholder: "Start typing your submission...",
                onChange: async () => {
                    const content = await editor.save();
                    onChange(content);
                },
                tools: {
                    header: {
                        class: require("@editorjs/header"),
                        inlineToolbar: ["link"],
                    },
                    list: {
                        class: require("@editorjs/list"),
                        inlineToolbar: true,
                    },
                    embed: {
                        class: require("@editorjs/embed"),
                        config: {
                            services: {
                                youtube: true,
                                coub: true,
                            },
                        },
                    },
                    image: {
                        class: require("@editorjs/image"),
                        config: {
                            uploader: {
                                uploadByFile(file: File) {
                                    return new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            resolve({
                                                success: 1,
                                                file: {
                                                    url: e.target?.result,
                                                },
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                },
                            },
                        },
                    },
                    attaches: {
                        class: require("@editorjs/attaches"),
                        config: {
                            uploader: {
                                uploadByFile(file: File) {
                                    return new Promise((resolve) => {
                                        resolve({
                                            success: 1,
                                            file: {
                                                url: URL.createObjectURL(file),
                                                name: file.name,
                                                size: file.size,
                                            },
                                        });
                                    });
                                },
                            },
                        },
                    },
                },
            });

            editorRef.current = editor;
        }
    }, [isMounted, onChange]);

    if (!isMounted) {
        return null;
    }

    return <div id="editorjs" className="prose max-w-full min-h-[200px] border rounded-md p-4" />;
}
