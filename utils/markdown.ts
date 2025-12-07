// utils/markdown.ts

import { remark } from 'remark';
import html from 'remark-html';

/**
 * Fetches the raw README.md content from a GitHub URL and converts it to HTML.
 * @param url The raw GitHub URL to the README.md file.
 * @returns The HTML string of the rendered Markdown.
 */
export async function getMarkdownAsHtml(url: string): Promise<string> {
    console.log(`Fetching Markdown from: ${url}`);
    try {
        const response = await fetch(url, {
            // Essential for Vercel/Node environment to identify the request
            headers: {
                'User-Agent': 'Next.js App'
            },
            // Revalidate every day if data changes are not frequent
            next: { revalidate: 86400 }
        });

        if (!response.ok) {
            // Throw an error if the fetch fails (e.g., 404)
            throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }

        const markdown = await response.text();

        // Use remark to convert Markdown to HTML string
        const result = await remark().use(html).process(markdown);

        return result.toString();
    } catch (error) {
        console.error("Error processing markdown:", error);
        // Return a fallback message if fetching/processing fails
        return `<h2>Error Loading Details</h2><p>Could not load product details from GitHub.</p>`;
    }
}