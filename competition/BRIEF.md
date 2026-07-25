# Tammy Competition Build - Shared Brief (read fully before writing code)

Goal: a one-page Hebrew RTL website for Tammy Shani (baby sleep consultant, featured on Reshet 13) that could win a design competition AND convert exhausted Israeli moms browsing on a phone at 2am. Three agents build three completely different sites. This file is the shared contract; your vibe assignment comes in your prompt.

## Hard rules (non-negotiable)

1. Output: ONE self-contained HTML file at the path given in your prompt. Inline CSS + inline JS. Google Fonts `<link>` allowed for Heebo only. All other assets referenced RELATIVELY (`../assets/...`). No build tools, no external JS.
2. `<html lang="he" dir="rtl">`. CSS logical properties. Punctuation AFTER Hebrew text ("רוצים עוד?"). English/numbers inside Hebrew wrapped in `<span style="direction:ltr;unicode-bidi:embed">` when they scramble.
3. NO em dash or en dash ANYWHERE (copy, code comments, strings). Only "-".
4. Hebrew copy: use `../copy.md` (root of tammy-site) VERBATIM for the HOME sections. Do not rewrite Hebrew. You may cut sections that don't fit your concept, and you may write short NEW connective lines only if unavoidable - casual spoken Hebrew, feminine address (את), never formal.
5. Honest data only: the 3 real testimonials (שרון, אלינור, ליהי) may be copied from `../index.html`. The authority numbers come from copy.md (15+ שנות ניסיון, אלפי משפחות, גיל 0-5, רשת 13). NEVER invent numbers, quotes, or logos.
6. Palette LOCKED (Tami approved, sampled from her logo): cream #FBF3EE / #F5E9E2, ink #4A342E, ink-soft #6F524C, clay #C3998D, clay-deep #9C6A5A, CTA clay #8C5A4A (white text passes AA), sage #D2DBC8 / deep #7E9471, blush #F1DFDF, espresso #4A322B, light sage #B9CDA9. Night sections may extend into the deep night indigos already on the live homepage (#14162e, #2a2350). ORANGE/TERRACOTTA ARE BANNED (Tami's explicit rule).
7. Fonts: Discovery Fs for ALL display type - `@font-face` from `../assets/fonts/Discovery_Fs-Bold.woff2` (700-900) and `Discovery_Fs-Light.woff2` (300-400). Heebo (Google Fonts) for body/digits fallback. Never Rubik, never Frank Ruhl.
8. Links (all new tab except internal): course https://tammyshani.ravpage.co.il/tammybabysleep | consult https://ig.me/m/baby.tammy.time | guides /guides/ | about /about/ | Reshet 13 item https://13tv.co.il/item/special/recommended/health-2/tamishani-902235552/ | footer legal /accessibility/ /privacy/ /terms/ | IG @baby.tammy.time.
9. Accessibility floor: AA contrast (test text over images!), visible keyboard focus, 48px tap targets, `@media (prefers-reduced-motion: reduce)` = static and fully visible, alt text in Hebrew.
10. Mobile-first: zero horizontal overflow at 390px. Page weight target under 2.5MB initial (lazy-load below-fold images with `loading="lazy"`; scrub frames load progressively).

## Asset manifest (paths relative to competition/)

- FILM (the AI hero asset): `../assets/film/leg1/f_001.jpg` ... `f_097.jpg` (97 frames, 1280px wide, 12fps of an 8s cinematic shot: mother holding newborn by moonlit nursery window, camera slowly moves, warm lamp + crib). Also `../assets/film/leg1.mp4` (11MB source - if you use a video tag, ffmpeg-compress a copy to under 4MB first: `ffmpeg -i ../assets/film/leg1.mp4 -vf scale=960:-2 -crf 28 -an out.mp4`). Poster: `../assets/film/leg1-poster.jpg`.
- MOOD STILLS (warm editorial nursery set): `../assets/ai/mood-1-nursery-wide.png`, `mood-2-lamp.png`, `mood-3-crib.png`, `mood-4-silhouette.png`, `mood-5-sleeping-baby.png`, `mood-6-dawn-curtain.png`, story beats `final-b1-window.png`, `final-b2-laydown.png`, `final-b4-endpose.png`, `final-start-moon.png`, portraits `portrait-a.png`, `portrait-b.png`.
- CUTOUTS (transparent PNG): `../assets/cutouts/portrait-b-cut.png` (hero grade, Tammy+baby), `final-b4-suit-cut.png` (professional), `leg1_01-cut.png`, `leg1_04-cut.png`, `leg1_08-cut.png`, `final-start-moon-cut.png`.
- WORLD LAYERS (transparent illustration): `../assets/world/moon.png`, `clouds-back.png`, `clouds-front.png`, `hills.png`, `meadow-e1.png`.
- REAL PHOTOS of Tammy: `../assets/identity/*.jpg`, round profile `../assets/tammy-profile.jpg` (320px source, render at 170px max).
- BRAND: `../assets/brand/logo-cream.png`, `logo-brown.png`. Press: `../assets/press/` (reshet13 logo SVG, `tammy-13tv-poster.jpg`; video embeds via Kaltura - copy `loadPressVideo()` + `.press-player` markup from `../index.html` if you use it).

## Research brief (from the winning-site research agent) - FOLLOW IT

See `RESEARCH.md` in this folder. Key laws: one signature idea; entrances 400-700ms cubic-bezier(0.16,1,0.3,1) staggered 60-90ms; max 2-3 parallax layers; one easing two durations; huge display scale (clamp 44-120px H1); Hebrew body 17-19px lh 1.6-1.7; proof order = Reshet 13 > numbers > mom testimonials > her story; CTA = outcome verb + risk-reducing microcopy underneath; repeat CTA 3x; sticky mobile CTA after 60% scroll; the 5 cheap tells are instant disqualification (no emoji icon rows, no uniform card grids, no everything-fades-up, no glassmorphism kit, no template residue).

## Mandatory QA loop (do not skip - "done" without this = not done)

1. Serve the folder: `cd "/Users/peleg/tami ssh/tammy-site" && python3 -m http.server 8901 &` (or 8902/8903 - pick the port in your prompt to avoid clashing with the other agents).
2. Screenshot with headless Chrome at BOTH widths, multiple scroll depths. Pattern:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --screenshot=/tmp/shot.png --window-size=1440,4000 "http://localhost:PORT/competition/YOURFILE.html"`
   For scroll depths use `--window-size=1440,12000` tall shots, or append `#anchor` scroll targets. Mobile: `--window-size=390,3000`.
3. READ every screenshot with the Read tool and actually look: text contrast over images, RTL direction, clipping, orphan words, template residue, motion fallback. Hebrew punctuation position.
4. Fix and re-shoot. Minimum 2 full iterations. Your final report must list what you SAW and fixed, plus final screenshot paths.
5. Kill your server when done.
