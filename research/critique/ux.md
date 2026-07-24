# UX / Information-Architecture Audit - Tammy Shani homepage

Auditor lens: exhausted Israeli mom, 25-40, on her phone at 02:00, one hand free, low patience, high emotion.
Scope: `/index.html` (homepage). Inner pages (course/, about/, guides/, consult/) exist and are linked.

## Current state (what actually renders)

DOM section order:

1. NAV (fixed, transparent) - links: הכתבה ברשת 13 (#press) · הקורס (#course) · מדריכים (guides/) · עליי (#about) · CTA שיחת ייעוץ
2. HERO (day light) - H1 + sub + 1 CTA + portrait + 2 "GLOWLY" cards (press photo, velvet "מלווה אתכם" card)
3. `#press` "סומכים על תמי" - counters (15+, אלפי, רשת 13 badge) + press video + 3 testimonials
4. `#course` "הדרך שלך לישון" - 4 offer cards (course 197 featured, 5-day challenge, 1:1, community)
5. `#about` "אני תמי שני" - short story + 5 creds + 2 CTAs
6. FINAL CTA "הלילה הרגוע הראשון" - 2 CTAs + signature
7. FOOTER

Narrative today: **promise -> proof -> sell -> who am I -> sell again.**

Two whole blocks that exist in `copy.md` were **cut from the page**:

- **Pain / empathy strip** ("את לא לבד. וזה לא באשמתך" ... "לבייבי שלך אין בעיית שינה. יש לו הרגלים").
- **Method "שיטת תכלס"** (4 pillars: הרגלים לא גזירת גורל · מענה לבכי · שינה נפרדת מאוכל · דרך שמתאימה לך).
- **Guides teaser "שליף ליד המיטה"** is also cut from the homepage body (guides only survive as one nav link + one footer link).

Note: the HTML comment on line 2393 still says `<!-- METHOD -->` but the section under it is the proof/press block. Leftover label from the deletion. Cosmetic, but a tell that method was ripped out without re-planning the flow.

---

## The two biggest structural problems

### 1. The "how does this actually work?" gap (method deleted)

The mom is sold FOUR paid/contact offers (`#course`: 197 course, 5-day challenge, 1:1, community) **before the page ever explains what Tammy actually does to a baby.** The single most reassuring, most differentiating promise in the whole brand - _"בעדינות, עם מענה לבכי, בלי להשאיר אותו לבכות לבד"_ - is the exact fear every one of these moms has ("do I have to let my baby cry it out?"). That objection is answered nowhere on the homepage now. The method pillars were the answer. Cutting them didn't shorten the page, it removed the reason to trust the offer. **This is the highest-impact fix on the page.**

### 2. Selling before empathising and before establishing "who is she"

Order is proof -> **offers** -> about. The visitor is asked to choose between four commercial options before (a) feeling understood and (b) knowing who Tammy is or why she is credible beyond a TV badge. Desire is not built yet; you're presenting the menu before the guest is hungry. About (her story, the credential paradox "עברתי את זה בעצמה") is the trust engine and it sits _after_ the ask.

---

## Per-section findings

### NAV

- **SLOPPY (bug):** Nav is `position:fixed` and **stays fully transparent even in `.scrolled`** (`.nav.scrolled { background:transparent }`). Only the text colour flips. So content scrolls _directly under the nav text_. Screenshots `v2-cards.png` and `v2-press.png` show the nav words ("רשת 13 · בין המומלצים", "מאלפי", "15+") **colliding on top of the counter row** - unreadable garble. This is the "content collision" and it is a real, shipped defect, not a nuance.
  - **ADD:** on `.scrolled`, give the nav a real surface: a velvet frosted pill / bar with `backdrop-filter: blur()` and a faint background, so text always sits on its own ground. You already have `--velvet-solid` and the frosted-panel pattern; reuse it.
- **REPOSITION / label fix:** anchor "הקורס" jumps to `#course`, but `#course` is a 4-option grid titled "הדרך שלך לישון", not "the course". Clicking הקורס and landing on a menu of 4 things is a small bait-and-switch. Either rename the nav item to something like "הדרכים שלי" / "להתחיל", or split a real course anchor.
- **MISSING (mobile):** below 760px all nav links are `display:none` (only logo + CTA remain) and there is **no hamburger / menu**. On a phone the site has zero in-page navigation. For a one-pager that is defensible - **except** that "מדריכים" (the guides library) is a nav-link, so on mobile the guides entry point disappears entirely from the header. Combined with the guides teaser being cut from the body, **guides are effectively invisible to a phone user** except one footer link at the very bottom. See Guides below.
- **Good:** `aria-label="ניווט ראשי"`, logo has real alt, focus-visible styles present.

### HERO

- **Good:** strong, correct emotional promise ("תינוק שנרדם לבד. אמא שישנה סוף סוף בלילה"), day-light look is distinctive, ink-on-sky contrast is fine. Portrait with sleeping baby is the right first image for the persona.
- **SLOPPY:** two "GLOWLY" cards under the hero (`#press` photo card + the velvet "מלווה אתכם יד ביד" card linking `#course`) do a lot of visual work but dilute the single-action focus. The velvet card's arrow links to `#course` (offers) - pushing to the sell from the very first screen, before empathy or method. Reads eager.
- **Micro-copy:** only ONE hero CTA renders ("אני רוצה לישון כבר עכשיו" -> ravpage checkout). `copy.md` specified a secondary "שיחת ייעוץ ללא עלות". A cold 02:00 visitor is often not ready to buy; the low-commitment consult option is missing from the hero and only appears in the nav. **ADD** the ghost secondary CTA.
- **Mobile (`mobile-hero.png`):** stacks cleanly - eyebrow, H1, sub, CTA, then portrait, then the two cards. Reads well. Only note: it is a _tall_ hero before any payload; fine given the payoff.

### (MISSING) PAIN / EMPATHY - currently absent

- **ADD - high priority.** The cut pain strip ("עוד לילה שנהרס ב-02:00... מזדהה?... לבייבי שלך אין בעיית שינה. יש לו הרגלים") is the single most persona-accurate block in `copy.md`. For a mom who feels it's her fault and she's the only one, "את לא לבד. וזה לא באשמתך" is the hook that earns the scroll. Without it the page goes promise -> credentials, skipping the emotional handshake. Put it right after the hero.

### (MISSING) METHOD "שיטת תכלס" - currently absent

- **ADD - highest priority** (see Structural Problem 1). The 4 pillars answer the crying objection and give the offer something to stand on. This is the differentiator; it should not live only in `copy.md`. Reinstate as a 4-across velvet-panel row (the `.pillars` CSS is still in the stylesheet, ready to use).

### `#press` "סומכים על תמי" (proof)

- **Good:** real testimonials now (שרון, אלינור, ליהי) - not placeholders. Reshet 13 video + counters + badge are strong authority. Click-to-load Kaltura iframe (poster button has aria-label, iframe gets a title) is a good performance/a11y choice.
- **REPOSITION:** as raw social proof this is well built, but it currently carries the _entire_ trust load because method + about-first are gone. Proof convinces "others trust her"; it does not explain "what she'll do" or "who she is". Keep the section, but it should support method + empathy, not replace them.
- **Minor:** counters live inside `#press` while the nav item "הכתבה ברשת 13" points here too - the anchor lands you on a heading "סומכים על תמי" rather than the article, slightly off-target. Low priority.

### `#course` "הדרך שלך לישון" (4 offers)

- **REPOSITION:** four offers is a lot to hand someone who hasn't been told how the method works or who Tammy is. Move this **after** method + about so desire precedes the menu.
- **SLOPPY:** the featured course card is the only concrete-priced, checkout-linked offer; the other three all deep-link to the same IG DM ("פרטים בהודעה" / "שיחת ייעוץ" / "להצטרפות"). Three of four cards are effectively "DM me", which reads thinner than "4 real products". Consider whether the community + challenge are ready, or fold them into fewer, sharper choices (course vs consult) to reduce decision load for an exhausted brain.
- **Good:** featured gold tile uses dark ink text (contrast AA), clear price anchor 197<-297.

### `#about` "אני תמי שני"

- **REPOSITION:** move up, ahead of the offers. Her credential-paradox story ("הייתי בדיוק במקום שלך... עברתי את זה בעצמה") is trust fuel and desire-builder; spending it after the ask wastes it.
- **Good:** creds list is scannable, two CTAs (deep link to /about/ + consult) are sensible, figure has alt.

### (MISSING) GUIDES "שליף ליד המיטה" - absent from homepage body

- **ADD - high priority for THIS persona.** The guides hub already exists at `/guides/` with a live first guide (bedtime ritual). The teaser copy is written in `copy.md` ("מדריכים קצרים ופרקטיים... ב-22:00 בלילה. וגם ב-02:00 לפנות בוקר"). This is the perfect **zero-commitment, 3am entry point** - the mom who won't buy or DM at 02:00 will read a free guide, and it captures her at the exact moment/time the copy names. Right now that entire funnel entrance is missing from the page and invisible on mobile. Add a guides teaser band (the `.guides` ivory-panel CSS already exists) linking to `/guides/`.

### FINAL CTA

- **Good:** clean close, dual path (consult + course), warm signature "באהבה ❤️ תמי", centered, reachable CTAs. Keep as-is.

### FOOTER

- **SLOPPY (bug):** footer nav uses absolute root paths `/course/` `/guides/` `/about/` `/consult/` `/accessibility/` `/privacy/` `/terms/`, while the header uses relative `guides/` and `about/`. If the site is ever served from a subpath, the footer links break and the header ones don't (or vice-versa). Pick one convention. Also `#press`/`#course` header anchors vs footer `/course/` page - two different destinations for "הקורס" (in-page grid vs real course page). Decide which "הקורס" means.
- **Good:** legal links present (נגישות/פרטיות/תקנון), IG wrapped `.ltr`, focus styles.

### Floating chat FAB

- **Good:** fixed bottom, thumb-zone, aria-label, pulse disabled under reduced-motion. Solid.

---

## Cross-cutting

### Scroll length & pacing

- With method + pain + guides missing, the page is actually **too short on substance and slightly long on selling**: 4 offer cards + 2 hero cards + a final dual CTA means the visitor meets the "buy/DM" ask ~4 separate times, but meets "here's how it works" zero times and "I understand you" zero times. Pacing feels like a pitch, not a journey. Re-adding the three cut blocks _lengthens_ the page but _improves_ pacing, because it interleaves reassurance between asks.
- The day->night->dawn sky arc (stars/tint/dawn tracks tuned to scroll %) is keyed to the _current_ section offsets. **Any reorder or re-insertion will desync the sky.** The `TRACKS` breakpoints in the JS (e.g. stars peak 44-78%, dawn 84-100%) must be re-tuned after changing section order, or the night will land on the wrong band.

### Nav usefulness - summary

Transparent-over-content collision (bug), label/target mismatch on "הקורס", and no mobile menu with guides vanishing on phones. The nav needs: a real scrolled surface, honest labels, and either a mobile menu or acceptance that mobile is scroll-only _plus_ the guides entry restored to the body.

### Mobile experience

- Hero, offers (4->1 col), about (stacked, figure `order:2`) all stack cleanly. Figure sizes are capped sensibly (hero `min(78vw,340px)`, about `min(100%,380px)`).
- Thumb reach: primary CTAs land mid-screen, FAB in the bottom zone - good.
- **Real mobile gap:** no header nav + no body guides link = the entire guides funnel is one footer link at the very bottom. Fix by restoring the guides band to the body.

### Accessibility

- **Strong:** `focus-visible` outlines everywhere (buttons, nav, counters, cards, footer), reduced-motion fully honoured (`[data-pop]{opacity:1!important}`, FAB pulse off, count-up jumps to final value, IntersectionObserver bypassed), decorative imagery `aria-hidden`, real alt on content images, iframe title, poster button labelled.
- **Watch:** the transparent-nav-over-content bug is also a **contrast** defect - mid-scroll, nav text can land over the bright hero baby photo or the ivory press poster, dropping below AA. Fixing the scrolled surface fixes both the collision and the contrast.
- **Watch:** `cream-dim` (0.72 alpha) body text on velvet is borderline for long paragraphs; fine for labels, verify AA on any running copy.

### Micro-copy

- Hero missing its secondary consult CTA (only in nav).
- "הדרך שלך לישון" as the heading over four _offers_ is vague - it reads like a method promise but delivers a price menu. Either make it clearly "בחרי איך מתחילים" or restore a real method section above it so the phrase has context.
- Three of four offer CTAs are "DM me" variants - see `#course` note.

---

## Proposed section orders (pick one, then re-tune the sky TRACKS)

### Order A - "Emotional funnel" (recommended, closest to the original copy.md intent)

`HERO -> PAIN/empathy -> METHOD (4 pillars) -> PROOF (press+counters+testimonials) -> ABOUT -> OFFERS -> GUIDES teaser -> FINAL CTA`

Rationale: mirrors how this persona actually converts - feel understood (pain), understand the approach and get the crying fear answered (method), see it's trusted (proof), meet the human (about), _then_ be shown the menu (offers), with guides as the soft "not ready to buy?" catch right before the close. Every ask now has desire built under it. This is the highest-conversion shape and re-uses copy that already exists.

### Order B - "Fast trust, lighter lift" (if reinstating both pain and method is too much for v1)

`HERO -> METHOD (4 pillars) -> PROOF -> GUIDES teaser -> ABOUT -> OFFERS -> FINAL CTA`

Rationale: the non-negotiable re-add is **method** (it answers the objection and differentiates). Method-first gives the offer a foundation; guides sit high as the low-commitment 3am path for people who bounce off proof; about + offers close. Skips the pain block to keep scope down, accepting a weaker emotional handshake. Good compromise if you can only add one cut block, add method.

### Order C - "Two-track: reader vs buyer" (best if guides/consult are the real 02:00 wins)

`HERO -> PAIN -> GUIDES teaser (free, immediate) -> METHOD -> PROOF -> ABOUT -> OFFERS (consult-led, course second) -> FINAL CTA`

Rationale: leans into the "at 02:00 she won't buy, she'll read" insight. Empathy then an _immediate free give_ (guides) captures her at peak pain with zero risk, building goodwill before any method/proof/ask. Offers are reordered to lead with the free consult, course second, dropping/merging the thin DM-only cards. Best for lead-gen and list-building over immediate checkout; slightly delays the direct sell.

All three: **the `#course`/"הקורס" nav label and the offers heading must be reconciled, the scrolled-nav surface must be added, and the sky `TRACKS` breakpoints re-tuned to the new offsets** regardless of which order ships.
