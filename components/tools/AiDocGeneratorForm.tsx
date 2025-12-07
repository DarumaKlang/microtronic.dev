// components/tools/AiDocGeneratorForm.tsx

'use client';

import * as React from 'react';
import { processAiPrompt } from '@/app/actions/ai-actions';
import { ValidationErrors } from '@/app/actions/types';

function useFormStatus() {
    const [pending, setPending] = React.useState(false);
    return [pending, setPending] as const;
}

export function AiDocGeneratorForm() {
    const [pending, setPending] = useFormStatus();
    const [streamedResult, setStreamedResult] = React.useState<string>('');
    const [error, setError] = React.useState<string | null>(null);

    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        setPending(true);
        setError(null);
        setStreamedResult('');

        const responseOrStream = await processAiPrompt(formData);

        // ... (ส่วน Logic การจัดการ Error และ Streaming เหมือนเดิม)

        if (responseOrStream && 'fieldErrors' in responseOrStream) {
            const zodError = responseOrStream as ValidationErrors;
            const firstField = Object.keys(zodError.fieldErrors)[0];
            const message = zodError.fieldErrors[firstField]?.[0] || 'Validation failed.';
            setError(`VALIDATION ERROR (${firstField}): ${message}`);
            setPending(false);
            return;
        }

        if (responseOrStream && 'error' in responseOrStream) {
            setError(`SERVER ERROR: ${responseOrStream.error}`);
            setPending(false);
            return;
        }

        if (responseOrStream) {
            try {
                for await (const chunk of responseOrStream) {
                    setStreamedResult(prev => prev + chunk);
                }
            } catch (e) {
                setError("STREAMING FAILED: Could not read full stream.");
                console.error("Stream Error:", e);
            }
        }

        setPending(false);
    };

    return (
        <form ref={formRef} action={handleSubmit} className="p-4 md:p-8 bg-white shadow-lg rounded-xl flex flex-col gap-6 w-full">
            <h3 className="text-xl font-semibold text-gray-800">AI Doc Generator (Gemini Powered)</h3>

            {/* 🟢 ส่วนที่เพิ่ม: คำแนะนำการใช้งาน */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-gray-700">
                <p className="font-semibold mb-2">💡 คำแนะนำการใช้งาน:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>วัตถุประสงค์หลัก :</strong> เครื่องมือนี้ใช้สำหรับแปลหรือสร้างเอกสารทางเทคนิคเป็นภาษาไทย</li>
                    <li><strong>เคล็ดลับ Prompt :</strong> โปรดระบุคำสั่งให้ชัดเจน เช่น สรุปโค้ดนี้และอธิบายทีละขั้นตอน, แปลเอกสารนี้เป็นภาษาไทย หรือ สร้างคู่มือการใช้งานฟังก์ชันนี้</li>
                    <li><strong>ความปลอดภัย :</strong> ข้อมูลของคุณจะถูกส่งไปประมวลผลบนเซิร์ฟเวอร์อย่างปลอดภัย</li>
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="prompt" className="text-sm text-gray-600 font-medium">Prompt:</label>
                <textarea
                    id="prompt"
                    name="prompt"
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full text-gray-400 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ตัวอย่าง: แปลโค้ด Python นี้เป็นภาษาไทย พร้อมอธิบาย: def fib(n): return n if n <= 1 else fib(n-1) + fib(n-2)"
                />
            </div>

            <input type="hidden" name="provider" value="gemini" />
            <input type="hidden" name="targetLanguage" value="Thai" />

            <button
                type="submit"
                disabled={pending}
                className={`py-3 px-6 rounded-lg font-bold transition-colors 
          ${pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
                {pending ? 'Generating...' : 'Generate Documentation'}
            </button>

            {/* Display Result Area */}
            {error && (
                <div className="p-4 rounded-lg mt-4 bg-red-100 text-red-800">
                    <pre className="whitespace-pre-wrap text-sm">{error}</pre>
                </div>
            )}
            {streamedResult && !error && (
                <div className="p-4 rounded-lg mt-4 bg-gray-100 text-gray-800 border-t border-blue-500">
                    <h4 className="font-semibold mb-2">AI Response (Streamed):</h4>
                    <pre className="whitespace-pre-wrap text-sm">{streamedResult}</pre>
                </div>
            )}

            {/* 🟢 ส่วนที่เพิ่ม: ความสามารถ */}
            <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">ความสามารถหลักของเครื่องมือนี้:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li><strong>การแปลเอกสาร :</strong> แปลข้อความภาษาอังกฤษให้เป็นภาษาไทยโดยรักษาความหมายทางเทคนิค</li>
                    <li><strong>การสรุปโค้ด :</strong> ป้อนโค้ดภาษาใดก็ได้ เพื่อให้ AI สรุปหน้าที่และหลักการทำงาน</li>
                    <li><strong>การสร้างคู่มือ</strong> สร้างคู่มือการใช้งานเบื้องต้นจากข้อมูลหรือฟังก์ชันที่ให้มา</li>
                    <li><strong>การตอบคำถามทางเทคนิค</strong> ถามคำถามที่เกี่ยวข้องกับโค้ดหรือสถาปัตยกรรม</li>
                </ul>
            </div>
        </form>
    );
}