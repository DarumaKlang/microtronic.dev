'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Play, Loader2, Download, Trash2, Settings2, Info } from 'lucide-react';
import { generateSpeech } from '@/app/actions/speak';
import { GRADIENT_TEXT_CLASS, GLASS_PANEL_CLASS } from '@/constants/data';
import GooeyBackground from '@/components/GooeyBackground';

const VOICES = [
    { id: 'th-TH-PremwadeeNeural', name: 'Premwadee (TH)', desc: 'Smooth Thai Female' },
    { id: 'th-TH-NiwatNeural', name: 'Niwat (TH)', desc: 'Professional Thai Male' },
    { id: 'en-US-AriaNeural', name: 'Aria (EN)', desc: 'Natural English Female' },
    { id: 'en-US-GuyNeural', name: 'Guy (EN)', desc: 'Natural English Male' },
    { id: 'ja-JP-NanamiNeural', name: 'Nanami (JP)', desc: 'Sweet Japanese Female' },
    { id: 'ja-JP-KeitaNeural', name: 'Keita (JP)', desc: 'Friendly Japanese Male' },
] as const;

type VoiceId = string;

export default function AISpeakPage() {
    const [text, setText] = useState('');
    const [voice, setVoice] = useState<VoiceId>('th-TH-PremwadeeNeural');
    const [isGenerating, setIsGenerating] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleGenerate = async () => {
        if (!text.trim()) {
            setError('Please enter some text to speak.');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setAudioUrl(null);

        try {
            const base64Audio = await generateSpeech(text, voice);
            const audioBlobOrUrl = `data:audio/mp3;base64,${base64Audio}`;
            setAudioUrl(audioBlobOrUrl);

            // Auto play
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 100);
        } catch (err) {
            console.error(err);
            setError('Failed to generate speech. Please try a shorter text or check your connection.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClear = () => {
        setText('');
        setAudioUrl(null);
        setError(null);
    };

    const handleDownload = () => {
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `speech-${voice}-${Date.now()}.mp3`;
            link.click();
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
            <GooeyBackground />

            <main className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
                        <Volume2 className="w-4 h-4" />
                        AI Developer Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        AI <span className={GRADIENT_TEXT_CLASS}>Speak</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Transform your text into lifelike speech using Microsoft Edge&apos;s high-quality neural voices.
                        <strong> 100% Free</strong> to use for your projects.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`lg:col-span-2 ${GLASS_PANEL_CLASS} rounded-3xl p-6 md:p-8 flex flex-col gap-6`}
                    >
                        <div className="flex items-center justify-between">
                            <label htmlFor="text-input" className="text-lg font-semibold flex items-center gap-2">
                                Input Text
                                <Info className="w-4 h-4 text-gray-500 cursor-help" />
                            </label>
                            <button
                                onClick={handleClear}
                                className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear
                            </button>
                        </div>

                        <textarea
                            id="text-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text here... (English, Thai, and more supported)"
                            className="w-full h-64 bg-slate-800/50 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none text-lg text-white placeholder-gray-500"
                        />

                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !text.trim()}
                                className={`flex-1 group relative flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-bold text-lg overflow-hidden transition-all transform active:scale-95 ${isGenerating || !text.trim()
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-[0_0_30px_-5px_rgba(219,39,119,0.5)]'
                                    }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        Generate & Speak
                                    </>
                                )}
                            </button>

                            {audioUrl && (
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-semibold"
                                >
                                    <Download className="w-5 h-5" />
                                    Download MP3
                                </button>
                            )}
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {audioUrl && (
                            <div className="hidden">
                                <audio ref={audioRef} src={audioUrl} />
                            </div>
                        )}
                    </motion.div>

                    {/* Settings Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-8"
                    >
                        <div className={`${GLASS_PANEL_CLASS} rounded-3xl p-6`}>
                            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                                <Settings2 className="w-5 h-5 text-pink-400" />
                                <h3 className="font-bold text-xl">Voice Settings</h3>
                            </div>

                            <div className="space-y-3">
                                {VOICES.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setVoice(v.id)}
                                        className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${voice === v.id
                                            ? 'bg-pink-600/20 border-pink-500/50 text-white shadow-lg'
                                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10'
                                            }`}
                                    >
                                        <div>
                                            <div className="font-bold">{v.name}</div>
                                            <div className="text-xs opacity-60">{v.desc}</div>
                                        </div>
                                        {voice === v.id && (
                                            <motion.div
                                                layoutId="voice-indicator"
                                                className="w-2 h-2 rounded-full bg-pink-500"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-6">
                            <h4 className="font-bold mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-400" />
                                Developer Tip
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Powered by <strong>Microsoft Edge TTS</strong>. No API keys required.
                                Enjoy unlimited text-to-speech generation with high-fidelity neural voices.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
