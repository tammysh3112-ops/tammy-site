# F-variants build brief (shared, read by all 3 builders)

Goal: a NEW standalone homepage for Tammy Shani that fixes the critique findings. Do NOT edit index.html or any existing file except your own output file.

## Non-negotiables (brand-locked)

1. The scroll world: ONE tall multi-stop CSS linear-gradient on a .sky-wrap (background-size: 100% 100%), arc = soft morning DAY at top -> golden sunset -> deep velvet NIGHT hold (longest band) -> warm dawn at the bottom. position:fixed scenery layers: stars field (opacity lerped by scroll), meadow image assets/world/hills.png pinned to viewport bottom with night-tint + dawn-glow overlays. rAF + CSS custom properties lerp (copy the TRACKS pattern from index.html lines ~2860-2960). NEVER put transform/filter/backdrop-filter on an ancestor of the fixed layers.
2. Fonts: Discovery Fs (../assets/fonts/Discovery_Fs-Bold.woff2 + Discovery_Fs-Light.woff2, font-family "Discovery Fs") for display; Heebo (Google Fonts) for body. Hebrew, dir="rtl" on <html>.
3. Palette: velvet night #0b0d20/#14162e/#241f45, champagne gold #d9b878 / #ecd6a6 (on dark) / #7d5f26 (on light), warm ivory #f0e8da, ink #241f3a on day sky. Gold is surgical - CTAs, key words, hairlines.
4. Real assets only (paths relative from variants/: ../assets/...):
   - cutouts: ../assets/cutouts/portrait-b-cut.png (Tammy+baby, hero-grade), final-b4-suit-cut.png (suit, professional), leg1_04-cut.png, leg1_01-cut.png, leg1_08-cut.png, final-start-moon-cut.png
   - press: ../assets/press/reshet13-logo.svg, ../assets/press/tammy-13tv-poster.jpg (video loads via Kaltura iframe - copy loadPressVideo() + .press-player markup from index.html)
   - brand logos: ../assets/brand/logo-brown.png (light bg), ../assets/brand/logo-cream.png (dark bg)
   - world: ../assets/world/hills.png
5. Copy source: /Users/peleg/tami ssh/tammy-site/copy.md - use it verbatim where it fits; new copy = casual spoken Hebrew, NO em/en dashes ever (only "-"), NO fragment-dot staccato ("עייפה. תשושה. מבולבלת." style is banned in new copy).
6. Links: course CTA -> https://tammyshani.ravpage.co.il/tammybabysleep ; consult CTA -> https://ig.me/m/baby.tammy.time ; article -> https://13tv.co.il/item/special/recommended/health-2/tamishani-902235552/ ; inner pages ../course/ ../about/ ../guides/ ../consult/
7. Motion: re-triggerable IntersectionObserver pops per research/motion-spec.md (heading 0ms -> lead 90ms -> cards 180+i*120ms RTL rightmost-first, spring cubic-bezier(0.34,1.56,0.64,1), exit reverse, prefers-reduced-motion static). Keep JS under ~80 lines total.
8. Self-contained single file, inline CSS/JS, no external libs (Heebo via Google Fonts link is OK).
9. RTL discipline: punctuation after text, English/LTR bits wrapped if needed. Mobile-first sanity at 390px: no horizontal overflow.
10. Read all three critique files in this directory (conversion.md, visual.md, ux.md) and fix what they flag. Where they conflict, your variant's own thesis wins.

## Verification (required before you finish)

Render with puppeteer-core (module at /Users/peleg/whatsapp-saas/node_modules/puppeteer-core, chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome, headless 'new'): desktop 1440x900 screenshots at 3-4 scroll depths + one 390px mobile shot, READ them as images, fix what looks broken (contrast, overlap, clipping). Log JS page errors and fix. Check document.documentElement.scrollWidth === clientWidth at 390px.
