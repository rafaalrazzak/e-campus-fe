"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

import { Check, Copy, File } from "lucide-react";
import React from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type CodeHighlighterProps = {
    code: string;
    language: string;
    title?: string;
    withIcon?: boolean;
};

export function CodeHighlighter({ code, language, title, withIcon }: CodeHighlighterProps) {
    const [highlightedCode, setHighlightedCode] = React.useState("");
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        const highlight = async () => {
            const result = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypePrettyCode, {
                    theme: "github-light",
                    keepBackground: true,
                })
                .use(rehypeStringify)
                .process(`\`\`\`${language}\n${code}\n\`\`\``);

            setHighlightedCode(result.toString());
        };

        highlight();
    }, [code, language]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card>
            <CardHeader className="-m-4 mb-2 flex flex-row items-center justify-between border bg-secondary p-3 px-4 text-secondary-foreground">
                <div className="flex items-center gap-1">
                    {withIcon && <File className="size-4" />}
                    <span>{title || language}</span>
                </div>
                <Button variant="ghost" size="xs" className="w-fit" onClick={copyToClipboard}>
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
            </CardHeader>
            <pre className="overflow-x-auto text-sm">
                <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
        </Card>
    );
}
