import ReactMarkdown from 'react-markdown';

export default function LegalMarkdown({ content }: { content: string }) {
    return (
        <div className="space-y-5 leading-8 text-gray-300 [&_a]:text-cyan-300 [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-5 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-white [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-cyan-300 [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:my-2 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-4 [&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
