# Press assets - Tammy Shani on Reshet 13 "המומלצים"

Collected 2026-07-24. All files in this directory. No HTML pages were touched.

## Article (source of everything)

- URL: https://13tv.co.il/item/special/recommended/health-2/tamishani-902235552/
- Title: "תמי שני: מומחית לשינה והתפתחות תינוקות שתעזור לבייבי שלכם לישון 'כמו תינוק'"
- Published: 2021-09-05 (VideoObject uploadDate in page schema)
- Section: המומלצים (sponsored/branded content section - on-screen tag says "מוגש מטעם: תמי שני")

## Files

| File                   | What                                                                                           | Verified                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| reshet13-logo.svg      | Official Reshet 13 mark, TRANSPARENT bg, navy 13 + pink/yellow/teal blocks. 1080x1080 viewBox. | Rendered on white, looks correct                                                 |
| reshet13-logo-tile.svg | Same mark, white 13 on solid navy square (app-icon style). Use on dark/photo backgrounds.      | Rendered, correct                                                                |
| tammy-13tv-poster.jpg  | Segment poster frame from Reshet CDN, 1198x715.                                                | Viewed - Tammy in the 13 studio                                                  |
| tammy-13tv.mp4         | Full segment, 1280x720 h264/aac, 10:19, ~110 MB.                                               | Frame at 2:00 viewed - shows Tammy + "מוגש מטעם: תמי שני" caption + המומלצים bug |

Logo source: Wikimedia Commons "File:Channel 13 (Israel) logo.svg" (transparent version derived from it: removed navy bg rect, recolored glyph #f1f1f1 -> #011d6b). Brand colors: navy #011d6b, pink #ff1482, teal #00f4c9, yellow #ffd500.

## Video embed - recommended method

No YouTube upload exists (searched; Reshet 13's channel does not have this segment).
The article plays via Kaltura. RECOMMENDED: official Kaltura iframe embed (rights-safe, streams from Reshet's own player, no hosting on our side):

```html
<iframe
  src="https://cdnapisec.kaltura.com/p/2748741/embedPlaykitJs/uiconf_id/50272542?iframeembed=true&entry_id=1_i0ky2vmp"
  width="640"
  height="360"
  allowfullscreen
  allow="autoplay; fullscreen; encrypted-media"
  style="border:0"
></iframe>
```

- partnerId: 2748741
- uiconf_id: 50272542 (Reshet's own player config)
- entry_id: 1_i0ky2vmp
- URL returns 200, verified 2026-07-24.

Fallback ladder:

1. Kaltura iframe above (preferred).
2. Poster image (tammy-13tv-poster.jpg) linking out to the article URL - zero rights risk.
3. Self-hosted `tammy-13tv.mp4` + poster - ONLY with Reshet 13 / Tammy's clearance, see caveats.

Direct source (for reference, works unsigned as of today):
`https://cdnapisec.kaltura.com/p/2748741/sp/274874100/playManifest/entryId/1_i0ky2vmp/flavorId/1_7ownhfgu/format/url/protocol/https/video.mp4`
(flavors available: 640x360, 854x480, 960x540, 1280x720)

## Rights caveats

- The video is Reshet 13's content (branded-content segment paid by Tammy, but the footage/player belong to Reshet). Self-hosting the mp4 on her site needs their or her contract's clearance. The Kaltura iframe streams from Reshet's own infrastructure - closest to "embed as published", still not a formally documented public embed API, so if Reshet ever rotates the uiconf/entry it can break.
- Logo: trademark of Reshet Media. Fine for factual "as seen on" press mention; do not imply endorsement beyond the segment.
- Poster jpg pulled from Reshet's public CDN (media3.reshet.tv) - same caveat class as the mp4, low risk as a video poster/thumbnail.
