// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * Route Handler สำหรับการรับข้อมูล Lead (Email) จาก Lead Magnet (Crop Tool)
 * URL: /api/leads
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // 1. ตรวจสอบข้อมูลเบื้องต้น
        if (!email || typeof email !== 'string') {
            // 400 Bad Request: ข้อมูลไม่สมบูรณ์
            return NextResponse.json(
                { message: 'กรุณาระบุ Email ที่ถูกต้องเพื่อเข้าถึงเครื่องมือ' },
                { status: 400 }
            );
        }

        // *** 2. [Integration Placeholder] จำลองการบันทึกข้อมูล Lead ***
        // ในสถานการณ์จริง:
        // - เชื่อมต่อกับฐานข้อมูล (e.g., PostgreSQL, MongoDB)
        // - ส่งข้อมูลไปยัง CRM/Email Marketing Service (e.g., Mailchimp, HubSpot)
        console.log(`[LEAD CAPTURED] Email: ${email} registered for Lead Magnet.`);
        // await db.saveLead({ email, source: 'CropToolLeadMagnet' }); 

        // 3. ส่งการตอบกลับสำเร็จ
        // สถานะ 200 OK: การรับ Lead ประสบความสำเร็จ
        return NextResponse.json(
            {
                message: 'Lead ถูกบันทึกแล้ว! คุณสามารถเข้าถึงเครื่องมือได้',
                success: true,
                // อาจส่ง Token หรือ URL สำหรับเข้าถึงเครื่องมือกลับไป
            },
            { status: 200 }
        );
    } catch (error) {
        // 4. จัดการข้อผิดพลาดที่ไม่คาดคิด
        console.error('Error processing lead API request:', error);
        // 500 Internal Server Error
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ในการบันทึก Lead' },
            { status: 500 }
        );
    }
}