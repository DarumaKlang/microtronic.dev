# Company Information & JSON-LD Schema Update — microtronic.biz

Update to microtronic.biz with complete legal company information (Thai and English names, tax ID, postal addresses) and structured data schema integration. Two commits: initial schema addition followed by fixing remaining brand shorthand references in components.

**Verdict**: NEEDS_CHANGES

Watch for: GitHub URL in JSON-LD sameAs array lacks corresponding footer link, suggesting it may be unverified. NavBar still displays "Microtronic Dev" branding instead of full legal name, contradicting the stated requirement to use full legal name "ทุกจุดที่เว็บแสดงชื่อบริษัท" (every point where the website displays company name).

---

## High-level view

The JSON-LD Organization schema is correctly structured with all required fields: both Thai and English legal names, tax ID, dual-language postal addresses, and contact information. The schema is placed in the layout root component's head, making it available on all pages. The latest commit addresses user-visible brand references by replacing shorthand "Microtronic Dev" with the full legal name "MICROTRONIC (THAILAND) CO., LTD." in three components (EnterpriseGroupSection, HeroSection, TemplateGroupSection) and one schema metadata field. However, the NavBar component's logo branding—the most prominent, persistent UI element—still shows "Microtronic Dev" and was not included in the fix, creating an inconsistency between the stated requirement and the implementation. The sameAs social channels list includes a GitHub URL not present in the footer, raising questions about verification status.

<details>
<summary>Issues (3)</summary>

1. **NavBar branding inconsistency** — The NavBar displays "Microtronic Dev" as the primary site branding, contradicting the requirement to replace all company name references with the full legal name. This is the first element users see on every page. Update to "MICROTRONIC (THAILAND) CO., LTD." or appropriate variant.

2. **Unverified social channel in schema** — sameAs includes "https://github.com/DarumaKlang" but this account has no corresponding footer link and no verification that it represents the company. Per the requirement ("ห้ามเดา"), only confirmed social channels should be listed. Either verify the GitHub account and add it to the footer, or remove it from the schema.

3. **Test coverage for schema validity** — No verification that the JSON-LD parses correctly and validates against schema.org. Build success doesn't guarantee JSON syntax correctness. Recommend running through schema.org/Organization validator or similar before considering this complete.

</details>

---

## JSON-LD Organization Schema Implementation

The schema is correctly placed in `app/layout.tsx` within a `<script type="application/ld+json">` tag in the body (not head, but body is acceptable for Next.js). It declares a single Organization with both Thai and English names via `name` and `alternateName` fields. The `url` correctly points to `https://microtronic.biz`. Tax ID is included as `taxID: "0105561182888"`. Address information is rich: two separate PostalAddress objects for Thai and English variants, each with streetAddress, addressLocality, addressRegion, postalCode, and addressCountry. Contact information is present: phone (+66-65-541-9166) and email (grids@microtronic.biz). The structure follows schema.org/Organization closely and should parse correctly, but no validation step is evident in the build process or commit history.

---

## Company Name Standardization — Partial Coverage

The most recent commit (dcbe4ec) replaces shorthand references with the full legal name in three components: `EnterpriseGroupSection.tsx` (two locations: attribution text and Service schema provider metadata), `HeroSection.tsx` (hero description), and `TemplateGroupSection.tsx` (brand metadata). These changes affect user-visible text and metadata attributes.

However, standardization is incomplete. The `NavBar.tsx` component, the most prominent and persistent brand element on every page, still displays "Microtronic Dev" alongside a gradient accent. This is the first visual element users encounter and see on every navigation. The requirement stated "ทุกจุดที่เว็บแสดงชื่อบริษัท" (every point where the website displays company name), and the navbar contradicts this. Additionally, several text references remain in components like `FeaturesSection.tsx` ("ทำไมต้อง Microtronic?") and `AIChatbot.tsx` (greeting text), though these may be stylistic or intentionally informal. The most significant gap is the navbar branding.

---

## Social Channels Verification

The footer displays three social channels with live links:
- Facebook: `https://www.facebook.com/MicrotronicTH/`
- X (Twitter): `https://x.com/Microtronic2`
- LinkedIn: `https://www.linkedin.com/in/micro-dev-g/`

The JSON-LD schema includes all three, plus a fourth: GitHub (`https://github.com/DarumaKlang`). The GitHub URL is not present in the footer's social section, and there is no indication in the code or commit message that this account was verified as a company-owned channel. The requirement explicitly stated "ห้ามเดา" (no guessing) and "เฉพาะ URL ที่มีจริง" (only URLs that actually exist/are real). While the GitHub URL is a valid URL format, its absence from the footer and lack of verification comment suggests it may not meet the "real and verified" criterion. Either the GitHub presence should be added to the footer to match the schema, or the URL should be removed from sameAs if it's personal and not company-owned.

---

## Build and Deployment Status

The build passes successfully with all 29 static and SSG pages generating without errors. TypeScript type checking completes cleanly. No build warnings or errors related to the schema or company information updates are present. The changes do not introduce any runtime issues detectable by the build pipeline. However, the build does not validate JSON-LD schema correctness, only Next.js compilation success.

---

## File Summary

**Key changes:**

- `app/layout.tsx` — Added JSON-LD Organization schema with legal names (Thai/English), tax ID, dual-address postal information, and sameAs social links. Metadata updated to reflect full legal name throughout title templates and descriptions.
- `components/HeroSection.tsx` — Replaced "Microtronic Dev" with "MICROTRONIC (THAILAND) CO., LTD." in hero description text.
- `components/EnterpriseGroupSection.tsx` — Updated attribution text and Service schema provider metadata from "Microtronic Development Team" / "Microtronic Dev" to full legal name.
- `components/TemplateGroupSection.tsx` — Changed brand metadata from "Microtronic Dev" to full legal name.
- `components/FooterSection.tsx` — Already displays full legal name "MICROTRONIC (THAILAND) CO., LTD." with Thai/English descriptions and address.
- `components/NavBar.tsx` — **NOT UPDATED** — Still displays "Microtronic Dev" branding.

**Full diff:** See commits 803ab42 and dcbe4ec in repository history.

