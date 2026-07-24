# Tammy Site - Motion + Container Spec (from Dribbble "Pepi" reference video)

Source: https://cdn.dribbble.com/userupload/47773954/file/b769047c779e77b4f6815c1fabdd67c4.mp4 (25 frames analyzed).
HARD RULE: the day/night gradient world + fixed scenery layers are Tammy's brand - DO NOT touch them. This spec governs only the content layer (sections, cards, type) motion + container styling.

## Entrance choreography (per section band)

Beat order, re-triggerable (IntersectionObserver, threshold ~0.25, fires on enter AND exit):

1. t=0ms: section heading (eyebrow + h2): opacity 0→1, translateY 26px→0, duration 600ms, ease cubic-bezier(0.22,1,0.36,1)
2. t=90ms: sub-line/lead paragraph: same move.
3. t=180ms + i*120ms: cards/tiles cascade (RTL order: rightmost first): opacity 0→1, translateY 30px→0, scale 0.94→1, duration 650ms, ease cubic-bezier(0.34,1.56,0.64,1) (spring overshoot - THE pop).
4. last: decorative accents (gold star doodles, sparkle marks): opacity 0→1, scale 0.6→1, rotate -12deg→0, duration 500ms, same spring ease.

Exit (scrolling past, section < ~10% visible): reverse to opacity 0, translateY 18px, scale 0.97, duration 350ms, ease-out - so re-entry pops again.

prefers-reduced-motion: everything static + visible, zero animation.

Implementation: one IO + data-attributes (data-pop, data-pop-delay), CSS classes .is-in / not, transitions handled in CSS. No libraries.

## Container system ("bento premium" on velvet)

- Section shell: each band's content wrapped in a full-width rounded container feel - radius 24px on major panels, generous padding (clamp(2rem,4vw,3.2rem)).
- Cards: radius 20px, velvet surface rgba(23,25,52,0.66) with 1px gold hairline rgba(217,184,120,0.28), double shadow: 0 4px 14px rgba(4,5,16,0.4), 0 24px 60px -28px rgba(4,5,16,0.8). Inner top-light: inset 0 1px 0 rgba(255,250,240,0.07).
- Hover: translateY(-4px) scale(1.01), 260ms spring, hairline brightens to 0.55.
- Icon chips: 44px rounded-full gold-tinted chips for card icons (like Pepi's wishlist chips).
- Testimonial cards: oversized Discovery-Bold gold quote mark (3.2rem) top-corner, like the reference's big quotes.
- Promo tile: one card in the offers grid may be a filled "special" tile (gold gradient fill, dark text) mirroring Pepi's red promo tile - use for the featured course card.
- Doodle accents: small SVG gold sparkles/stars near section headings (2-3 per page max, premium restraint).

## Notes

- RTL: cascades run right→left (first DOM = rightmost = first to pop).
- Nav CTA + floating chat button: no entrance animation (always present).
- Keep total JS under ~60 lines; CSS does the work.
