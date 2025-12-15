const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No API key found in .env.local');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // There isn't a direct "listModels" on the client instance in some versions, 
        // but let's try to just test a simple generation with "gemini-pro" first to see failure details
        // OR we can use the fetch API to hit the list endpoint.

        console.log("Testing gemini-pro...");
        const result = await model.generateContent("Hello");
        console.log("gemini-pro works:", result.response.text());
    } catch (error) {
        console.error("gemini-pro failed:", error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Testing gemini-1.5-flash...");
        const result = await model.generateContent("Hello");
        console.log("gemini-1.5-flash works:", result.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash failed:", error.message);
    }
}

listModels();
