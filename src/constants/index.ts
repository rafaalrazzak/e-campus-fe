export const Cookies = {
    SESSION: "session_token",
    TOAST: "toast",
};

export const DEFAULT_FILE_SIZE = 10; // 10MB

export const DOCUMENT_MIME_TYPES = {
    // Document formats
    PDF: "application/pdf",
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ODT: "application/vnd.oasis.opendocument.text",
    RTF: "application/rtf",
    TXT: "text/plain",

    // Spreadsheet formats
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ODS: "application/vnd.oasis.opendocument.spreadsheet",

    // Presentation formats
    PPT: "application/vnd.ms-powerpoint",
    PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ODP: "application/vnd.oasis.opendocument.presentation",

    // Image formats
    JPEG: "image/jpeg",
    PNG: "image/png",
    GIF: "image/gif",
    SVG: "image/svg+xml",

    // Archive formats
    ZIP: "application/zip",
    RAR: "application/vnd.rar",
    "7Z": "application/x-7z-compressed",
} as const;

export const SUBMISSION_TYPES = {
    DOCUMENTS: [DOCUMENT_MIME_TYPES.PDF, DOCUMENT_MIME_TYPES.DOC, DOCUMENT_MIME_TYPES.DOCX],
    PRESENTATIONS: [DOCUMENT_MIME_TYPES.PPT, DOCUMENT_MIME_TYPES.PPTX, DOCUMENT_MIME_TYPES.ODP],
    SPREADSHEETS: [DOCUMENT_MIME_TYPES.XLS, DOCUMENT_MIME_TYPES.XLSX, DOCUMENT_MIME_TYPES.ODS],
    IMAGES: [DOCUMENT_MIME_TYPES.JPEG, DOCUMENT_MIME_TYPES.PNG, DOCUMENT_MIME_TYPES.SVG],
} as const;
