# Visual Audit - Tammy Shani "Soft Luxe Night"

Art-direction pass, section by section. Background world (day/night/dawn gradient, meadow, crib, bunny) is LOCKED brand and is not critiqued for existence - only for how content sits on it. Everything below is about the content layer.

Scores are premium-feel, 1-10. Current site average lands around **6.4/10** - competent and coherent, but several tells keep it from reading as luxury: two identity-scale jumps in the hero headline, a muddy corner cutout, a floating unanchored About portrait, and one genuinely broken-looking dead gap above the footer.

---

## 0. Cross-cutting issues (fix once, helps every section)

1. **Gold is used at three saturations with no rule.** `--gold-lite (#ecd6a6)` for velvet text, `--gold-deep (#7d5f26)` for ivory text, plus the button gradient `#e6cd97 -> #c9a463`. Fine in principle, but the _eyebrow rule_ (`.eyebrow::before` 26px hairline) is `--gold` at 0.9, the `.hdiv` divider is `rgba(217,184,120,0.42)`, card borders are `0.28`, and hover borders jump to `0.55-0.7`. Four different gold-line opacities read as inconsistency, not surgical restraint. Pick two: hairline-rest `0.30`, hairline-active `0.60`. Apply globally via the existing `--hair-gold` / `--hair-gold-soft` tokens and delete the one-off inline opacities.
2. **No texture anywhere on the velvet.** The night bands are flat gradient. A premium velvet surface needs the faintest grain or vignette. Add a single fixed noise layer (128px data-URI SVG `feTurbulence`, `opacity:.03`, `mix-blend:overlay`) inside `.fx`, or a `radial-gradient` vignette on `.sky-wrap::after`. Right now the "velvet" is asserted in comments but not visible on screen.
3. **Card polish is one-note.** Every velvet panel is the same `20px` radius, same top hairline `::before`, same border. The hero fill card is `26px`, offers/method are `20px`, testimonials `20px`, faq `16px`, press-player inner `14px`. Five radii. Standardize to two: `--radius-lg: 24px` (hero cards, feature panels) and `--radius-md: 16px` (small chips, faq, inner media). Inconsistent corner radius is the number-one "assembled from parts" tell.
4. **Section rhythm is even but undifferentiated.** Every band is `--section-pad` (5-7rem). Premium sites breathe unevenly: the hero->proof transition and the final->footer transition deserve more air; the offers grid can be tighter. Not urgent, but the metronome flatness reads as template.

---

## 1. Nav + logo treatment - **6/10**

**Sloppy / cheap:**

- **Logo is oversized and competes with nothing.** `.logo img { block-size: 88px }` at rest. The letter-tile "TAMMY" block plus script "baby/time" at 88px is nearly double the visual weight of the nav links (`0.96rem`). On the pale day sky it floats as the heaviest object on the page above the headline. Drop rest state to **72px**, scrolled to **48px** (`.nav.scrolled .logo img` currently 54px).
- **Transparent nav over the day sky has weak affordance.** Links are `--ink` on `#b6c8e4` - passes, but the nav-cta pill border is `rgba(138,107,46,0.42)` which nearly vanishes on the blue (see s0-hero: the "שיחת ייעוץ ללא עלות" pill outline is barely there). Bump rest border to `0.55` on the day state.
- **Redundant identity.** The logo already says "baby TAMMY time - תמי שני", then the hero eyebrow immediately repeats "תמי שני | יועצת שינה והתפתחות" 40px below it. Two brand statements stacked. Either drop "תמי שני" from the eyebrow (keep just the role) or move the role into the logo lockup.

**Text-collision risk:** The `.scrolled` state flips links to `--cream-dim` at exactly `scrollY > 20% of scrollHeight`. On mid-scroll bands where the sky is still transitioning plum->night (v2-cards / v2-press screenshots), the cream links pass over the _bright press photo card_ and the _counters_ that scroll up under the fixed nav. In v2-press you can see "אלפי / 15+ / רשת13" counters physically overlapping the nav pill and heading. The fixed transparent nav has no scrim, so anything bright scrolling beneath it collides. **Add a 1px hairline + faint velvet wash to `.nav.scrolled`** (currently explicitly `background:transparent`): `background: linear-gradient(180deg, rgba(11,13,32,.55), rgba(11,13,32,0))` with `backdrop-filter: blur(6px)`. It reads as premium AND kills the collision.

**Missing:** No active-section indicator, no hover underline animation on links (just a color swap). A 1px gold underline that wipes in on hover would add the micro-polish the rest of the site is reaching for.

---

## 2. Hero + headline interlock - **6.5/10**

**Type scale - the biggest tell.** The headline drops from `.h1-row1` `clamp(3rem, 9.4vw, 6.4rem)` to `.h1-row2/3` `clamp(2.2rem, 6.6vw, 4.6rem)`. At desktop that is **6.4rem -> 4.6rem, a 28% cliff mid-sentence.** It reads as two different headlines glued together, not one hierarchy. The payoff line "סוף סוף בלילה" (row3) is the emotional climax yet it is the _smallest_ of the three. Either:

- make all three rows the same size (one confident block), or
- go row1 `6.4` / row2 `5.2` / row3 `5.8` so the climax is nearly as big as the opener. The current monotonic shrink kills the punchline.

**Ragged left edges.** row1 is `white-space:nowrap` full-width; row2/row3 are `max-width:58%`. So row1's left edge sits far left, rows 2-3 stop at 58%. Three different left terminations = ragged, not intentional. In RTL the eye tracks the right edge (aligned, good) but the left silhouette is jagged. Give row2/3 a shared `max-width` that matches where row1 naturally breaks, or right-align the whole block and let all three share one right margin (they do) but cap row1 so it doesn't overshoot.

**Interlock quality is weak and slightly risky.** The concept (headline tail runs behind the figure) barely happens: `.hero-figure` is `inset-inline-end` (LEFT in RTL) at `z-index:3`, headline rows are `z-index:2`. The only overlap is row1's _left tail_ - which is the bold gold word **"לבד."** - the entire semantic payoff of line 1. In s0-hero her right shoulder/arm is millimeters from that word. If the viewport narrows even slightly, the figure occludes "לבד". **Never let the figure cover an anchor word.** Either pull `.hero-figure` further left (`inset-inline-end: clamp(0px, 6vw, 120px)`) or shorten row1 so "לבד." clears her silhouette with ~40px breathing room.

**Figure grounding is good** - the `mask-image: linear-gradient(to top, transparent 0%, #000 12%)` dissolves her legs into the meadow, and the crib sits beside her. This is the strongest interlock on the page. Keep it.

**Hero eyebrow** floats orphaned between nav and headline (see cross-cutting #1 nav redundancy). `--gold-deep` on the day sky is legible but small; the `::before` 26px hairline pointing right in RTL looks like a stray dash. Fine, minor.

**Rate 6.5** - strong figure/meadow anchor, undone by the mid-headline scale cliff and the occlusion risk on the payoff word.

---

## 3. Hero cards (the two GLOWLY bottom containers) - **5.5/10**

**Remove the corner cutout.** `.hcard-fig` (`assets/cutouts/leg1_04-cut.png`) bottom-inline-end of the velvet fill card is the single cheapest element in the hero (v2-cards): it renders as a small, dark, low-contrast smudge in the corner at `max-inline-size:40%`, `opacity:.96`, with a top mask fade. On the `#2a2350 -> #14162e` velvet it has almost no separation - it reads as image compression noise, not a figure. **Delete it**, or replace with a proper high-contrast cutout at larger scale that actually reads. Right now it is visual clutter that undercuts the card.

**Proportion / empty middle.** `.hcard-fill` is `min-height: clamp(260px, 34vh, 330px)`, `justify-content: space-between`. The h3 (`max-width:18ch`) sits top, the trust row (avatars + line) sits bottom, and the entire middle is dead velvet with the smudge floating in it. Either raise `.hcard-fill` content density (add the price/one-liner) or reduce min-height to ~280px so the space-between doesn't yawn.

**Card-pair balance.** Grid is `minmax(280px, 0.85fr) 1.35fr` - the photo card is the _narrow_ one (0.85) and the text card is _wide_ (1.35). That is backwards: the 13TV press photo is your single strongest social-proof asset and it is squeezed into the smaller column while a mostly-empty text card gets the width. **Swap the ratio** to `1.2fr minmax(280px, .9fr)` so the press photo leads.

**Avatars are placeholder-grade.** `.avatars span` are gold circles with single Hebrew letters ש/א/ל and a `#191b3a` ring. Initials-on-gradient is the universal "we had no real photos" tell. For a baby-sleep consultant, real (even illustrated) parent avatars or a small "★ 4.9" cluster would beat monogram chips. If real photos are impossible, at least make them overlapping _photo_ circles from the testimonials.

**Good:** the photo card hover `scale(1.03)` + the `.hcard-tag` frosted pill with the Reshet-13 logo is genuinely premium. The gold `.hcard-arrow` is a nice touch but floats with no label context - consider a chevron that animates on card hover instead of a standalone FAB-looking circle.

---

## 4. Press / proof band - **7/10** (the strongest section)

This band is the most resolved: `סומכים על תמי` heading, three-counter row, a real video poster with a proper gold play button, three short testimonial cards. It reads credible.

**Sloppy:**

- **Counter row cramps against the heading.** `.proof-head` is `flex; justify-content:space-between; align-items:flex-end`. On desktop the counters (`15+ / אלפי / רשת13`) sit bottom-left, heading bottom-right, and the divider `::after` hairlines between counters are `12%` inset - very short, look like accidental ticks rather than intentional rules. Lengthen to `inset-block: 20% 20%` isn't enough contrast; either make the dividers full-height at low opacity or drop them and rely on gap.
- **Counter sizing is timid.** `.pc .num` at `1.9rem` is small for a hero stat. The "אלפי" word-stat (`.num.word` 1.5rem) is smaller than the numeric ones, so "thousands of babies" - your best number - is the quietest. Bump word-stats to match numeric weight.
- **Testimonial cards are under-filled.** `.testi-card` here (`proof-testi .testi-card`) has a `3rem` quote mark then a one-line quote then a name, in `1.3rem 1.5rem 1.4rem` padding. Three stacked cards of mostly whitespace next to a dense video. The quotes are so short the cards feel like they're missing content. Either add a second line of testimonial or tighten card height so the whitespace-to-text ratio drops.

**Missing:** the video poster (`tammy-13tv-poster.jpg`) has no duration badge, no "רשת 13" watermark burned into the corner - a small channel-logo chip on the poster (you already load `reshet13-logo.svg`) would sell the press credibility harder. Also no `loading` skeleton.

**Good:** the play button (`.press-playbtn` 76px gold disc + triangle) is textbook premium, hover `scale(1.07)` is right. The `.press-artlink` underline-to-full-gold on hover is exactly the micro-polish missing elsewhere - propagate that pattern.

---

## 5. Offers grid - **7/10**

Four-across `repeat(4,1fr)` at 1040px+, one featured gold tile, three velvet. Clean, scannable.

**Sloppy / to fix:**

- **Featured-card contrast jump is jarring.** The `.featured` tile is a full gold gradient (`#f0dcab -> #d0ac6b`) with dark ink text, sitting first (right, in RTL) beside three dark velvet cards. The tonal jump from solid-gold to dark-velvet across a 4-col row is abrupt - the gold tile looks like it belongs to a different component. Soften by giving the three velvet cards a subtle gold _inner_ glow on the featured's neighbor, or reduce the featured fill to a gold-_tinted_ velvet (`#3a3358` with a gold top-edge) so "featured" reads as elevation, not a color swap. A single blazing gold rectangle in a velvet row is a common cheap-template move.
- **Price alignment.** `.offer-price` is `direction:rtl` with `.now` forced `ltr isolate`. Only the featured card has a price; the other three jump straight from `<p>` to `.offer-cta`, so the featured card is taller and the CTA buttons **do not baseline-align across the row.** In v2 the four CTAs sit at different heights = the row looks unset. Give non-priced cards a matching `.offer-price` slot (empty or "בהודעה") or push all `.offer-cta` to the card bottom with `margin-block-start:auto` (the cards are already `flex-column`, so add `flex:1` to the `<p>` - which you have - but the missing price still shifts things; reserve the price row height).
- **Chip emojis.** `.card-chip` uses 🌙🌱🤝💬 emoji. On a "Soft Luxe" brand, OS-rendered color emoji clash with the champagne-gold restraint - they're the one un-luxe element in the grid. Swap for thin-line gold SVG icons (moon, sprout, hands, chat) matching the `.doodle` sparkle style.

**Missing:** no "most popular" visual weight beyond the color - a subtle scale-up (`transform:scale(1.03)`) or a taller featured card would help. Hover lift (`translateY(-4px) scale(1.01)`) is good and consistent with method/quick cards.

**Rate 7** - functionally the cleanest grid; loses points on the featured-tile tonal clash and the CTA baseline misalignment.

---

## 6. About band - **5/10** (weakest resolved section)

**The portrait floats.** `.about-figure img` (`final-b4-suit-cut.png`, 380px) sits mid-left in the star field with only a `drop-shadow(0 26px 40px rgba(3,4,14,.55))` behind it (about-final screenshot). Unlike the hero - where she stands _on the meadow_ with a mask fade and the crib beside her - here she hangs in empty velvet space, cut at the knees, with a soft oval shadow that grounds her to _nothing_. This is the "cutout pasted onto background" tell in its purest form. Fix options:

- Give her the same bottom `mask-image` fade + a `.pedestal--glow` pool of light beneath (the CSS already exists, it's just not applied here), OR
- Lower her so she stands on the meadow horizon like the hero, OR
- Put her in a framed ivory/velvet panel (a "portrait card") so the float becomes intentional composition.

**Grid gap.** `.about-grid` is `1.2fr minmax(240px,.8fr)`, `align-items:center`. Copy on the right (RTL start), figure on the left. The h2 is big and right-aligned; the figure is small and left; the vertical centers don't agree, leaving a large diagonal void between the last cred bullet and the figure's midline. Tighten the column ratio or top-align the figure with the eyebrow.

**Creds list** (`.about-creds`, ✦ bullets) is clean and the ✦ in `--gold-lite` is a nice consistent gold touch. Keep. But five single-line creds in a thin column look like a resume - consider a 2-col chip layout so they read as credentials-as-badges, more premium.

**Rate 5** - the floating knee-cut portrait is the section's whole problem; solve the grounding and this jumps to a 7.

---

## 7. Final CTA + the dead gap - **4/10** (contains the worst single defect)

**There is a large empty velvet void between "באהבה ❤️ תמי" and the footer** (v2-final screenshot). After the sign-off line the plum background runs dead for what looks like 250-350px before the footer columns begin. It reads as a layout bug / unfinished section, not intentional breathing room. This is the most damaging thing on the page because it looks _broken_, and broken kills "premium" instantly.

Cause: `.final` has `padding-block: clamp(5rem,9vw,7rem)`, then the `.footer` has its own `padding-block: clamp(3rem,6vw,4.5rem) 2.6rem`, AND the `sky-wrap` gradient reserves tail space for the dawn glow (stops at 93-100% for the meadow sunrise). The content simply doesn't fill the dawn zone the gradient budgeted, so you get a band of empty pre-dawn plum. **Fix:** either pull the footer up (reduce the gap by removing one of the stacked paddings), or fill the void deliberately - this is exactly where the dawn glow + meadow should be _celebrated_ with a closing line or the bunny/crib scene brought into content focus. Right now the payoff of the whole day->night->dawn scroll journey is an empty rectangle.

**Final CTA itself is fine:** centered eyebrow, `clamp(2.1rem,6vw,3.4rem)` h2, two CTAs (gold + ghost), gold script sign-off. The `.sign` in Discovery Fs at 1.7rem is a lovely closer. The two-button choice (book call / start course) is good. Only note: `h2` here is `color:#fff` while `.final h2 b` is `--gold-lite` - consistent with rest.

**Rate 4** purely because the dead gap makes an otherwise-8 section look unfinished.

---

## 8. Footer - **6/10**

**Sloppy:**

- **Low contrast.** `.copyright` is `rgba(255,250,242,0.7)` and `.f-col a` is `--cream-dim (0.72)` over the darkened dawn meadow. The footer `::before` scrim helps (`up to 0.68 alpha`), but the links still sit near AA floor against the illustrated hills behind them (about-final / v2-final show the crib and bunny bleeding through the footer). Raise link rest color to `rgba(255,250,242,0.82)`.
- **Meadow bleed-through.** The fixed crib (left) and bunny (right) illustrations sit _behind_ the footer columns (v2-final), so "עקבו / @baby.tammy.time" overlaps the crib and the ניווט column sits over the bunny. The scrim isn't strong enough at the edges. Either strengthen the footer scrim to near-solid at the bottom, or accept the bleed only in the empty center. Currently it looks like z-index bleed, not intentional.
- **Column alignment.** `.f-cols` `repeat(3,1fr)` right-aligned (RTL). The `f-logo` "תמי שני" top-left of footer-top with the tagline floating far right - `justify-content:space-between` with `align-items:baseline` leaves the tagline orphaned on wide screens. Fine but the tagline could sit under the logo as a lockup.

**Missing:** no social icons (just text links), no back-to-top, no subtle gold divider glow like `.hdiv` uses elsewhere (the footer uses flat `--hair-gold-soft` borders - inconsistent with the glowing dividers up-page). Bring the `.hdiv` box-shadow glow to the footer's `border-block-start` rules for consistency.

**Rate 6** - structurally complete, let down by contrast and the meadow bleed-through.

---

## 9. Mobile hero - **7/10**

`mobile-hero.png`: logo top-right, CTA pill top-left, eyebrow, stacked headline (`clamp(2.3rem,10.4vw,3.4rem)` row1, `white-space:normal`), sub, full-ish gold CTA, then the mother figure centered below at `min(78vw,340px)`, cut at the chest by the fold with the crib peeking left.

**Good:** headline wraps cleanly, CTA is thumb-reachable, figure recenters sensibly. The scale cliff (row1->row2/3) is less offensive at mobile sizes.

**Sloppy:**

- Figure is `position:relative; margin-block-start:2rem` and gets cut hard at the fold with no mask on this breakpoint override - the `mask-image` from desktop still applies (bottom fade) but she's cut mid-torso by the _viewport_, not the mask, so it looks clipped rather than dissolved. Consider a shorter figure crop or pull her up so head-to-waist fits above the fold.
- Nav links `display:none` under 760px leaves only logo + CTA pill - fine, but there's no hamburger, so `הקורס / מדריכים / עליי / press` are unreachable from the top on mobile. **Missing: a mobile menu.** For a premium site this is a real gap, not just polish.
- Logo at 88px on a 390px-wide screen is ~22% of viewport width - too heavy. The mobile logo should shrink too.

**Rate 7** - solid responsive behavior, held back by the missing mobile menu and the oversized logo.

---

## Priority fix list (highest premium-ROI first)

1. **Kill the dead gap above the footer** (§7) - it's the one thing that looks _broken_. Biggest single win.
2. **Ground the About portrait** (§6) - apply the existing pedestal/mask so she stops floating.
3. **Remove the muddy corner cutout in the hero fill card** (§3) and swap the photo/text column ratio.
4. **Fix the hero headline scale cliff** (§2) - stop the payoff line being the smallest, and clear "לבד." from the figure.
5. **Add a scrim + hairline to the scrolled nav** (§1) - fixes text collisions and adds polish.
6. **Standardize radii + gold-line opacities to two values each** (§0) - removes the "assembled" tell everywhere at once.
7. **Add one texture layer to the velvet** (§0) - the cheapest way to make "luxe" actually visible.
8. **Baseline-align the offer CTAs + de-blaze the featured tile** (§5).
9. **Mobile menu** (§9) - functional gap.

Nothing here touches the locked background world. Every fix is on the content layer.
