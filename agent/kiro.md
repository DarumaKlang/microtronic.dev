# Audit By Kiro

ตรวจสอบ components และ dependencies ที่ถูก import เพิ่มเติม

ได้ข้อมูลครบแล้ว นี่คือสรุปปัญหาที่พบ:

---

## สรุปปัญหาที่พบ

### `app/page.tsx`

**1. Design Inconsistency — HeroSectionROI ใช้ Light Mode Colors**
`HeroSectionROI.tsx` ใช้ `text-gray-700` และ `bg-indigo-600` ซึ่งเป็น style ของ Light Mode แต่ `page.tsx` กำหนด background เป็น `bg-slate-900` (Dark Mode) ทำให้ Hero Section ดูไม่เข้ากับส่วนอื่นของหน้า

**2. StrategicTicker — Animation ไม่ Loop ได้ถูกต้อง**
`StrategicTicker` ใช้ `x: [0, -1000]` แบบ hardcode แทนที่จะคำนวณจากความกว้างจริงของ content ทำให้ ticker อาจหยุดกลางทาง หรือ loop ไม่ smooth บนหน้าจอขนาดต่างๆ

**3. GooeyBackground — Custom Tailwind Classes อาจไม่ทำงาน**
ใช้ class เช่น `from-g1-start`, `to-g1-end`, `animate-blob`, `animation-delay-2000` ซึ่งต้องถูก define ใน `tailwind.config.ts` ถ้าไม่มีการ config ไว้ blobs จะไม่แสดงผล

**4. ROICalculator — Logic คำนวณมีปัญหา Edge Case**
เมื่อ `loadTime <= 1.5` ค่า `currentLossRate` จะติดลบ แต่ใช้ `Math.max(0, ...)` แก้ไว้แล้ว อย่างไรก็ตาม `potentialRevenue = revenue / (1 - 0)` = revenue เดิม ทำให้ `lift = 0` ซึ่งถูกต้อง แต่ UI แสดง `+฿0` ซึ่งดูแปลกสำหรับ user ที่ตั้งค่า load time ดีอยู่แล้ว — ควรมี message บอกว่า "ระบบของคุณดีอยู่แล้ว"

**5. FooterSection ถูก Comment Out**
`<FooterSection />` ถูก comment ออก ทำให้หน้า Home ไม่มี Footer

---

### `app/products/page.tsx`

**6. `new URL()` อาจ Throw Error ที่ Runtime**
ใน `ProductGrid.tsx` มีโค้ด:
```ts
new URL(product.direct_url).hostname
```
ถ้า `direct_url` เป็น URL ที่ไม่ valid (เช่น `https://github.com/...` ซึ่งใช้ได้) แต่ถ้ามีสินค้าที่ `direct_url` เป็น path สั้นๆ หรือ malformed URL จะ throw `TypeError` และ crash ทั้งหน้า — ควรใช้ try/catch หรือ fallback

**7. `ProductGrid` ใช้ `<img>` แทน `<Image>` ของ Next.js**
Import `next/image` ไว้ด้านบนแต่ไม่ได้ใช้ กลับใช้ `<img>` ธรรมดาแทน ทำให้เสีย performance optimization (lazy loading, WebP conversion, size optimization) ที่ Next.js มีให้

**8. SVG `<pattern id="grid">` ซ้ำกันทุก Card**
ทุก product card render `<pattern id="grid">` ซ้ำกัน ใน DOM จะมี duplicate `id` ซึ่งผิด HTML spec และอาจทำให้ pattern แสดงผลผิดพลาดในบางเบราว์เซอร์

**9. `animate-in` / `slide-in-from-bottom-4` อาจไม่มีใน Tailwind v3**
Class เหล่านี้มาจาก `tailwindcss-animate` plugin ถ้าไม่ได้ติดตั้ง plugin นี้ animation จะไม่ทำงาน

---

### สรุประดับความรุนแรง

| # | ปัญหา | ระดับ |
|---|-------|-------|
| 6 | `new URL()` crash ที่ runtime | 🔴 Critical |
| 7 | ใช้ `<img>` แทน `<Image>` | 🟡 Medium |
| 1 | Hero ใช้ Light Mode colors | 🟡 Medium |
| 2 | Ticker animation hardcode | 🟡 Medium |
| 3 | GooeyBackground custom classes | 🟡 Medium |
| 8 | Duplicate SVG `id` | 🟡 Medium |
| 4 | ROI แสดง +฿0 ไม่มี feedback | 🟢 Minor |
| 5 | Footer ถูก comment out | 🟢 Minor |
| 9 | `animate-in` plugin อาจขาด | 🟢 Minor |

---

## แผนการแก้ไข และ บันทึกการทำงาน

**วันที่:** 18 พฤษภาคม 2026  
**สถานะ:** ✅ เสร็จสมบูรณ์

---

### แผน (Plan)

เรียงตามลำดับความสำคัญ:

| ลำดับ | ปัญหา | ไฟล์ที่แก้ | ระดับ |
|-------|-------|-----------|-------|
| 1 | `new URL()` crash ที่ runtime | `ProductGrid.tsx` | 🔴 Critical |
| 2 | ใช้ `<img>` แทน `<Image>` | `ProductGrid.tsx` | 🟡 Medium |
| 3 | Duplicate SVG `id="grid"` | `ProductGrid.tsx` | 🟡 Medium |
| 4 | HeroSectionROI Light Mode colors | `HeroSectionROI.tsx` | 🟡 Medium |
| 5 | StrategicTicker animation hardcode | `StrategicTicker.tsx` | 🟡 Medium |
| 6 | Tailwind v4 — custom theme ต้องใช้ `@theme` | `globals.css` | 🟡 Medium |
| 7 | ROI แสดง +฿0 ไม่มี feedback | `ROICalculator.tsx` | 🟢 Minor |
| 8 | next.config.ts ขาด domain สำหรับ Image | `next.config.ts` | 🟡 Medium |

---

### การดำเนินการ (Execution Log)

#### ✅ Fix #6 — `new URL()` Runtime Crash (`ProductGrid.tsx`)
- เพิ่ม helper function `getHostname(url)` ที่ใช้ `try/catch` ครอบ `new URL()`
- ถ้า URL malformed จะ fallback เป็น `'microtronic.biz'` แทน crash

#### ✅ Fix #7 — เปลี่ยน `<img>` เป็น Next.js `<Image>` (`ProductGrid.tsx`)
- ลบ `<img>` ธรรมดาออก เปลี่ยนเป็น `<Image fill sizes="..." />` 
- ได้ประโยชน์จาก lazy loading, WebP conversion, และ size optimization ของ Next.js

#### ✅ Fix #8 — Duplicate SVG `id` (`ProductGrid.tsx`)
- เปลี่ยน `id="grid"` เป็น `id={`grid-${product.slug}`}` ให้ unique ต่อ card
- ย้าย `<pattern>` เข้าไปใน `<defs>` ตาม SVG spec ที่ถูกต้อง

#### ✅ Fix #1 — HeroSectionROI Light Mode Colors (`HeroSectionROI.tsx`)
- เปลี่ยน `text-gray-700` → `text-gray-300`
- เปลี่ยน `text-indigo-600` → `text-blue-400`
- เปลี่ยน `bg-indigo-600 hover:bg-indigo-700` → `bg-blue-600 hover:bg-blue-500`
- ลบ `dark:` variants ที่ไม่จำเป็นออก เพราะ page.tsx เป็น Dark Mode ตลอด

#### ✅ Fix #2 — StrategicTicker Animation Hardcode (`StrategicTicker.tsx`)
- ลบ framer-motion `x: [0, -1000]` ออก
- เปลี่ยนเป็น CSS `@keyframes ticker` ที่ใช้ `translateX(-33.333%)` 
- render items 3 รอบ แล้ว animate ถอยหลัง 1/3 ทำให้ seamless loop ทุกขนาดหน้าจอ
- เพิ่ม `@keyframes ticker` ใน `globals.css`

#### ✅ Fix #3 — Tailwind v4 Custom Theme (`globals.css`)
- เพิ่ม `@theme { }` block ใน globals.css
- ย้าย custom colors (`g1-start`, `g1-end`, ฯลฯ) และ animations มาไว้ใน `@theme`
- ใน Tailwind v4 การ config ผ่าน CSS-first เป็น approach ที่ถูกต้อง

#### ✅ Fix #4 — ROI Calculator Edge Case (`ROICalculator.tsx`)
- เพิ่ม conditional render: ถ้า `results.lift === 0` แสดง "🚀 Optimal" แทน "+฿0"
- เพิ่ม message "ระบบของคุณเร็วกว่า 1.5s แล้ว — ยอดเยี่ยมมาก" สีเขียว

#### ✅ Fix #8 (bonus) — next.config.ts Image Domain (`next.config.ts`)
- เพิ่ม `microtronic-template.vercel.app` เข้า `remotePatterns`
- ป้องกัน Next.js Image component error เมื่อโหลดรูปจาก domain นี้

---

### ผลการตรวจสอบ (Diagnostics)

หลังแก้ไขทุกไฟล์ รัน diagnostics ได้ผล:
- `ProductGrid.tsx` — ✅ No diagnostics
- `HeroSectionROI.tsx` — ✅ No diagnostics
- `StrategicTicker.tsx` — ✅ No diagnostics
- `ROICalculator.tsx` — ✅ No diagnostics
- `next.config.ts` — ✅ No diagnostics

---

### ปัญหาที่ยังเหลือ (Pending / Not Fixed)

| # | ปัญหา | เหตุผลที่ยังไม่แก้ |
|---|-------|-----------------|
| 5 | FooterSection ถูก comment out | ต้องการ input จาก user ว่าต้องการ Footer หรือไม่ |
| 9 | `animate-in` / `slide-in-from-bottom-4` | ใน Tailwind v4 class เหล่านี้ต้องเพิ่มใน `@theme` หรือใช้ plugin — รอ confirm |

---

### อัปเดตรอบที่ 2 — 18 พฤษภาคม 2026

#### ✅ Fix #5 — Footer กลับมา (`app/page.tsx`)
- import `FooterSection` เพิ่มเข้าไป
- uncomment `<FooterSection />` ใน JSX

#### ✅ Fix #9 — `animate-in` classes (`globals.css`)
- เพิ่ม `@keyframes fade-in` และ `@keyframes slide-in-from-bottom`
- เพิ่ม CSS classes: `.animate-in`, `.fade-in`, `.slide-in-from-bottom-4`, `.duration-700`
- ใช้ `animation-fill-mode: both` เพื่อให้ state สุดท้ายคงอยู่หลัง animation จบ

**สถานะสุดท้าย: ✅ แก้ไขครบทุกปัญหาทั้ง 9 ข้อแล้ว**

---

## บันทึกการทำงาน — 19 พฤษภาคม 2026

---

### งานที่ทำในวันนี้

#### ✅ แก้ Footer ซ้ำ 2 ชั้น (`app/page.tsx`)
- ตรวจพบว่า `FooterSection` อยู่ใน `layout.tsx` อยู่แล้ว
- ลบ import และ `<FooterSection />` ออกจาก `page.tsx` เพื่อป้องกัน Footer ซ้ำ

---

#### ✅ แก้ `data/products.json` — JSON ไม่รองรับ Comment
- ปัญหา: มีการใช้ `/* ... */` comment ใน JSON ซึ่งผิด spec
- แก้: ลบ comment block ออก แล้วเพิ่ม field `"active": true/false` แทน
- product ที่เคย comment ไว้ได้รับ `"active": false` (ซ่อนจากหน้า products)
- product ที่แสดงอยู่ได้รับ `"active": true`

#### ✅ เพิ่ม `active` field ใน `types/product.ts`
- เพิ่ม `active?: boolean` ใน `Product` interface

#### ✅ อัปเดต filter ใน `app/products/page.tsx`
- เพิ่ม `.filter(p => p.active !== false)` ก่อน filter category
- ทำให้ product ที่ `active: false` ไม่แสดงบนหน้า products

---

#### ✅ ปรับ ProductGrid ให้ card ทุกใบ consistent (`components/ProductGrid.tsx`)
- เปลี่ยน card structure เป็น `flex flex-col` + `h-48 flex-shrink-0` สำหรับ image zone
- ใช้ `flex-grow` บน content section ให้ยืดเต็มพื้นที่
- ใช้ `line-clamp-2 min-h-[2.75rem]` บน title ป้องกัน layout เบี้ยว
- ใช้ `mt-auto` บน price+CTA row ให้ปุ่ม EXECUTE ติดล่างทุก card เสมอ
- เพิ่ม `unoptimized` prop สำหรับ SVG images
- เพิ่ม `object-top` ให้ crop รูปจากด้านบน

---

#### ✅ เปลี่ยน preview image ของ templates-shop จาก PNG → SVG
- ปัญหา: card แรก (templates-shop) ใช้ PNG รูปจริงที่มี content ต่างจาก card อื่นที่ใช้ SVG placeholder
- สร้าง `/public/images/templates-shop-preview.svg` ใน style เดียวกับ card อื่น (gradient สีน้ำเงิน-ชมพู)
- แก้ `products.json` บรรทัดเดียว: `templates-shop-square.png` → `templates-shop-preview.svg`
- ไม่แตะ CSS หรือ component ใดเลย

---

#### 🔄 เริ่มงาน — Product Card Routing + Portfolio Items (ยังไม่เสร็จ)
- **เป้าหมาย:**
  - card แต่ละใบใน `/products` เปิด gallery หน้าใหม่ของตัวเอง (`/products/[slug]`)
  - ยกเว้น Micro-Account → ลิงก์ไป `https://nextjs-micro-account.vercel.app/` โดยตรง
  - เพิ่ม Micro-Account, THOTH Platform, Kafra Platform เข้าหน้า `/portfolio`
- **สิ่งที่ทำไปแล้ว:**
  - แก้ `ProductGrid.tsx` ให้ Micro-Account ลิงก์ไป landing page โดยตรง
  - card อื่นลิงก์ไป `/products/[slug]`
- **สิ่งที่ยังค้างอยู่:**
  - สร้าง gallery page `/products/[slug]/page.tsx` ให้สวยงาม (ปัจจุบันเป็น README viewer เปล่าๆ)
  - เพิ่ม 3 items ใน `portfolio/page.tsx`

---

### ไฟล์ที่แก้ไขในวันนี้

| ไฟล์ | การเปลี่ยนแปลง |
|------|--------------|
| `app/page.tsx` | ลบ FooterSection ซ้ำออก |
| `data/products.json` | ลบ comment, เพิ่ม `active` field |
| `types/product.ts` | เพิ่ม `active?: boolean` |
| `app/products/page.tsx` | เพิ่ม filter `active !== false` |
| `components/ProductGrid.tsx` | ปรับ card layout ให้ consistent + routing |
| `public/images/templates-shop-preview.svg` | สร้างใหม่ |

---

### งานที่ค้างอยู่ (TODO)

| งาน | รายละเอียด |
|-----|-----------|
| 🔲 Product Gallery Page | ปรับ `/products/[slug]/page.tsx` ให้เป็น gallery ที่สวยงาม |
| 🔲 Portfolio Items | เพิ่ม Micro-Account, THOTH, Kafra ใน `portfolio/page.tsx` |

---

## อัปเดตรอบที่ 3 — 19 พฤษภาคม 2026

---

### ปัญหาที่พบและแก้ไข

#### ✅ แก้ Footer ซ้ำ 2 ชั้น
- ตรวจพบ `FooterSection` อยู่ใน `layout.tsx` อยู่แล้ว
- ลบออกจาก `app/page.tsx`

#### ✅ แก้ `data/products.json` — JSON ไม่รองรับ Comment
- ลบ `/* */` comment block ออก
- เพิ่ม `"active": true/false` แทน เพื่อซ่อน/แสดง product
- เพิ่ม `active?: boolean` ใน `types/product.ts`
- เพิ่ม `.filter(p => p.active !== false)` ใน `app/products/page.tsx`

#### ✅ ปรับ ProductGrid card ให้ consistent
- `h-48 flex-shrink-0` — image zone สูงเท่ากันทุก card
- `flex-grow` + `mt-auto` — ปุ่ม EXECUTE ติดล่างเสมอ
- `line-clamp-2 min-h-[2.75rem]` — title ไม่ทำให้ layout เบี้ยว
- `unoptimized` สำหรับ SVG, `object-top` สำหรับ crop

#### ✅ เปลี่ยน templates-shop preview PNG → SVG
- สร้าง `/public/images/templates-shop-preview.svg` ใน style เดียวกับ card อื่น
- แก้ `products.json` บรรทัดเดียว

#### ✅ แก้ `package.json` dev script
- Next.js 16 ใช้ `--webpack` แทน `--no-turbopack`
- แก้เป็น `"dev": "next dev --webpack"` เพื่อหลีกเลี่ยง Turbopack bug

#### ✅ แก้ `params` ใน Next.js 16
- Next.js 16 บังคับให้ `params` เป็น `Promise` ต้อง `await` ก่อนใช้
- แก้ `app/products/[slug]/page.tsx` ให้ `params: Promise<{slug: string}>` และ `await params`
- แก้ `generateMetadata` และ component function เป็น `async`

#### ✅ แก้ warning `sizes` prop ใน portfolio page
- เพิ่ม `sizes="(max-width: 1024px) 100vw, 50vw"` ใน `<Image>` ของ `portfolio/page.tsx`

---

### งานใหม่ที่ทำเสร็จ

#### ✅ สร้าง Product Gallery Page (`app/products/[slug]/page.tsx`)
- แสดง hero image, meta panel (category, pricing, status), CTA buttons
- **Template Products** (templates-shop, thoth-platform-cms, kafra-platform-ecommerce) จะมีตาราง templates เพิ่มเติม
- แต่ละ template item มี: ชื่อ, ราคา, description, tags, ปุ่ม Preview และ สั่งซื้อ/สอบถาม

#### ✅ สร้าง Micro-Account Landing Page (`app/products/micro-account/page.tsx`)
- Hero section พร้อม CTA 2 ปุ่ม (สอบถามราคา / ขอ Demo ฟรี)
- Preview image section
- Features grid 6 ข้อ (Dashboard, VAT, AI, Security, Performance, Invoice)
- Pricing plans 3 ระดับ: Starter (ฟรี), Business (ติดต่อสอบถาม), Enterprise (Custom)
- card Micro-Account ใน `/products` ลิงก์มาที่ `/products/micro-account`

#### ✅ เพิ่ม "Our Products" section ใน `/portfolio`
- เพิ่ม section ใหม่ใต้ "New Product Release"
- card 3 ใบ: Micro-Account (purple), THOTH (emerald), Kafra (orange)
- แต่ละ card มี image, label badge, title, description และลิงก์ไปหน้ารายละเอียด

---

### ไฟล์ที่แก้ไข/สร้างใหม่

| ไฟล์ | การเปลี่ยนแปลง |
|------|--------------|
| `app/page.tsx` | ลบ FooterSection ซ้ำ |
| `data/products.json` | ลบ comment, เพิ่ม `active` field |
| `types/product.ts` | เพิ่ม `active?: boolean` |
| `app/products/page.tsx` | filter `active !== false` |
| `components/ProductGrid.tsx` | card layout consistent + routing |
| `public/images/templates-shop-preview.svg` | สร้างใหม่ |
| `package.json` | `dev` script ใช้ `--webpack` |
| `app/products/[slug]/page.tsx` | gallery page + template table (สร้างใหม่) |
| `app/products/micro-account/page.tsx` | landing page ใหม่ (สร้างใหม่) |
| `app/portfolio/page.tsx` | เพิ่ม Our Products section + แก้ Image sizes |

---

### สถานะปัจจุบัน

| หน้า | สถานะ |
|------|-------|
| `/products` | ✅ แสดง 4 cards, filter ทำงาน |
| `/products/templates-shop` | ✅ gallery + template table |
| `/products/thoth-platform-cms` | ✅ gallery + template table |
| `/products/kafra-platform-ecommerce` | ✅ gallery + template table |
| `/products/micro-account` | ✅ landing page ใหม่ |
| `/products/micro-account-platform` | ✅ gallery page (slug เดิม) |
| `/portfolio` | ✅ มี Our Products section แล้ว |

---

## อัปเดตรอบที่ 4 — 19 พฤษภาคม 2026

---

### งานที่ทำเสร็จ

#### ✅ สร้าง TemplateGallery Component (`components/TemplateGallery.tsx`)
- Filter bar กรองตาม category (ทั้งหมด, Corporate, SaaS, E-commerce, Portfolio, Restaurant, Real Estate)
- Grid ของ template cards — แต่ละใบมี: รูป preview, ชื่อ, tags, ราคา, ปุ่ม Preview และ สั่งซื้อ
- Hover บน card แสดง overlay ปุ่ม Preview
- ใช้ข้อมูลจาก `data/templates.json`

#### ✅ สร้าง `data/templates.json`
- 6 templates: Corporate Pro, SaaS Dashboard, E-commerce Starter, Portfolio & Agency, Restaurant & Food, Real Estate
- แต่ละ item มี: id, name, category, price, preview_image, tags, demo_url, buy_url
- `demo_url` ว่างไว้ก่อน — รอใส่ URL จริงในภายหลัง

#### ✅ สร้าง SVG Placeholder Images (`public/images/templates/`)
- `tpl-saas.svg` — mockup หน้า dashboard สีม่วง
- `tpl-corporate.svg` — mockup หน้า corporate website สีน้ำเงิน
- `tpl-portfolio.svg` — mockup หน้า portfolio สีดำ
- `tpl-ecommerce.svg` — mockup หน้า e-commerce สีขาว (light mode)
- `tpl-restaurant.svg` — mockup หน้า restaurant สีส้ม
- `tpl-realestate.svg` — mockup หน้า real estate สีขาว
- **หมายเหตุ:** รูปเหล่านี้เป็น placeholder — เจ้าของโปรเจกต์จะมาแทนที่ด้วยรูปจริงในภายหลัง

#### ✅ อัปเดต `app/products/[slug]/page.tsx`
- import `TemplateGallery` และแสดงเฉพาะ slug ที่เป็น template products
- ซ่อน Hero Image สำหรับ template products เพื่อให้ gallery โชว์เต็มที่
- Template slugs: `templates-shop`, `thoth-platform-cms`, `kafra-platform-ecommerce`

---

### ⚠️ Errors ที่เกิดขึ้นและบทเรียน

#### ❌ Build Error: `generateStaticParams` declared twice
- **สาเหตุ:** ใช้ `str_replace` แทนที่แค่ส่วนบนของไฟล์ แต่โค้ดเก่าด้านล่างยังอยู่ ทำให้ function ซ้ำกัน
- **แก้:** ใช้ `fs_write` เขียนทับทั้งไฟล์แทน `str_replace` เมื่อต้องการเปลี่ยนโครงสร้างใหญ่
- **กฎ:** ถ้าไฟล์มีโค้ดเก่าค้างอยู่ ให้ `read_file` ก่อนเสมอ แล้วค่อย `fs_write` ทับทั้งไฟล์

#### ❌ Next.js 16 `params` ต้อง `await`
- **สาเหตุ:** เข้าใจผิดว่า Next.js 16 ใช้ sync params เหมือน v14 แต่จริงๆ v16 บังคับ `Promise<{slug: string}>`
- **แก้:** `params: Promise<{ slug: string }>` และ `const { slug } = await params`
- **กฎ:** Next.js 16 — `params` และ `searchParams` เป็น Promise เสมอ ต้อง await ก่อนใช้

#### ❌ `--no-turbopack` ไม่มีใน Next.js 16
- **สาเหตุ:** flag เปลี่ยนไปใน v16
- **แก้:** ใช้ `--webpack` แทน
- **กฎ:** อ่าน `node_modules/next/dist/docs/` หรือรัน `next dev --help` ก่อนใช้ CLI flags

---

### ไฟล์ที่สร้างใหม่วันนี้

| ไฟล์ | หมายเหตุ |
|------|---------|
| `components/TemplateGallery.tsx` | Gallery component พร้อม filter |
| `data/templates.json` | ข้อมูล templates — ใส่ `demo_url` จริงทีหลัง |
| `public/images/templates/tpl-saas.svg` | Placeholder — แทนด้วยรูปจริงทีหลัง |
| `public/images/templates/tpl-corporate.svg` | Placeholder — แทนด้วยรูปจริงทีหลัง |
| `public/images/templates/tpl-portfolio.svg` | Placeholder — แทนด้วยรูปจริงทีหลัง |
| `public/images/templates/tpl-ecommerce.svg` | Placeholder — แทนด้วยรูปจริงทีหลัง |
| `public/images/templates/tpl-restaurant.svg` | Placeholder — แทนด้วยรูปจริงทีหลัง |
| `public/images/templates/tpl-realestate.svg` | Placeholder — แทนด้วยรูปจริงทีหลัง |
| `app/products/micro-account/page.tsx` | Landing page ใหม่สำหรับ Micro-Account |

---

### TODO — งานที่ยังค้างอยู่

| งาน | รายละเอียด |
|-----|-----------|
| 🔲 ใส่รูป preview จริง | แทนที่ SVG placeholder ใน `public/images/templates/` |
| 🔲 ใส่ `demo_url` จริง | อัปเดต `data/templates.json` เมื่อมี demo URL |
| 🔲 เพิ่ม templates เพิ่มเติม | เพิ่ม items ใน `data/templates.json` ตามที่มีขาย |
