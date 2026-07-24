# Blocksuniverse.tv day/night background - reverse engineering

Source: https://www.blocksuniverse.tv/numberblocks/home (Webflow site, fetched 2026-07-24)
Raw files + screenshots: `/private/tmp/claude-501/-Users-peleg-tami-ssh/b27e7de2-2d26-4d19-8bff-0124fd8700ad/scratchpad/blocksuni/`
(page.html, site.css, webflow.main.js, a-56.txt, blocksuni-scroll-*.jpg)

---

## Section A: what the visitor sees (scroll journey)

Page is ~4.5 viewports tall (4045px at 1440x900). Screenshots at each stop:

| Scroll | Screenshot                 | What you see                                                                                                                                                                                                                                                       |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0%     | `blocksuni-scroll-00.jpg`  | Full daylight. Light cyan sky, soft white clouds behind the content, pale green rolling hills pinned to the bottom of the viewport. Hero slider on top.                                                                                                            |
| 15%    | `blocksuni-scroll-15.jpg`  | Sunset. Sky slides from cyan into coral/pink. Clouds have almost vanished (faded to 5% opacity). First gold star specks appear. Hills turn dusty mauve because the land layer is dimming and the dark sky bleeds through it. "keep scrolling" badge in the middle. |
| 30%    | `blocksuni-scroll-30.jpg`  | Dusk. Deep magenta/purple sky, "Welcome to Numberland!" section. Stars stronger, hills now dark silhouettes with faint purple cloud shapes near the horizon.                                                                                                       |
| 45%    | `blocksuni-scroll-45.jpg`  | Night falls. Magenta melts into deep navy going down the viewport. Sky full of gold stars at the top.                                                                                                                                                              |
| 60%    | `blocksuni-scroll-60.jpg`  | Full night. Navy/indigo sky, brightest stars (90% opacity), hills are misty blue-gray silhouettes (land at 30% opacity). This is the "Where to watch" section - the whole world is asleep.                                                                         |
| 75%    | `blocksuni-scroll-75.jpg`  | Pre-dawn. Teal/blue-green rises from the bottom of the gradient, stars start fading, hills lighten.                                                                                                                                                                |
| 90%    | `blocksuni-scroll-90.jpg`  | Morning again. Cyan sky, white clouds back at 80%, bright green Numberland hills with characters standing on them.                                                                                                                                                 |
| 100%   | `blocksuni-scroll-100.jpg` | Full day at the footer. Green land + characters fully saturated, sunny sky. The story loops: day -> night -> day.                                                                                                                                                  |

Constant elements: clouds drift slowly sideways the whole time (5-minute loop), stars occupy only the top half of the screen, the land is always pinned to the viewport bottom, all content panels float above the world.

## Section B: exact technical mechanism

Three tricks stacked. No canvas, no Lottie, no scroll-jacking, no per-frame gradient math.

### B1. The sky: ONE tall CSS gradient that scrolls with the page (zero JS)

The entire page content sits inside a `position: relative` wrapper whose background is a single multi-stop vertical gradient spanning the full ~4000px document height. The viewport is a 900px window sliding over it. Scrolling IS the day/night transition.

From `site.css`:

```css
.day-night-bg {
  background-image: linear-gradient(
    #9ae2e7,
    /* 0%   day - light cyan */ #82d9df 15%,
    /* day - cyan */ #e95b82 22%,
    /* sunset - coral pink */ #a01a81 33%,
    /* dusk - magenta */ #0d113a 44% 55%,
    /* NIGHT plateau - deep navy (held flat 44-55%) */ #211b61 66%,
    /* late night - indigo */ #276780 77%,
    /* pre-dawn - teal */ #a3e3e7 88%,
    /* dawn - light cyan */ #82d9df /* 100% day again */
  );
  position: relative;
  inset: 0%;
}
```

Note the two-position stop `#0d113a 44% 55%`: it holds pure night flat for ~11% of the page so the middle sections all read as "deep night" instead of constantly shifting.

Verified live: wrapper is 3461px tall, `position: relative`, contains every `.panel` section. Gradient percentages resolve against the wrapper height, so the color script automatically stretches with content length.

### B2. The world layers: `position: fixed` scenery behind the content

```css
.home-clouds {
  z-index: 0;
  position: fixed;
  inset: 0%;
  overflow: hidden;
}
.clouds {
  opacity: 0.5;
  max-width: 1000%;
  height: 70%;
  position: absolute;
  inset: auto 0% 0%;
}

.home-stars {
  z-index: 0;
  height: 50vh;
  position: fixed;
  inset: 0% 0% auto;
  overflow: hidden;
}
.stars {
  width: 100%;
  position: absolute;
  inset: 0% 0% auto;
}

.numberland {
  width: 100%;
  position: fixed;
  inset: auto 0% 0%;
  overflow: visible;
}
.blocksland-home {
  z-index: 1;
  width: 100%;
  margin-bottom: -50px;
  position: absolute;
  inset: auto 0% 0%;
}

.panel {
  z-index: 10;
  position: relative; /* content floats above the world */
}
```

Stacking, bottom to top: gradient (on the ancestor wrapper) -> stars (fixed, top 50vh) -> clouds (fixed, full viewport, image bottom-anchored) -> land (fixed, viewport bottom, z-index 1) -> content panels (z-index 10).

Because these layers are `fixed`, they never move with the page - only the gradient slides behind them. That alone produces a strong parallax feel with zero scroll math.

### B3. The day/night "actors": scroll-progress opacity keyframes (Webflow IX2)

One Webflow interaction, triggered on the PAGE with `eventTypeId: "PAGE_SCROLL"` -> `GENERAL_CONTINUOUS_ACTION`, drives animation `a-56`, literally titled "good night and good morning". It maps 0-100% page scroll to opacity keyframes on the three fixed layers (extracted verbatim from `webflow.main.js`, trimmed):

```js
"a-56": { title: "good night and good morning",
  continuousParameterGroups: [{ type: "SCROLL_PROGRESS",
    continuousActionGroups: [
      { keyframe: 0,   actionItems: [
          { actionTypeId: "STYLE_OPACITY", target: ".clouds",          value: .8 },
          { actionTypeId: "STYLE_OPACITY", target: ".stars",           value: .3 },
          { actionTypeId: "STYLE_OPACITY", target: ".blocksland-home", value: 1  } ]},
      { keyframe: 15,  actionItems: [
          { actionTypeId: "STYLE_OPACITY", target: ".clouds",          value: .05 } ]},
      { keyframe: 50,  actionItems: [
          { actionTypeId: "STYLE_OPACITY", target: ".stars",           value: .9 },
          { actionTypeId: "STYLE_OPACITY", target: ".blocksland-home", value: .3 } ]},
      { keyframe: 80,  actionItems: [
          { actionTypeId: "STYLE_OPACITY", target: ".clouds",          value: .05 } ]},
      { keyframe: 100, actionItems: [
          { actionTypeId: "STYLE_OPACITY", target: ".clouds",          value: .8 },
          { actionTypeId: "STYLE_OPACITY", target: ".stars",           value: .3 },
          { actionTypeId: "STYLE_OPACITY", target: ".blocksland-home", value: 1  } ]}
    ]}]}
```

The engine linearly interpolates between keyframes as scroll progress changes. Measured live in the browser (computed opacity):

| scroll | clouds | stars | land |
| ------ | ------ | ----- | ---- |
| 0%     | 0.80   | 0.30  | 1.00 |
| 15%    | 0.05   | 0.48  | 0.79 |
| 30%    | 0.05   | 0.66  | 0.58 |
| 50%    | 0.05   | 0.90  | 0.30 |
| 80%    | 0.05   | 0.54  | 0.72 |
| 100%   | 0.80   | 0.30  | 1.00 |

Key insight: stars are ALWAYS in the DOM at >= 0.3 opacity. Gold-white stars are simply invisible against a light cyan sky and pop against navy. The gradient does half the work of "revealing" them; opacity does the rest. Same trick with the land: dimming it to 0.3 over the dark gradient reads as "hills asleep in the dark" with no second night-version asset.

### B4. Ambient cloud drift (load-triggered, not scroll)

Second interaction `a-50`, triggered `PAGE_START`, loop enabled:

```js
{ actionTypeId: "TRANSFORM_MOVE", target: ".clouds", xValue: 0,   xUnit: "PX", duration: 500 },
{ actionTypeId: "TRANSFORM_MOVE", target: ".clouds", xValue: -45, xUnit: "%",  duration: 3e5 }  // 300s
```

Clouds slide -45% over 5 minutes on a loop (cloud image is `max-width: 1000%`, so a wide strip). Gives the world life even when the user stops scrolling.

### B5. Leftovers / non-factors

- An inline `<style>` defines `.scroll-snap-wrapper { scroll-snap-type: y mandatory }` + `.panel { scroll-snap-align: start }`, but no element on the page carries `scroll-snap-wrapper` - snap is effectively OFF. Plain scrolling.
- No `animation-timeline: scroll()`, no IntersectionObserver, no canvas, no SVG animation. jQuery + Webflow IX2 only.
- Mobile: same mechanism, media queries only relax panel heights. `position: fixed` layers work because no ancestor creates a containing block (no transforms/filters on ancestors of the fixed layers).

## Section C: replication recipe for the Tammy version

Same architecture, modern engine (Webflow IX2's scroll handler is ~700KB of runtime; we need ~30 lines). Original artwork only.

### C1. Layer plan (baby-sleep world)

| #   | Layer    | Element                    | Position                                                             | Content (original art)                                                           |
| --- | -------- | -------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 0   | Sky      | `.sky-wrap` (page wrapper) | relative, full page                                                  | Multi-stop gradient, evening -> deep night -> dawn -> soft morning               |
| 1   | Stars    | `.stars`                   | fixed, top 50vh                                                      | Scattered soft stars SVG/webp, tiny twinkle                                      |
| 2   | Moon/Sun | `.moon`                    | fixed, top-right (top-LEFT in RTL: keep it inset-inline so it flips) | Big friendly crescent moon that cross-fades to a soft sun near the bottom        |
| 3   | Clouds   | `.clouds`                  | fixed, bottom-anchored, wide strip                                   | Soft blurry night clouds, slow CSS drift                                         |
| 4   | Horizon  | `.horizon`                 | fixed, viewport bottom                                               | Rolling hills + nursery silhouettes (crib, mobile, rooftops), one wide image/SVG |
| 5   | Content  | `.panel` sections          | relative, z-index 10                                                 | Tammy's copy/cards                                                               |

### C2. Sky gradient (Tammy palette, night -> morning, no loop back to night)

For a sleep consultant the emotional arc is the reverse of theirs: start at bedtime, end at a rested morning. One-way gradient:

```css
.sky-wrap {
  position: relative;
  background-image: linear-gradient(
    #2b2a5e,
    /* 0%  bedtime indigo */ #1a1a40 18% 40%,
    /* deep night plateau (hold it flat like they do) */ #3d3a6e 55%,
    /* late night */ #7a6a9e 68%,
    /* pre-dawn lavender */ #f0a8a0 80%,
    /* sunrise peach */ #ffe9d6 92%,
    /* morning cream */ #fdf6ec /* 100% soft daylight */
  );
}
```

Rule from their build worth copying: use a two-position stop to HOLD the night flat across the sections where you talk about the problem (baby not sleeping), then release into dawn exactly where the solution/method sections start. The gradient stops are the narrative outline.

### C3. Scroll-driven opacity: 30 lines of vanilla JS (their mechanic, without Webflow)

```html
<div class="fx" id="stars"><img src="stars.webp" alt="" /></div>
<div class="fx" id="moon"><img src="moon.svg" alt="" /></div>
<div class="fx" id="sun"><img src="sun.svg" alt="" /></div>
<div class="fx" id="clouds"><img src="clouds.webp" alt="" /></div>
<div class="fx" id="horizon"><img src="hills.svg" alt="" /></div>
```

```js
// keyframes: scroll% -> opacity, linear interp (this IS what Webflow IX2 does)
const TRACKS = {
  stars: [
    [0, 0.9],
    [55, 0.9],
    [75, 0.15],
    [100, 0],
  ],
  moon: [
    [0, 1],
    [60, 1],
    [80, 0],
  ],
  sun: [
    [0, 0],
    [72, 0],
    [90, 1],
  ],
  clouds: [
    [0, 0.25],
    [70, 0.25],
    [100, 0.6],
  ],
  horizon: [
    [0, 0.35],
    [60, 0.35],
    [85, 1],
  ], // silhouettes wake up with the dawn
};
const lerp = (kf, p) => {
  let [a, b] = [kf[0], kf[kf.length - 1]];
  for (const k of kf) {
    if (k[0] <= p) a = k;
    if (k[0] >= p) {
      b = k;
      break;
    }
  }
  return a[0] === b[0]
    ? a[1]
    : a[1] + ((b[1] - a[1]) * (p - a[0])) / (b[0] - a[0]);
};
let ticking = false;
addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max ? (scrollY / max) * 100 : 0;
      for (const id in TRACKS)
        document.getElementById(id).style.opacity = lerp(TRACKS[id], p);
      ticking = false;
    });
  },
  { passive: true },
);
```

CSS for the fixed layers (RTL-safe: only inline-agnostic properties or logical ones):

```css
.fx {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
#stars {
  block-size: 50vh;
  inset-block-end: auto;
}
#moon img {
  position: absolute;
  inset-block-start: 8vh;
  inset-inline-end: 8vw;
  inline-size: min(22vw, 220px);
}
#sun img {
  position: absolute;
  inset-block-start: 10vh;
  inset-inline-end: 10vw;
  inline-size: min(20vw, 200px);
}
#clouds img {
  position: absolute;
  inset-block-end: 0;
  inline-size: 300%;
  max-inline-size: none;
  animation: drift 240s linear infinite alternate;
  filter: blur(1px);
}
#horizon img {
  position: absolute;
  inset-block-end: -2px;
  inline-size: 100%;
}
.panel {
  position: relative;
  z-index: 10;
}
@keyframes drift {
  to {
    translate: -30% 0;
  }
}
html[dir="rtl"] @supports (inset-inline-end: 0) {
} /* logical props above already flip for RTL */
```

Even cheaper alternative (2026 browsers): drop the JS entirely and use `animation-timeline: scroll(root)` with a CSS keyframes animation per layer. Caveat: no Safari < 26 support without the JS fallback, so ship the JS version as the baseline and treat scroll-timeline as a progressive enhancement. Their site proves the JS-interpolated version feels perfectly smooth.

### C4. The three cheats to keep (they are the whole magic)

1. Gradient on the tall wrapper = the sky animates itself for free. Never repaint colors in JS.
2. White/gold stars always present at low opacity - the gradient reveals them. One asset, no toggling.
3. One horizon asset dimmed over a dark background = "night version" without drawing a night version.

### C5. Mobile + accessibility

- `100svh`-safe: fixed layers use `inset` percentages, not `100vh`, so browser chrome collapse doesn't jump. Test on iOS Safari.
- Images: webp/avif, stars <= 60KB, hills as SVG if flat shapes (silhouettes compress brilliantly).
- `prefers-reduced-motion: reduce` -> kill the cloud drift animation and set all TRACKS to their final values once on load (static night-to-morning gradient still tells the story via scroll, since the gradient itself is not "motion", it's paint):

```js
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // no rAF listener; set static mid-story opacities once
}
```

```css
@media (prefers-reduced-motion: reduce) {
  #clouds img {
    animation: none;
  }
}
```

- Contrast: text panels get their own solid/blurred card background (their site floats white text directly on the gradient - works for CBeebies, too low-contrast for a mom reading at 2am; give Tammy's copy cards a surface).
- WARNING (learned from their DOM): never put `transform`, `filter`, or `backdrop-filter` on any ancestor of the `.fx` layers - it silently converts `position: fixed` into `position: absolute` (containing block trap) and the whole world scrolls away.

## Section D: composing with the existing pages

### D1. With the existing dark-to-light "night to morning" scroll narrative page

They are the same pattern - the existing page is a two-stop version of this. Merge, don't duplicate:

- Replace the current page-level dark-to-light background with the multi-stop `.sky-wrap` gradient (C2). The existing narrative sections become the `.panel`s. Their copy stays; only the wrapper changes.
- Map narrative beats to gradient stops: problem sections sit inside the night plateau (18-40%), method sections ride the pre-dawn ramp, results/testimonials land in sunrise peach, CTA in full morning. This is literally editing gradient stop percentages until they line up with section offsets - one CSS line per adjustment.
- The fixed world layers (stars/moon/clouds/horizon) are additive - they drop into the existing page without touching its content flow because they are `fixed`, `pointer-events: none`, `z-index: 0`.

### D2. With the scroll-scrubbed video hero (scrub engine exists separately)

Two scroll-driven systems coexist fine if they own different scroll ranges and different layers:

- Page zones: hero = first ~150vh (video scrub pinned section), world = everything after. The video hero sits ABOVE the world (its own opaque background, z-index above 10) so the sky is simply not visible behind it.
- Start the world's TRACKS keyframes at the scroll % where the hero ends (e.g. stars: `[[12, .9], ...]` if the hero releases at 12%), or better: compute progress relative to `.sky-wrap`'s own bounding box instead of the whole document (`p = (scrollY - wrap.offsetTop) / (wrap.scrollHeight - innerHeight)` clamped 0-100). Then the hero's length never shifts the day/night timing - each engine reads its own element, zero coupling.
- Both engines are passive rAF scroll listeners; they do not conflict. Keep them as two files. Do NOT merge them into one "scroll manager" - the video scrub touches `currentTime`/canvas frames, the world only touches `opacity` on 5 fixed nodes. Different frequencies, different failure modes.
- Handoff moment worth designing: the video's last scrubbed frame should color-match the first band of the gradient (bedtime indigo) so releasing the hero feels like the camera pulling back into the night sky.

---

Screenshots referenced above live in:
`/private/tmp/claude-501/-Users-peleg-tami-ssh/b27e7de2-2d26-4d19-8bff-0124fd8700ad/scratchpad/blocksuni/blocksuni-scroll-{00,15,30,45,60,75,90,100}.jpg`

Do not reuse any Blocksuniverse artwork (Clouds-1.webp, NB-Stars.webp, Numberland-home.webp are copyrighted Alphablocks Ltd). Structure only.
