# Binswar Starter

A Next.js starter template built for Binswar client projects. Every component is data-driven with a configuration block at the top of the file. To customize a component for a new client, edit the config block only. The component itself never needs to change.

---

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Sass (SCSS), no CSS Modules
- **Images:** next/image
- **Email:** Resend (contact form)
- **Hosting:** Vercel
- **Accessibility:** WCAG 2.1 AA

---

## Project Structure

```
/app
  /actions
    contact.js          # Server action for contact form
  layout.js             # Root layout, imports Nav and Footer
  page.js               # Home page

/components
  /ui
    /Button             # Button.js
    /ChipNav            # ChipNav.js + chipnav.scss
  /nav                  # Nav.js + nav.scss
  /footer               # Footer.js + footer.scss
  /sections
    /Hero               # Hero.js + hero.scss
    /PageHero           # PageHero.js + pagehero.scss
    /CardGrid           # CardGrid.js + cardgrid.scss
    /TwoColumn          # TwoColumn.js + twocolumn.scss
    /Steps              # Steps.js + steps.scss
    /FAQ                # FAQ.js + faq.scss
    /Testimonials       # Testimonials.js + testimonials.scss
    /CTABanner          # CTABanner.js + ctabanner.scss
    /Gallery            # Gallery.js + gallery.scss
    /ContactForm        # ContactForm.js + contactform.scss
    /BookingCTA         # BookingCTA.js + bookingcta.scss

/styles
  _tokens.scss          # Design tokens (CSS custom properties)
  _functions.scss       # Sass functions
  _mixins.scss          # Sass mixins
  index.scss            # Global stylesheet entry point
  /base
    _reset.scss         # Modern CSS reset
    _typography.scss    # Type scale and utilities
    _globals.scss       # App-wide defaults, buttons, links
    _layout.scss        # Container, grid, layout utilities
```

---

## Style System

### Tokens (`_tokens.scss`)

All visual decisions live in CSS custom properties. To theme a project, override these variables.

**Client theme overrides — change these per project:**

```scss
--color-bg
--color-surface
--color-text
--brand-1 through --brand-8
--font-body
--font-heading
```

**Full token list:**

- Colors: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--brand-1` through `--brand-8`, `--accent-1`, `--success`, `--warning`, `--danger`
- Typography: `--font-body`, `--font-heading`, `--font-size-xs` through `--font-size-4xl`
- Spacing: `--space-1` through `--space-32` (4pt base scale)
- Layout: `--max-width`
- Radii: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadows: `--shadow-1`, `--shadow-2`
- Transitions: `--transition-fast`, `--transition-base`, `--transition-slow`
- Z-index: `--z-below`, `--z-base`, `--z-raised`, `--z-dropdown`, `--z-nav`, `--z-modal`, `--z-toast`
- Accessibility: `--focus-ring`, `--focus-offset`, `--min-tap-target`

### Mixins (`_mixins.scss`)

```scss
@include respond(md) // min-width breakpoint
	@include sr-only // visually hidden
	@include focus-ring // accessible focus outline
	@include tap-target // 44px minimum touch target
	@include flex-center // centered flex
	@include flex-column // column flex
	@include flex-row-between // space-between flex
	@include flex-wrap // wrapping flex
	@include truncate // text overflow ellipsis
	@include transition(base) // token-based transition
	@include absolute-fill; // position absolute inset 0
```

### Functions (`_functions.scss`)

```scss
clampv($min, $pref, $max)     // fluid clamp value
rem($px)                      // px to rem converter
sp($step)                     // spacing token shorthand
```

### Layout classes (`_layout.scss`)

```scss
.container                    // max-width centered wrapper
.block                        // section with vertical padding
.block__content               // content wrapper inside block
.blockTint                    // white surface background
.blockBrand                   // subtle brand tint background
.blockDark                    // dark brand background
.two-col                      // equal two column grid
.two-col-asymmetric           // 1.1fr / 0.9fr grid
.three-col                    // three column grid
.four-col                     // four column grid
.stack                        // vertical flex gap-6
.stack-sm                     // vertical flex gap-4
.stack-lg                     // vertical flex gap-10
.row                          // horizontal flex wrap
.row-between                  // space-between flex row
.col-3 through .col-12        // 12-column span helpers
```

### Global classes (`_globals.scss`)

```scss
.btnPrimary                   // filled brand button
.btnSecondary                 // outlined button
.btnGhost                     // transparent button
.link                         // inline text link
```

### Typography classes (`_typography.scss`)

```scss
.lead                         // large intro paragraph
.label                        // uppercase small label
.text-muted                   // muted color text
.text-center                  // centered text
.prose                        // readable max-width text block
```

---

## Components

### Button (`/components/ui/Button/Button.js`)

Unified button component handling all variants, links, and optional GTM tracking.

```jsx
<Button
	text="Get in touch"
	href="/contact"
	variant="primary" // "primary" | "secondary" | "ghost"
	external={false} // opens in new tab
	trackEvent={{ event: "cta_click" }} // optional GTM push
	disabled={false}
	type="button" // used when no href
/>
```

---

### Nav (`/components/nav/Nav.js`)

Sticky header with mobile hamburger, desktop hover dropdowns, and full keyboard accessibility.

**Config block at top of file:**

```js
const logo = { src, alt, width, height };
const links = [
	{ label: "Services", href: "/services" },
	{ label: "About", href: "/about" },
	// Dropdown example:
	{
		label: "Work",
		items: [
			{ label: "Web Design", href: "/work/web" },
			{ label: "SEO", href: "/work/seo" },
		],
	},
];
const cta = { text, href, variant, external, trackEvent };
const homeHref = "/";
```

**Accessibility:** ESC closes menu, focus returns to burger, full ARIA attributes, skip nav supported.

---

### Footer (`/components/footer/Footer.js`)

Two-band footer with optional inclusion statement, SEO line, partner links, and legal links.

**Config block at top of file:**

```js
const inclusion = { image: { src, alt, width, height }, text };
const seoLine = { text, linkText, linkHref, suffix }; // or null
const partners = { label, items: [{ label, href }] }; // or []
const footerLinks = [{ label, href }];
const copyright = { name, creditText, creditHref };
```

---

### Hero (`/components/sections/Hero/Hero.js`)

Full homepage hero with two column layout, copy left, image right, optional caption.

**Config block at top of file:**

```js
const hero = {
	heading,
	subheading,
	cta: { text, href, variant, external, trackEvent },
	image: { src, alt, width, height },
	caption: { name, title }, // or null
};
```

---

### PageHero (`/components/sections/PageHero/PageHero.js`)

Lightweight interior page hero. Use on all non-home pages.

**Config block at top of file:**

```js
const pageHeroConfig = {
	eyebrow: "Optional label", // or null
	heading: "Page Title",
	subheading: "Brief description",
	image: { src, alt, width, height }, // or null
	align: "left", // "left" | "center"
};
```

---

### CardGrid (`/components/sections/CardGrid/CardGrid.js`)

Centered header, three column card grid, optional footer CTA. Used for services, specialties, features.

**Config block at top of file:**

```js
const cardGrid = {
	heading,
	subheading,
	cta: { text, href, variant }, // or null
	cards: [{ title, description, href, cta }],
};
```

---

### TwoColumn (`/components/sections/TwoColumn/TwoColumn.js`)

Two column section with copy left or right and image. Supports paragraphs, bullet list, and CTA.

**Config block at top of file:**

```js
const twoColumn = {
	heading,
	paragraphs: ["First paragraph", "Second paragraph"],
	list: ["Point one", "Point two"], // or null
	cta: { text, href, variant }, // or null
	image: { src, alt, width, height },
	imagePosition: "right", // "left" | "right"
};
```

---

### Steps (`/components/sections/Steps/Steps.js`)

Numbered step-by-step process section. Used for explaining intake process, how it works, etc.

**Config block at top of file:**

```js
const stepsConfig = {
	heading,
	subheading,
	steps: [{ id, title, description }],
};
```

---

### FAQ (`/components/sections/FAQ/FAQ.js`)

Grouped FAQ accordion with optional search and sticky TOC sidebar. Uses native HTML details/summary.

**Config block at top of file:**

```js
const faqConfig = {
	heading,
	subheading,
	contact: { text, href }, // optional link in subheading
	searchable: true,
	showToc: true,
	groups: [
		{
			id,
			title,
			items: [{ id, q, a, tags }],
		},
	],
};
```

**Notes:**

- Answers in `a` field support HTML strings
- Hash-based deep linking works out of the box
- Tags are used for search matching

---

### Testimonials (`/components/sections/Testimonials/Testimonials.js`)

Client testimonials with star ratings. Two layout options.

**Config block at top of file:**

```js
const testimonialsConfig = {
	heading,
	subheading,
	layout: "grid", // "grid" | "featured"
	testimonials: [{ id, quote, name, title, rating }],
};
```

**Layouts:**

- `grid` — equal columns, all testimonials same size
- `featured` — first testimonial large, rest in smaller two column grid

---

### CTABanner (`/components/sections/CTABanner/CTABanner.js`)

Full width call to action section. Three background variants.

**Config block at top of file:**

```js
const ctaBannerConfig = {
	heading,
	subheading,
	variant: "brand", // "brand" | "dark" | "light"
	cta: { text, href, variant },
	secondaryCta: { text, href, variant }, // or null
};
```

---

### Gallery (`/components/sections/Gallery/Gallery.js`)

Photo gallery with filter tabs and lightbox. Two layout options.

**Config block at top of file:**

```js
const galleryConfig = {
	heading,
	subheading,
	layout: "grid", // "grid" | "before-after"
	filterable: true,
	columns: 3, // 2 | 3 | 4
	categories: [{ id, label }],
	images: [{ id, src, alt, category, width, height }],
	beforeAfter: [
		{
			id,
			label,
			before: { src, alt, width, height },
			after: { src, alt, width, height },
		},
	],
};
```

---

### ContactForm (`/components/sections/ContactForm/ContactForm.js`)

Two column contact form with server action submission via Resend. Inline success and error states.

**Setup required:**

1. `npm install resend`
2. Add `RESEND_API_KEY=your_key` to `.env.local`
3. Update the `to` email address in `/app/actions/contact.js`

**Config block at top of file:**

```js
const formConfig = {
	heading,
	subheading,
	fields: { name, email, message },
	submitText,
	successHeading,
	successMessage,
};
```

---

### BookingCTA (`/components/sections/BookingCTA/BookingCTA.js`)

Booking section for therapy practices. Replaces a contact form with a link to the practice's EHR booking portal. HIPAA safe.

**Config block at top of file:**

```js
const bookingConfig = {
	heading,
	subheading,
	steps: [{ number, text }],
	cta: { text, href, variant, external, trackEvent },
	note: "Disclaimer text shown below the button",
};
```

**Note:** Update `cta.href` to the practice's SimplePractice, Calendly, or EHR booking link.

---

### ChipNav (`/components/ui/ChipNav/ChipNav.js`)

Sticky horizontal pill navigation for long pages. Smooth scrolls to sections accounting for sticky header offset.

**Config block at top of file:**

```js
const chipNavConfig = {
	label: "Jump to section",
	chips: [{ id, label }],
};
```

**Usage:** Place immediately after PageHero. Section elements should have matching `id` attributes.

---

## Metadata System

### Central config (`/config/site.js`)

Edit this file per project. Contains site name, URL, contact info,
branding, social handles, business type, and OG image colors.

### Metadata helper (`/config/metadata.js`)

Two exports:

- `generateMeta({ title, description, path, noIndex })` — call in each page.js
- `generateJsonLd(overrides)` — call in root layout for structured data

### Dynamic OG image (`/app/api/og/route.js`)

Generates branded 1200x630 OG images per page using the logo from /public
and colors from site.js. No manual image creation needed.

### Per-page usage

\`\`\`js
export const metadata = generateMeta({
title: "Page Title",
description: "Page description for search engines.",
path: "/page-path",
});
\`\`\`

---

## Accessibility

Every component is built to WCAG 2.1 AA standards:

- Skip navigation link in root layout (`<a href="#main-content" className="skip-nav">`)
- All interactive elements have `:focus-visible` styles using `--focus-ring` token
- All buttons and links meet the 44px minimum tap target via `--min-tap-target`
- Images have descriptive alt text
- ARIA labels and roles on all complex components
- Native HTML semantics used throughout (details/summary for accordion, dialog for lightbox, nav for navigation)
- Lang attribute on html element (`<html lang="en">`)

---

## Starting a New Project

1. Duplicate this repo and rename it for the client
2. Update `_tokens.scss` with the client's color palette and fonts
3. Update the config block at the top of each component you use
4. Update Nav and Footer config with the client's links and content
5. Add `RESEND_API_KEY` to `.env.local` if using the contact form
6. Update the `to` email in `/app/actions/contact.js`
7. Replace placeholder images in `/public`

---

## Environment Variables

```
RESEND_API_KEY=           # Required for contact form
```

---

## SEO Files

### Sitemap (`/app/sitemap.js`)

Generates `/sitemap.xml` automatically. Update the routes array
to match the actual pages of each project.

### Robots (`/app/robots.js`)

Generates `/robots.txt` automatically. Points crawlers to the sitemap
and disallows the /api/ directory.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values.
Never commit `.env.local` to version control.

| Variable       | Required                  | Description             |
| -------------- | ------------------------- | ----------------------- |
| RESEND_API_KEY | Yes, if using ContactForm | API key from resend.com |

## Analytics Setup

1. Get the GA4 Measurement ID from the client's Google Analytics account
2. Add it to `config/site.js` under `analytics.ga4`
3. Deploy — scripts load automatically

For Google Tag Manager use `analytics.gtm` instead.
For Google Search Console no code is needed — verify ownership
via DNS TXT record in the domain registrar.

## Launch Checklist

Before every site goes live:

- [ ] Run axe DevTools, fix all critical and serious violations
- [ ] Run Lighthouse accessibility audit, aim for 90+
- [ ] Check color contrast with WebAIM for all token color combinations
- [ ] Test full keyboard navigation manually
- [ ] Verify OG images render correctly using opengraph.xyz
- [ ] Confirm sitemap is accessible at /sitemap.xml
- [ ] Test contact form end to end in production
- [ ] Verify Google Analytics is receiving data
- [ ] Verify Google Search Console is set up and sitemap submitted
- [ ] Check all pages on mobile
- [ ] Run Lighthouse performance audit, aim for 90+

---

## Notes

- All components are self-contained. Config lives at the top of the component file, not in a separate data file or layout.
- Page-level styles use double underscore scoping: `.home__page`, `.about__page`, etc.
- Avoid editing component JSX or SCSS unless building a new variant. All customization should happen through the config block and tokens.
- The `blockTint`, `blockBrand`, and `blockDark` classes on section elements control background color without affecting the content width.
