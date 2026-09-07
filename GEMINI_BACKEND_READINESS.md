# Backend Readiness Report for Gemini

วันที่ตรวจ: 2026-09-07  
Repository: https://github.com/DarumaKlang/microtronic.dev.git  
Revision ที่ตรวจ: `6a42bf6` (`update conn facebook`)  
Stack: Next.js 16.2.6, React 19.2.1, TypeScript 5.9.3, pnpm 10.33.2

## Executive Summary

โครงการ build เป็น production ได้และมี backend surface ขนาดเล็ก แต่ยัง **ไม่พร้อมสำหรับ production backend ที่เก็บข้อมูลจริงหรือรองรับ public traffic โดยไม่เพิ่ม hardening**.

สถานะโดยสรุป:

| พื้นที่ | สถานะ | หมายเหตุ |
| --- | --- | --- |
| Production build | ผ่าน | `pnpm build` ผ่าน และ generate routes ได้ 28 routes |
| TypeScript | ผ่านใน build | Next.js production build ตรวจ TypeScript ผ่าน |
| Lint | ไม่ผ่าน | มี error 1 จุด และ warning 2 จุดที่ไม่เกี่ยวกับ backend โดยตรง |
| API route | มี 1 route | `POST /api/leads` แต่ยังไม่ persist ข้อมูล |
| Server Actions | มี 4 ฟังก์ชัน | Gemini chat, audit, streaming prompt และ Edge TTS |
| Database/persistence | ยังไม่มี | ไม่พบ Prisma schema, SQL migration หรือ database client |
| Authentication/authorization | ไม่มี | ไม่พบ auth flow หรือ RBAC |
| Rate limiting/abuse protection | ไม่มี | Public AI และ lead endpoints ไม่มี rate limit |
| Automated tests | ไม่พบ | ไม่มี test script หรือ test files ที่ตรวจพบ |
| Deployment config | พึ่งค่าเริ่มต้น | ไม่พบ `vercel.json` หรือ runtime/health-check config |

## Backend Surface

### 1. `POST /api/leads`

ไฟล์: `app/api/leads/route.ts`

- รับ JSON ที่มี field `email`
- ตรวจเพียงว่ามีค่าและเป็น string
- พิมพ์ email ลง server log
- ไม่ได้บันทึกลง database, CRM หรือ email marketing service
- ตอบ `200` และ `success: true` แม้ไม่มีการบันทึกถาวร
- ไม่มี email format validation ด้วย Zod หรือ schema ที่เข้มงวด
- ไม่มี rate limiting, deduplication, consent metadata, source validation หรือ anti-bot protection
- ไม่จำกัด request body size อย่างชัดเจน

ผลกระทบ: client อาจแสดงว่า lead ถูกบันทึกแล้ว ทั้งที่ระบบไม่มี durable storage และ email อาจถูกเก็บใน log ซึ่งควรพิจารณาเป็นข้อมูลส่วนบุคคล.

ผู้เรียกใช้คือ `components/LeadMagnet/CropToolWrapper.tsx` ซึ่งปลดล็อกด้วย `localStorage` เท่านั้น จึงไม่ใช่ access control และผู้ใช้สามารถแก้ค่าใน browser ได้.

### 2. Contact form

ไฟล์: `app/contact/page.tsx`

- ส่งข้อมูลจาก browser โดยตรงไปยัง Formspree endpoint
- ไม่ได้ผ่าน API route หรือ server action ของ repository
- ไม่มี server-side validation, spam protection หรือ schema validation ใน repository
- ความพร้อมของ flow นี้ขึ้นกับ Formspree endpoint และการตั้งค่าในบัญชีภายนอก

ข้อสังเกต: หน้าแสดงข้อความว่า Formspree เป็น serverless integration แต่ repository ไม่มีการควบคุมหรือ audit ข้อมูลหลังจากส่งออกไป.

### 3. Gemini server actions

ไฟล์หลัก:

- `app/actions/chat.ts` - `chatWithGemini(history, newMessage)`
- `app/actions/audit.ts` - `generateBusinessAudit(businessIdea)`
- `app/actions/ai-actions.ts` - `processAiPrompt(formData)` และ streaming Gemini
- `components/AIChatbot.tsx` เป็น client caller ของ chat และ audit
- `components/tools/AiDocGeneratorForm.tsx` เป็น client caller ของ document generator

สิ่งที่มี:

- เรียก Google Gemini ผ่าน `@google/generative-ai`
- มีการจัดการ error เบื้องต้นและข้อความ fallback ให้ผู้ใช้
- `processAiPrompt` ใช้ Zod ตรวจ `prompt`, `targetLanguage` และ `provider`
- UI ของ document generator จำกัด prompt ไว้ 500 ตัวอักษร

ช่องว่างที่ต้องแก้:

- `chatWithGemini` และ `generateBusinessAudit` รับ string/history จาก client โดยไม่มี schema validation หรือ max length ฝั่ง server
- ไม่มี conversation/session ownership, authentication หรือ quota ต่อผู้ใช้/IP
- ไม่มี rate limiting และอาจถูกใช้เพื่อสร้างค่าใช้จ่าย Gemini หรือทำให้ function ถูกใช้งานเกิน quota
- `app/actions/ai-actions.ts` ตรวจ API key ตอนสร้าง client ไม่ได้ตรวจและตอบ error ที่ชัดเจนก่อนเรียก model หาก key หาย
- model names ไม่สอดคล้องกัน: `gemini-2.5-flash`, `gemini-flash-latest` และใน `lib/ai-studio.ts` คือ `gemini-pro`
- ไม่มี timeout, retry/backoff ที่เป็นระบบ, request ID หรือ structured logging
- history ที่ส่งเข้า chat ถูกควบคุมโดย client จึงควรจำกัดจำนวนข้อความและความยาวรวมฝั่ง server

### 4. Text-to-speech

ไฟล์: `app/actions/speak.ts`, `app/speak/page.tsx`

- ใช้ `edge-tts-universal` ผ่าน Server Action
- รับ `text` และ `voice` จาก client
- คืน audio เป็น base64 ทั้งก้อน
- ไม่มี max text length, allowlist ของ voice ฝั่ง server, rate limit หรือการจำกัดขนาด response
- การคืน base64 เพิ่ม memory และ payload overhead เมื่อข้อความยาว
- ไม่พบการรับประกัน SLA/availability เพราะพึ่ง free service ที่ไม่ได้มี account-level control ใน repository

## Secrets and Environment Variables

ไฟล์ที่เกี่ยวข้อง:

- `app/actions/ai-actions.ts`
- `app/actions/chat.ts`
- `app/actions/audit.ts`
- `lib/ai-studio.ts`
- `lib/env.ts`
- `.gitignore`

สิ่งที่พบ:

- `.gitignore` ignore `.env*` ซึ่งเป็นพฤติกรรมที่ถูกต้องสำหรับ secret files
- ใช้ `GEMINI_API_KEY` ใน server actions
- `chat.ts` และ `audit.ts` fallback ไปที่ `NEXT_PUBLIC_GEMINI_API_KEY`
- `lib/ai-studio.ts` ใช้ `NEXT_PUBLIC_GEMINI_API_KEY`
- การใช้ prefix `NEXT_PUBLIC_` กับ Gemini key มีความเสี่ยงทำให้ key ถูก bundle หรือเปิดเผยต่อ browser หากถูก import ใน client path
- `lib/env.ts` ตรวจเพียง `NODE_ENV` และไม่ได้ validate required runtime variables เช่น `GEMINI_API_KEY`

คำแนะนำ: ใช้ server-only `GEMINI_API_KEY` เท่านั้น, ลบ fallback ที่เป็น `NEXT_PUBLIC_`, รวม env validation ไว้จุดเดียว และ fail fast ตอน deploy เมื่อ production secret หาย.

## Security and Reliability Assessment

### High priority

1. **ไม่มี durable lead storage**: `/api/leads` เป็น placeholder แต่ตอบ success จริง
2. **ไม่มี abuse protection สำหรับ public AI actions**: เสี่ยง quota exhaustion, cost abuse และ denial of service ระดับ application
3. **มีเส้นทางที่อาจใช้ public Gemini key**: ต้องยืนยันว่า `NEXT_PUBLIC_GEMINI_API_KEY` ไม่เคยถูกตั้งหรือเผยแพร่ และควรเลิกใช้อย่างถาวร
4. **ไม่มี server-side input limits ที่สอดคล้องกัน**: chat, audit และ TTS รับ input จาก client โดยตรง

### Medium priority

1. ไม่มี authentication/authorization สำหรับฟังก์ชันที่มีต้นทุนหรือข้อมูลผู้ใช้
2. ไม่มี monitoring, error tracking, audit log หรือ health endpoint
3. ไม่มี test coverage สำหรับ API route, server actions หรือ external integration failures
4. Contact form ส่ง PII ตรงไป third party โดยไม่มี server-side contract ใน codebase
5. `localStorage` เป็นเพียง UI gate ไม่ใช่ entitlement หรือการยืนยันสิทธิ์

### Low priority / maintainability

1. มีหลาย model name และหลายจุด initialize Gemini ทำให้ policy, timeout และ config ไม่เป็นศูนย์กลาง
2. `lib/env.ts` มี schema แต่ยังไม่ได้ทำหน้าที่เป็น runtime contract ของ backend
3. มีข้อความและเอกสารบางส่วนกล่าวถึง PostgreSQL, Prisma, Supabase และ Neon แต่ไม่พบ implementation ใน repository นี้

## Verification Performed

คำสั่งที่รัน:

- `pnpm build` - **ผ่าน**
- `pnpm lint` - **ไม่ผ่าน**

Lint findings:

- `app/portfolio/page.tsx` ใช้ `<a>` ไปยัง internal path แทน `next/link` (error)
- `components/StrategicTicker.tsx` มี `useRef` ไม่ถูกใช้ (warning)
- `components/StrategicTicker.tsx` มี `motion` ไม่ถูกใช้ (warning)

ไม่พบจากการตรวจไฟล์:

- test script ใน `package.json`
- test files หรือ test config
- Prisma schema/migrations หรือ SQL migrations
- `vercel.json`

## Recommended Implementation Order

1. กำหนด backend contract: ใช้ Zod schema สำหรับทุก public input และกำหนด max length/body size
2. เปลี่ยน `/api/leads` ให้บันทึกฐานข้อมูลจริง พร้อม unique email policy, source, consent timestamp และ server-side validation
3. เพิ่ม rate limiting ต่อ IP/user สำหรับ leads, Gemini และ TTS รวมถึง bot protection สำหรับ public forms
4. ย้าย Gemini configuration ไป server-only module เดียว ใช้ `GEMINI_API_KEY` เท่านั้น และกำหนด model/timeout/retry policy เดียว
5. เพิ่ม authentication/authorization หาก AI tools หรือ lead data ต้องมีสิทธิ์ใช้งานเฉพาะกลุ่ม
6. เพิ่ม structured logging, request ID, error tracking และ monitoring/health check
7. เพิ่ม integration tests สำหรับ success, malformed input, missing secret, provider 429/5xx และ timeout
8. แก้ lint error และเพิ่ม CI ที่รัน lint, typecheck/build และ tests ก่อน deploy
9. จัดทำ privacy/retention policy สำหรับ email, prompts, chat history และ generated audio

## Questions for Gemini to Validate

1. ต้องการให้ lead data เก็บที่ใด: PostgreSQL/Neon, Supabase, CRM หรือ email marketing provider?
2. ต้องการ authentication สำหรับ AI tools หรือเปิด public แบบ anonymous พร้อม quota ต่อ IP?
3. Formspree จะคงไว้หรือควรย้าย contact submission เข้า backend ที่ควบคุมเอง?
4. Gemini model ที่ต้องการใช้จริงคือรุ่นใด และต้องการ streaming response ผ่าน API route แทน Server Action หรือไม่?
5. ต้องการเก็บ prompt/chat/audio หรือไม่ และ retention period เท่าไร?
6. Deployment target คือ Vercel หรือ infrastructure อื่น และต้องการ observability provider ใด?

## Bottom Line

Repository นี้มีโครงสร้าง Next.js ที่ compile และ deploy ได้ แต่ backend ปัจจุบันเหมาะกับ **demo/prototype** มากกว่า production service. จุดที่ต้องทำก่อนประกาศพร้อมใช้งานคือ durable persistence, server-side validation, secret hygiene, rate limiting, authentication/entitlements ตาม use case และ automated integration tests.