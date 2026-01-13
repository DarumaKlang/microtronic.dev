'use server'

import { IsomorphicEdgeTTS } from "edge-tts-universal";

export async function generateSpeech(text: string, voice: string = 'th-TH-PremwadeeNeural') {
    try {
        if (!text) {
            throw new Error("Text is required for speech generation");
        }

        // Initialize the Edge TTS generator
        // Using Isomorphic version because it works well in Next.js Server Actions
        const tts = new IsomorphicEdgeTTS(text, voice);

        // Synthesize the audio
        const result = await tts.synthesize();

        // The result contains a Blob. Convert it to a Buffer and then to base64.
        const arrayBuffer = await result.audio.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return buffer.toString('base64');
    } catch (error) {
        console.error("Error in generateSpeech (Edge TTS):", error);
        throw new Error("Failed to generate speech using free service");
    }
}
