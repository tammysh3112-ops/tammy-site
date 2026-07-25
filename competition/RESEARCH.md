# WINNING WEBSITE BRIEF 2026 - Tammy Shani Baby Sleep (Hebrew RTL, mobile-first, mom at 2am)

## 1. TEN HALLMARKS OF AN AWARD-LEVEL SITE
1. One signature idea, not ten tricks - you can describe the site in one sentence ("the page that puts a baby to sleep").
2. Content designed, not pasted - copy line lengths, breaks, and hierarchy look art-directed; no orphan words in headlines.
3. Custom type moment - at least one display setting no template ships (huge kerned Hebrew headline, kinetic word, mixed scale).
4. Cohesive color story - 4-5 colors max, one accent used sparingly; backgrounds shift per section but stay in one family.
5. Motion with choreography - elements enter staggered (60-90ms apart), never all at once; scroll feels directed, not decorated.
6. Real photography/art integrated with layout - text overlaps images, images break the grid; no image = rectangle in a column.
7. Load discipline - hero interactive under 2.5s on 4G; motion never blocks reading (Awwwards weighting: design 40, usability 30).
8. Micro-detail density - custom selection color, hover states, favicon, loading state, footer with personality. Judges scroll to the footer.
9. Rhythm variation - alternating dense/airy sections; at least one full-bleed "breath" moment with a single sentence.
10. The site risks something - one unusual layout or interaction executed flawlessly beats ten safe sections (creativity 20%, but usability failures kill it).

## 2. HERO RULES - FIRST 3 SECONDS
- One message, one CTA, zero competing links. Headline states the transformation ("הלילות שלכם חוזרים"), not the profession.
- Video hero: autoplay muted playsinline loop, poster frame that IS a valid static hero, under 4MB, 720p enough. Text must sit on a stable area (darkened lower third or side), never fight motion.
- Typography-led hero: headline at 11-14vw mobile (clamp 44px-120px), max 4-5 Hebrew words per line, subhead at 18-20px, CTA visible without scroll. Whitespace above the fold reads premium; clutter reads brochure.
- Scroll-driven hero: first frame must already be beautiful frozen. Scroll reveals reward movement but never gate the headline or CTA behind it.
- On mobile at 2am: headline readable in 1 second, emotional image of mother+baby, CTA thumb-reachable. Reshet 13 badge visible in hero, small, real logo.

## 3. MOTION THAT WINS vs MOTION THAT READS CHEAP
- WINS: entrances 400-700ms cubic-bezier(0.16, 1, 0.3, 1) (expo-out), translateY 16-24px + fade, staggered 60-90ms; hovers 150-200ms; one slow ambient layer (clouds drifting 60-120s linear loop) that sets mood.
- WINS: scroll-linked parallax on 2-3 layers max, displacement 10-20% of scroll delta, transform/opacity only (60fps); numbers counting up once; a single pinned scene max.
- WINS: choreography - things happen in sequence with intent (headline, then subhead, then CTA, then badge).
- CHEAP: default ease everywhere, 1s+ fades, everything animating on every scroll tick, bounce easings on serious content, AOS-style "every card slides in from alternating sides", parallax on 6 layers, carousel autoplay.
- Always: @media (prefers-reduced-motion: reduce) kills it all. One easing, two durations, is a system; five easings is a template.

## 4. TYPOGRAPHY - PREMIUM vs TEMPLATE
- Scale: pick 1.333 (Perfect Fourth) or 1.5 for editorial drama - landing pages earn a huge H1. Template tell: 1.2 timid scale where H1 is barely 2x body.
- Weight contrast: pair extremes - 300/light against 700-800 display, never 400 vs 600.
- Body: 17-19px mobile, line-height 1.6-1.7 for Hebrew; headlines line-height 1.05-1.2. Measure Hebrew ~40-60 chars.
- Letter-spacing: Hebrew display slightly negative (-0.01 to -0.03em) at large sizes; never letterspace Hebrew body text.
- Premium tells: manual line breaks in every headline, text-wrap: balance, one oversized number or word per page, real quotation marks (״), tabular numbers for stats. Template tells: same size H2 on every section, centered-everything, all-bold.

## 5. TRUST/CONVERSION - SOLO EXPERT CONSULTANT
- Proof hierarchy (top to bottom): 1) Reshet 13 logo in/near hero, 2) hard numbers as a counter strip, 3) 2-3 mom testimonials with first name + baby age (peer proof converts exhausted moms more than credentials), 4) her face and story (she IS the product; one warm portrait, first-person copy), 5) what-happens-next.
- CTA: one action only. Sticky bottom bar on mobile after 60% scroll. Repeat CTA 3x (hero, after testimonials, final). Label = outcome verb: "רוצה לישון שוב? דברי איתי" not "צור קשר".
- Reduce risk at the button: microcopy under CTA ("בלי התחייבות, מענה תוך יום"). Pain-specific copy converts 2-3x generic.
- Mobile-first: single column, CTA min 48px tall, page under 1.5MB ideal.

## 6. THE 5 CHEAP TELLS THAT DISQUALIFY
1. AI-slop kit: Inter/Poppins + purple-blue gradient + glassmorphism cards + 24px rounded corners on everything.
2. Emoji as design system and stock photos of not-her, not-Israeli families.
3. Uniform card grids - three equal shadow-boxes per section, every section same rhythm, centered text everywhere.
4. Motion confetti: everything fades in from below at the same 1s ease, carousels, floating blobs, tilt-on-hover cards.
5. Template residue: default blue links, Lorem-feeling copy, inconsistent spacing scale, English placeholder in a Hebrew form, footer that's just a copyright line.

## 7. RTL/HEBREW SPECIFICS
- dir="rtl" on <html> from first line; CSS logical properties only.
- Mirror everything directional: arrows point left for "next", timeline flows right to left.
- Numbers/phone/English inside Hebrew: wrap in LTR span (unicode-bidi: embed). Punctuation after the word: "רוצים עוד?" never "?רוצים עוד".
- Check the display weight actually has Hebrew glyphs, fake-bold is an instant tell.
- Hebrew needs +1-2px body size and more line-height than Latin; no italics (fake-slanted Hebrew = amateur).
- Register: casual spoken Hebrew, addressed feminine singular ("את") - formal Hebrew reads like a bank.

## 8. THREE WINNING ART DIRECTIONS

**A. NIGHT-CINEMATIC.** Reference class: film-title sites and premium sleep brands (Calm, Loona, A24 microsites) - dark, quiet, luxurious. The 8s film IS the hero: full-bleed, muted loop, espresso-black grade, headline in cream set into the dark lower third, one lamp-warm clay accent for the CTA. Page starts in night mode and gradually lightens section by section until the final CTA sits on warm cream "morning" - the scroll itself tells the story of a night that ends well. Signature move: the dark-to-light scroll arc (background color interpolated over scroll position).

**B. LIGHT-EDITORIAL.** Reference class: Kinfolk/Cereal magazine layouts and premium doula/wellness personal brands. Cream canvas, espresso display type at huge scale, the nursery photos treated as an art-directed photo essay: asymmetric grid, images bleeding off the edge, captions in tiny sage type, generous 120-160px section spacing. Feels like a magazine profile of Tammy, which flatters the TV-featured positioning. Signature move: one editorial "spread" where a giant pull-quote from a mom testimonial (60-80px Hebrew) overlaps a full-height nursery photo - proof presented as art, not as a card grid.

**C. ILLUSTRATED-WORLD.** Reference class: Awwwards scroll-storytelling sites and premium children's-brand sites - a built world you travel through. The layered assets (moon, clouds, hills, meadow) become one continuous parallax landscape: hero at night under the moon, scrolling literally travels the child's night - clouds drift at different depths, hills slide, meadow arrives with dawn near the CTA. Photos live inside soft-edged windows in the illustration. Signature move: a scroll-progress moon that arcs across the viewport over the whole page and "sets" exactly at the final CTA - one persistent element binding every section.
