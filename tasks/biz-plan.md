# Implementation Plan: microtronic.biz Update

## Project Overview
- **Source**: `/home/neon13/workspace/services/next/00-MAIN-WEB/microtronic.dev` (contains existing content and social URLs)
- **Target**: `/home/neon13/workspace/services/next/00-MAIN-WEB/microtronic.biz` (empty directory, structure to be created)
- **Build System**: Next.js 16.2.4 with TypeScript, pnpm 10.33.2
- **Build Command**: `npm run build` or `pnpm build`
- **Dev Command**: `npm run dev` or `pnpm dev --webpack`

## Part 1: Social Media URLs Found in microtronic.dev

**Verified Social Channels** (from FooterSection.tsx lines 85-94):
1. **Facebook**: `https://www.facebook.com/MicrotronicTH/` ✓ (exists)
2. **LinkedIn**: `https://www.linkedin.com/in/micro-dev-g/` ✓ (exists)
3. **X/Twitter**: `https://x.com/Microtronic2` ✓ (exists, updated from old twitter handle)

**GitHub**: `https://github.com/DarumaKlang` (from JSON-LD in layout.tsx line 109)

---

## Part 2: Company Information to Update

### Current Usage in microtronic.dev
The source project uses these terms:
- Short names: "Microtronic Dev", "Microtronic Team", "Microtronic"
- Brand variant: "Microtronic Dev [2026 Vision]"
- Website: https://microtronic.biz

### Target Legal Names (must use everywhere)
**Thai**: บริษัท ไมโครทรอนิก (ไทยแลนด์) จำกัด
**English**: MICROTRONIC (THAILAND) CO., LTD.
**Tax ID**: 0105561182888
**Address (Thai)**: 136/34 ถนนประดิพัทธ์ แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400
**Address (EN)**: 136/34 Padipat RD, Phayathai, Phayathai, Bangkok, 10400

---

## Part 3: Key Files to Modify/Create in microtronic.biz

### Files Containing Company Name References (from microtronic.dev):

1. **app/layout.tsx** (lines 21, 22, 24, 30, 37-46, 53-56, 102-110)
   - Metadata title template: Change "Microtronic Dev" → keep product brand or use legal name appropriately
   - Authors field: Update name
   - Open Graph: Update title, siteName
   - JSON-LD Schema: Update name, alternateName

2. **app/about/page.tsx** (lines 39-40, 56)
   - Hero heading: "WE_ARE_MICROTRONIC" context
   - Mission description: Reference to "Microtronic Dev"

3. **app/service/page.tsx** (metadata)
   - Title and keywords with company name

4. **app/marketing/page.tsx** (lines 45, 71, 109)
   - Section headers and testimonials mentioning Microtronic

5. **app/pricing/page.tsx** (line 10)
   - Title metadata

6. **app/portfolio/page.tsx** (line 9)
   - Title metadata

7. **app/portfolio/high-performance/page.tsx** (line 8)
   - Title metadata

8. **app/portfolio/innovation-control/page.tsx** (line 8)
   - Title metadata

9. **app/terms/page.tsx** (lines 7, 36)
   - Title metadata and page header

10. **app/staff/page.tsx** (line 8)
    - Title metadata

11. **app/ecosystem/page.tsx** (line 18)
    - Title metadata

12. **app/contact/page.tsx** (line 54)
    - Form subject line

13. **app/seo-tool/page.tsx** (lines 20, 22, 157)
    - Generated meta tags logic

14. **app/products/[slug]/page.tsx** (line 27)
    - Dynamic product title

15. **components/FooterSection.tsx** (line 15, contact info)
    - Footer logo/brand name and contact information

---

## Part 4: JSON-LD Organization Schema (for microtronic.biz homepage)

**Location**: `app/layout.tsx` or `app/page.tsx` in `<head>` section (within `<script type="application/ld+json">`)

**Schema Structure** (to be added/updated):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "บริษัท ไมโครทรอนิก (ไทยแลนด์) จำกัด",
  "alternateName": "MICROTRONIC (THAILAND) CO., LTD.",
  "description": "Professional web development and AI solutions provider in Thailand",
  "url": "https://microtronic.biz",
  "logo": "https://microtronic.biz/logo.png",
  "taxID": "0105561182888",
  "sameAs": [
    "https://www.facebook.com/MicrotronicTH/",
    "https://www.linkedin.com/in/micro-dev-g/",
    "https://x.com/Microtronic2",
    "https://github.com/DarumaKlang"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "136/34 ถนนประดิพัทธ์",
    "addressLocality": "แขวงพญาไท",
    "addressRegion": "เขตพญาไท",
    "postalCode": "10400",
    "addressCountry": "Thailand",
    "addressCountryTH": "ประเทศไทย"
  },
  "addressEN": {
    "@type": "PostalAddress",
    "streetAddress": "136/34 Padipat RD",
    "addressLocality": "Phayathai",
    "addressRegion": "Phayathai",
    "postalCode": "10400",
    "addressCountry": "Thailand"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+66-65-541-9166",
    "email": "grids@microtronic.biz"
  }
}
```

**Note on Schema**: The current microtronic.dev uses `"@type": "ProfessionalService"`. For a legal entity, `"@type": "Organization"` is more accurate. Consider whether to maintain backward compatibility or update to the proper type.

---

## Part 5: Strategy & Warnings

### Name Display Strategy
The task requires displaying the **full legal name** in all company name references:
- **Footer/branding**: Use legal name for formal/official contexts
- **Page titles**: Can use brand variant IF clearly branded (e.g., "Microtronic (THAILAND) CO., LTD. | Web Solutions")
- **About/legal pages**: MUST use full legal name
- **JSON-LD**: Use full legal name for legal/business accuracy

### Data Accuracy Constraints
✓ All company information (name, address, tax ID, social URLs) comes from:
  - User's official documentation (message 2)
  - Verified URLs found in current codebase
- ❌ DO NOT guess or infer missing information (e.g., phone number, email variations)
- ❌ DO NOT modify provided legal names/address
- ⚠️ If address fields don't map cleanly to schema, ask before proceeding

### Build & Verification
- Project uses **Next.js 16.2.4** with TypeScript
- **Build command**: `pnpm build` (or `npm run build` if npm lockfile used)
- **Test command**: None configured in package.json (only lint available)
- **Verification method**: Build must complete without errors; check metadata in HTML output

### Git Workflow (per user rules)
- ❌ Do NOT push
- ✓ Commit locally on feature branch
- ✓ Build must pass before committing
- ✓ User (พี่ฆัง) will push to repository

---

## Implementation Checklist

- [ ] **Step 1**: Copy entire microtronic.dev structure to microtronic.biz (all files, keeping .git structure)
  - Verify: `ls -la microtronic.biz/app` shows app directory with pages
  
- [ ] **Step 2**: Update company name references in all 15 identified files
  - Replace "Microtronic Dev" with appropriate legal name or brand variant
  - Update metadata titles and descriptions
  - Verify: Grep confirms no instances of "Microtronic Dev" in wrong contexts (brand logos should be OK)

- [ ] **Step 3**: Update footer contact information in FooterSection.tsx
  - Add full legal company names (Thai + EN in appropriate places)
  - Update address to: 136/34 ถนนประดิพัทธ์ แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400
  - Verify: Footer renders correctly in dev server

- [ ] **Step 4**: Add/update JSON-LD Organization schema in layout.tsx (or page.tsx)
  - Insert Organization schema with all required fields
  - Include taxID: 0105561182888
  - Include both Thai and English address sections
  - Include verified sameAs URLs (Facebook, LinkedIn, Twitter, GitHub)
  - Verify: Schema renders in HTML head (check source in browser)

- [ ] **Step 5**: Build and verify
  - Run: `pnpm build` from microtronic.biz root
  - Expected: Build completes with 0 errors
  - Check: .next/static contains build artifacts

- [ ] **Step 6**: Commit locally
  - Branch: Create feature branch from main (e.g., `feature/legal-entity-update`)
  - Commit message: "Update company legal names and add Organization JSON-LD schema"
  - Do NOT push

---

## Notes for Implementer

1. **microtronic.biz is currently empty**: The entire app structure from microtronic.dev will need to be copied over first. This is a one-time bootstrap step.

2. **No address info found in current microtronic.dev**: The source only shows "กรุงเทพมหานคร, ประเทศไทย (สำนักงานใหญ่)" as placeholder. Use the full address provided by user.

3. **Metadata updates affect SEO**: Ensure all changes are built and tested to prevent broken metadata in search results.

4. **Schema validation**: After adding JSON-LD, test with [Google Rich Results Test](https://search.google.com/test/rich-results) (optional but recommended).

5. **If unclear**: Ask before guessing. Examples:
   - Should brand name "Microtronic" remain in some places (like templates/services)?
   - Should homepage title be "MICROTRONIC (THAILAND) CO., LTD. | Services" or something shorter?
   - How should Thai and English addresses appear in the footer layout?
