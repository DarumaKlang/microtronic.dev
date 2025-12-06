// components/MarkdownViewer.tsx
"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
    content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
    return (
        // ใช้ "prose prose-invert" เพื่อจัดรูปแบบ Markdown
        // prose-lg เพื่อให้อ่านง่ายบน Desktop
        <div className="prose prose-sm md:prose-lg prose-invert max-w-none text-white/90">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}