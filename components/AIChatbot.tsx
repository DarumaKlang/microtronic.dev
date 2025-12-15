'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined Message Interface
interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'สวัสดีครับ! ยูโร (Euro) เป็น AI Assistant ของ Microtronic ยินดีให้บริการข้อมูลครับ มีอะไรให้ช่วยไหมครับ?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response (Replace with actual API call later)
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'ขอบคุณครับ ระบบกำลังเรียนรู้และจะเชื่อมต่อกับ Google Gemini ในเร็วๆ นี้ เพื่อให้คำตอบที่แม่นยำที่สุดครับ!',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-linear-to-r from-pink-500 to-cyan-500'
                    } text-white`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[60] backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-slate-800/80 p-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-cyan-500 flex items-center justify-center">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">น้องยูโร (AI Support)</h3>
                                    <span className="flex items-center gap-1 text-xs text-green-400">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-pink-600 text-white rounded-br-none'
                                                : 'bg-slate-800 text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none flex gap-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-800/50 border-t border-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="พิมพ์ข้อความ..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 px-4 pr-12 text-sm text-white focus:outline-hidden focus:border-pink-500 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-pink-600 text-white rounded-full hover:bg-pink-500 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-500">Powered by Google Gemini</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
