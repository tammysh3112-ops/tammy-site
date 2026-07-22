# Tammy Site - Variant Design Brief (shared)

Read copy.md in this directory FIRST. Copy is FINAL and QA'd - use it VERBATIM (HOME section only for the variant homepages). Do not rewrite Hebrew. No em/en dashes anywhere, only "-".

## Deliverable per variant

One self-contained HTML file (inline CSS + inline JS, Google Fonts <link> allowed, nothing else external). Hebrew RTL: `<html lang="he" dir="rtl">`. Premium quality bar: this page must make a first-time visitor think "she is the #1 baby sleep authority in Israel".

## Page structure (HOME copy from copy.md, this order)

1. Sticky nav: logo text "תמי שני" + links (השיטה, הקורס, מדריכים, עליי) + CTA pill "שיחת ייעוץ ללא עלות"
2. Hero: eyebrow, H1, sub, 2 CTAs, trust chips. Include a `.hero-media` slot built as CSS scene (signature element) with an HTML comment marking where hero.mp4 + hero-poster.jpg get wired later (video-ready: `<video autoplay muted loop playsinline poster>` markup present but commented out).
3. Pain strip (empathy) - the מזדהה? beat deserves visual emphasis.
4. Method - שיטת תכלס: 4 pillar cards.
5. Authority strip: 4 counters (15+, אלפי, 5, רשת 13). Count-up animation. רשת 13 item links to https://13tv.co.il/item/special/recommended/health-2/tamishani-902235552/ (new tab).
6. Course teaser: price 197 crossed 297, CTA.
7. Guides teaser: שליף ליד המיטה.
8. About teaser: circular photo ../assets/tammy-profile.jpg (render ≤170px, source is 320px - never larger), story, CTA.
9. Final CTA band.
10. Footer per copy.md (legal links: /accessibility/ /privacy/ /terms/).

NO testimonials section in v1 (no real quotes yet - honest data rule).

## Links

- Course CTAs → https://tammyshani.ravpage.co.il/tammybabysleep (new tab)
- Consult CTAs → https://ig.me/m/baby.tammy.time (new tab)
- Guides CTA → /guides/
- About CTA → /about/

## Motion system (all variants)

- Reveal on scroll: IntersectionObserver, fade+rise 12px, fires once, ~15 lines inline JS.
- Counter count-up (rAF) for authority strip, tabular-nums.
- ALL motion gated by `@media (prefers-reduced-motion: reduce)` - static + fully visible fallback.
- Mobile-first. Zero horizontal overflow at 390px. Logical properties (margin-inline-start etc.).
- RTL: first DOM item = rightmost. Punctuation after Hebrew text.

## Quality floor

Visible keyboard focus, AA contrast minimum (test hero text!), buttons ≥44px tap target, type scale deliberate, section spacing rhythm consistent. One signature element gets the boldness - everything else quiet.

## Variant deltas

### A - אדמה חמה Warm Earth → variants/a.html

Tokens: bg cream #FBF3EA, ink #3F2E26, accent terracotta #DE9C6B, support sage #7E9471. Darker terracotta for text-on-cream where contrast needs (e.g. #B96F3D or darker).
Type: display Rubik (700/800), body Heebo.
Mood: dusk-to-dawn warmth, chunky rounded, closest to her current brand.
Signature: "horizon breath" hero - a soft glowing sun/moon arc low behind the hero content that slowly breathes (scale+opacity, ~8s cycle) with 2-3 drifting warm blur blobs. Sky gradient shifts subtly.

### B - מרווה ושקד Sage & Almond → variants/b.html

Tokens: bg #F8F2E8, ink #35493C, accent apricot #E9A87C (darken for text), support sage #A8BFA0.
Type: display Frank Ruhl Libre (700), body Assistant.
Mood: spa-calm, editorial, air and whitespace, premium quiet.
Signature: slow drifting soft cloud shapes (CSS blobs, 60-90s drift) in hero + a hand-drawn-feel thin branch/leaf SVG divider between sections. Parallax-lite on hero clouds (transform on scroll, cheap).

### C - לילה ולבנדר Night & Lavender → variants/c.html

Tokens: night #322D5E, lavender #8678C9, light lavender #B3A5E8, cream #FAF7F0, ink-on-light #2E2A52.
Type: display Suez One, body Heebo.
Mood: sleep-native. Hero is NIGHT (dark indigo, cream text), and the page gradually lightens section by section until final CTA sits on warm cream "morning" - the scroll itself tells the story: הלילה נגמר, הבוקר מגיע.
Signature: starfield (CSS twinkle, ~40 tiny dots) + crescent moon glow in hero; stars thin out in section 2 then disappear. Dark→light gradient handoffs between sections must be smooth, not banded.
