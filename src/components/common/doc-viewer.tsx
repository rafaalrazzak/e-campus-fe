interface DocViewerProps {
    url: string;
}

export function DocViewer({ url }: DocViewerProps) {
    return <iframe src={`https://docs.google.com/viewer?url=${url}&embedded=true`} width="100%" height="100%" />;
}
