'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { chatWithGemini, ChatMessage } from '@/app/actions/chat';
import { generateBusinessAudit } from '@/app/actions/audit';

// Defined Message Interface
interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    isAudit?: boolean;
}

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuditMode, setIsAuditMode] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'สวัสดีครับ! ผมคือ AI Assistant ผู้เชี่ยวชาญด้านกลยุทธ์เทคโนโลยี 2026 ของ Microtronic ยินดีให้คำปรึกษาเรื่อง High-Performance Web และ AI Strategy ยุคใหม่ครับ',
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

        try {
            if (isAuditMode) {
                const response = await generateBusinessAudit(input);
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: response.message || "ขออภัย ไม่สามารถสร้างรายงานได้",
                    sender: 'bot',
                    timestamp: new Date(),
                    isAudit: true
                };
                setMessages((prev) => [...prev, botMessage]);
                setIsAuditMode(false); // Reset after audit
            } else {
                const history: ChatMessage[] = messages
                    .filter(m => m.sender !== 'bot' || m.id !== '1')
                    .map(m => ({
                        role: m.sender === 'user' ? 'user' : 'model',
                        parts: m.text
                    }));

                const response = await chatWithGemini(history, input);

                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: response.message,
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botMessage]);
            }
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
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
                                    <h3 className="font-bold text-white text-sm">น้องไมโคร (Revenue Architect)</h3>
                                    <span className="flex items-center gap-1 text-xs text-green-400">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        AI Audit Active
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Audit Mode Selector */}
                        {!isAuditMode && messages.length < 5 && (
                            <div className="p-4 bg-blue-500/10 border-b border-blue-500/20">
                                <button
                                    onClick={() => {
                                        setIsAuditMode(true);
                                        setMessages(prev => [...prev, {
                                            id: Date.now().toString(),
                                            text: "🎯 เข้าสู่ช่องทางด่วน: วางแผนกลยุทธ์ 2026! กรุณาส่ง URL หรืออธิบายโปรเจกต์ของคุณ เพื่อให้ผมวิเคราะห์ความสอดคล้องกับ Vision 2026 ของ Microtronic ครับ",
                                            sender: 'bot',
                                            timestamp: new Date()
                                        }]);
                                    }}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                >
                                    <Zap size={14} className="animate-pulse" />
                                    รับคำปรึกษากลยุทธ์ 2026 (Strategy Consult)
                                </button>
                            </div>
                        )}

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-pink-600 text-white rounded-br-none'
                                            : msg.isAudit
                                                ? 'bg-slate-800 border border-blue-500/30 text-gray-200 rounded-bl-none shadow-lg shadow-blue-500/10'
                                                : 'bg-slate-800 text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap leading-relaxed">
                                            {msg.text}
                                        </div>
                                        {msg.isAudit && (
                                            <div className="mt-4 pt-4 border-t border-white/10 text-center">
                                                <Link
                                                    href="/contact?type=audit-followup"
                                                    className="inline-block px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full text-xs font-bold transition-colors"
                                                >
                                                    รับคำปรึกษา Deep Strategy ฟรี
                                                </Link>
                                            </div>
                                        )}
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
                                    placeholder={isAuditMode ? "ส่ง URL หรือไอเดียธุรกิจของคุณ..." : "พิมพ์ข้อความ..."}
                                    className={`w-full bg-slate-900 border ${isAuditMode ? 'border-blue-500' : 'border-slate-700'} rounded-full py-3 px-4 pr-12 text-sm text-white focus:outline-hidden focus:border-pink-500 transition-colors`}
                                />
                                <button
                                    onClick={handleSend}
                                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 ${isAuditMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-pink-600 hover:bg-pink-500'} text-white rounded-full transition-colors`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-500">Gemini Business Architect Mode</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
